import email
import os
import sys
import base64
import re
import urllib.parse
from email import policy
from bs4 import BeautifulSoup

# ---------- NORMALISASI & INDEX ----------
def _variants(url):
    """Semua bentuk kunci yang mungkin muncul sebagai referensi."""
    if not url: return []
    url = str(url).strip()  # Pastikan url adalah string
    out = [url]
    try: out.append(urllib.parse.unquote(url))
    except: pass
    try:
        p = urllib.parse.urlparse(url)
        if p.path:
            out.append(p.path)
            out.append(urllib.parse.unquote(p.path))
            out.append(os.path.basename(p.path))
            out.append(urllib.parse.unquote(os.path.basename(p.path)))
        if p.netloc and p.path:
            out.append(p.netloc + p.path)
    except: pass
    # tanpa query/fragment
    out.append(url.split('?')[0].split('#')[0])
    # seen-preserving
    seen, res = set(), []
    for v in out:
        if v and v not in seen:
            seen.add(v); res.append(v)
    return res

def _lookup(index, ref, base=None):
    if not ref: return None
    ref = str(ref).strip().strip('"').strip("'")  # Pastikan ref adalah string
    if ref.startswith('data:'): return None  # sudah inline
    cands = [ref]
    if base and not re.match(r'^[a-zA-Z][a-zA-Z0-9+.-]*:', ref):
        try: cands.insert(0, urllib.parse.urljoin(base, ref))
        except: pass
    for c in cands:
        for v in _variants(c):
            if v in index: return index[v]
    return None

# ---------- INLINE CSS REKURSIF ----------
RE_IMPORT = re.compile(r'@import\s+(?:url\(\s*)?["\']?([^"\'\s)]+)["\']?\s*\)?\s*;', re.I)
RE_URL    = re.compile(r'url\(\s*([\'"]?)([^\'")]+)\1\s*\)', re.I)

def inline_css(css_text, base, index, visited, log):
    if not css_text:
        return ""
    css_text = str(css_text)  # Konversi eksplisit ke string
    css_text = re.sub(r'@charset\s+[\'"][^\'"]*[\'"]\s*;?', '', css_text, flags=re.I)
    collected = []
    
    def repl_import(m):
        ref = m.group(1)
        ent = _lookup(index, ref, base)
        if not ent or ent.get('type') != 'text/css':
            log['unresolved'].append(('@import', ref)); return ''
        key = ent.get('cloc') or ref
        if key in visited: return ''
        visited.add(key)
        sub = inline_css(ent['raw'], ent.get('cloc') or base, index, visited, log)
        collected.append(sub); return ''
        
    css_text = RE_IMPORT.sub(repl_import, css_text)
    
    def repl_url(m):
        ref = m.group(2)
        ent = _lookup(index, ref, base)
        if not ent:
            if not ref.startswith(('data:','http://','https://','#')):
                log['unresolved'].append(('url()', ref))
            return m.group(0)
        return f'url("{ent["data_uri"]}")'
        
    css_text = RE_URL.sub(repl_url, css_text)
    result = ("\n".join(collected) + "\n" + css_text).strip()
    return result

# ---------- SANITIZER WIDGET AUTH ----------
GOOGLE_G_SVG = ('<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">'
 '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>'
 '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>'
 '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>'
 '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>')

def sanitize_auth_widgets(soup, mode='replica'):
    """iframe/embed/object widget login pihak ketiga -> replika statis atau buang."""
    # Ganti list comprehension dengan loop eksplisit untuk menghindari error saat iterasi
    targets = []
    for t in soup.find_all(['iframe','embed','object']):
        src_value = t.get('data-orig-src') or t.get('src') or ''
        if any(k in str(src_value) for k in ('accounts.google.com', '/gsi/', 'google.com/gsi')):
            targets.append(t)
    
    for tag in targets:
        if mode == 'remove':
            tag.decompose()
            continue
        replica = soup.new_tag('div')
        replica['style'] = ("display:flex;align-items:center;justify-content:center;gap:10px;"
                            "width:100%;height:44px;border:1px solid #c6c6c6;border-radius:6px;"
                            "background:#fff;color:#1f1f1f;"
                            "font:500 14px/1 Helvetica,Arial,sans-serif;cursor:pointer;")
        svg_soup = BeautifulSoup(GOOGLE_G_SVG, 'html.parser')
        replica.extend(svg_soup.contents)
        replica.append(soup.new_string(" Lanjutkan dengan Google"))
        tag.replace_with(replica)
    return len(targets)

# ---------- KONVERSI UTAMA ----------
def convert(inp, outp):
    with open(inp,'rb') as f:
        msg = email.message_from_binary_file(f, policy=policy.default)

    index, html_body = {}, None
    log = {'parts':{}, 'links':[], 'unresolved':[]}

    for part in msg.walk():
        ct   = part.get_content_type()
        cloc = part.get('Content-Location')
        cid  = part.get('Content-ID')
        try:
            payload = part.get_payload(decode=True)
        except:
            continue  # Lewati jika gagal decode
        if not payload: continue
        log['parts'][ct] = log['parts'].get(ct,0)+1

        cs = part.get_content_charset() or 'utf-8'
        try: text = payload.decode(cs, errors='ignore')
        except: text = None

        if (ct=='text/html' or (text and '<html' in text.lower())) and html_body is None:
            html_body = text
            continue

        uri = f"data:{ct};base64,"+base64.b64encode(payload).decode('ascii')
        entry = {'type':ct,'data_uri':uri,'raw':text,'cloc':cloc}
        keys = []
        if cloc: keys += _variants(cloc)
        if cid:
            cc = cid.strip('<>'); keys += [f'cid:{cc}', cc]
        for k in keys:
            if k: index.setdefault(k, entry)

    if not html_body: raise ValueError('Tidak ada <html> di MHTML.')

    soup = BeautifulSoup(html_body, 'html.parser')

    def fix_attr(tag, attr, base=None):
        v = tag.get(attr)
        if not v: return
        # Simpan src asli untuk deteksi widget auth
        if attr in ('src', 'href'):
            tag['data-orig-' + attr] = v          
            
        ent = _lookup(index, v, base)
        if ent: 
            tag[attr] = ent['data_uri']
        else:
            # fallback: replace buta ter-sort
            for k in sorted(index, key=len, reverse=True):
                if len(k)>4 and k in str(v):
                    tag[attr] = str(v).replace(k, index[k]['data_uri'])
                    return

    # Handle Tag Standar
    for tag in soup.find_all(['img','script','iframe','embed','source','video','audio','track','input']):
        for a in ('src','poster','data-src','data-original','background'):
            fix_attr(tag,a)
        ss = tag.get('srcset')
        if ss:
            new = []
            for it in str(ss).split(','):
                pr = it.strip().split()
                if pr:
                    ent = _lookup(index, pr[0])
                    if ent:
                        pr[0] = ent['data_uri']
                    # Jika ent tidak ditemukan, gunakan URL asli
                    new.append(' '.join(pr))
            tag['srcset'] = ', '.join(new)

    # <link stylesheet> -> <style> rekursif
    for lk in soup.find_all('link', rel=lambda r: r and 'stylesheet' in ' '.join(r if isinstance(r,list) else [r]).lower()):
        href = lk.get('href')
        ent  = _lookup(index, href)
        ok = bool(ent and ent.get('type')=='text/css' and ent.get('raw'))
        log['links'].append((str(href), 'INLINE' if ok else 'MISS'))
        if ok:
            st = soup.new_tag('style')
            st.string = inline_css(ent['raw'], ent.get('cloc') or str(href), index, {ent.get('cloc')}, log)
            lk.replace_with(st)

    # Fungsi helper untuk mengganti URL dalam style
    def replace_style_urls(content):
        def replacer(m):
            ent = _lookup(index, m.group(2))
            if ent:
                return f'url("{ent["data_uri"]}")'
            else:
                return m.group(0)
        return RE_URL.sub(replacer, str(content))

    # <style> yang sudah ada: ganti url()-nya
    for st in soup.find_all('style'):
        if st.string:
            st.string = replace_style_urls(st.string)
            
    # Inline style attributes
    for tag in soup.find_all(style=True):
        tag['style'] = replace_style_urls(tag['style'])

    # --- SANITIZE WIDGET AUTH (Penyebab layout gepeng/scrollbar) ---
    n_widgets = sanitize_auth_widgets(soup)
    if n_widgets > 0:
        print(f"[INFO] Widget Auth dinormalisasi: {n_widgets} elemen")

    # Konversi ke string
    html = str(soup)
    
    # Safety net global (hati-hati JS) — hanya key panjang
    for k in sorted(index, key=len, reverse=True):
        if len(k)>6 and ('/' in k or k.startswith('cid:')):
            html = html.replace(str(k), index[k]['data_uri'])

    # Tulis Output
    with open(outp,'w',encoding='utf-8') as f: 
        f.write(html)

    # ---- DIAGNOSIS TERMINAL ----
    print(f"\n=== {os.path.basename(inp)} ===")
    print("Part per tipe :", log['parts'])
    print("Stylesheet    :", log['links'])
    miss = [u for u in log['unresolved']]
    if miss:
        uniq = sorted({f"{t} -> {r}" for t,r in miss})
        print(f"REFERENSI TIDAK TER-RESOLVE ({len(uniq)}):")
        for u in uniq[:30]: print("   ", u)
        if len(uniq)>30: print(f"    ... +{len(uniq)-30} lagi")
    else:
        print("Semua referensi ter-resolve. OK.")

# ---------- MAIN ----------
def main():
    if len(sys.argv)<2: 
        print("Pakai: python3 mhtml_fix.py <folder>")
        sys.exit(1)
        
    d = sys.argv[1]
    # Tambahkan pengecekan apakah direktori ada
    if not os.path.isdir(d):
        print(f"Folder '{d}' tidak ditemukan.")
        sys.exit(1)
        
    fs = [f for f in os.listdir(d) if f.lower().endswith(('.mhtml','.mht'))]
    if not fs: 
        print('Tidak ada MHTML.'); 
        return
        
    print(f"Ditemukan {len(fs)} file. Mulai konversi...\n")
    
    for f in fs:
        inp_path = os.path.join(d, f)
        out_path = os.path.join(d, os.path.splitext(f)[0]+'_fixed.html')
        try: 
            convert(inp_path, out_path)
        except Exception as e: 
            import traceback
            print(f"[ERR] {f}: {e}")
            traceback.print_exc()

if __name__=='__main__': 
    main()
