"use client";

import { useState } from "react";
import { ChevronLeftIcon, QrScanIcon } from "./icons";

type View = "form" | "qr";

function openOAuth(url: string, name: string, h: number) {
  window.open(url, name, `width=500,height=${h},noopener`);
}

export default function LoginCard() {
  const [view, setView] = useState<View>("form");
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [qrKey, setQrKey] = useState(0);

  const filled = value.length > 0;
  const active = focused || filled;
  // ponytail: QR statis dari sample sesi asli; ganti generator QR server-side bila butuh kode unik per sesi.
  const qrSrc = `/images/qr-sample.jpg?v=${qrKey}`;

  return (
    <div className="w-[368px] max-w-[calc(100vw-32px)] min-h-[50px] rounded-lg bg-white p-8 shadow-[0_1px_4px_0_rgba(0,0,0,0.2)]">
      {view === "form" ? (
        <>
          <div className="mb-[42px] mt-2 flex w-full items-center justify-between">
            <h1 className="text-[17.5px] font-extrabold leading-[22.75px] text-foreground">
              Masuk ke Tokopedia
            </h1>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="cursor-pointer text-[12.25px] leading-[19.25px] text-primary"
            >
              Daftar
            </a>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            {/* Fieldset-trick input */}
            <div className="relative">
              <div className="flex h-6 items-end">
                <div className="h-1 w-2 rounded-tl-lg border-l border-t border-solid border-placeholder" />
                <div
                  className={`h-1 flex-1 rounded-tr-lg border-r border-t border-solid border-placeholder transition-opacity duration-100 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 top-6 rounded-b-lg border-b border-l border-r border-solid border-placeholder" />
              <div className="relative -mt-6">
                <label
                  htmlFor="phone-email"
                  className={`pointer-events-none absolute left-3 origin-left transition-transform duration-200 ease-out top-[13px] ${
                    active
                      ? "-translate-y-1/2 scale-[.876] text-foreground text-xs"
                      : "translate-y-0 scale-100 text-placeholder text-sm"
                  }`}
                >
                  Nomor HP atau Email
                </label>
                <input
                  id="phone-email"
                  autoFocus
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="h-12 w-full rounded-lg bg-transparent px-3 pt-[13px] text-sm leading-[22px] text-foreground outline-none"
                />
              </div>
            </div>
            {focused && !filled && (
              <p className="-mt-5 px-3 pb-1 text-[10.5px] leading-[15.75px] text-muted-foreground">
                Contoh: 08123456789
              </p>
            )}

            <div className="mt-2 mb-4 text-right">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="cursor-pointer text-[12.25px] font-extrabold leading-[19.25px] text-primary"
              >
                Butuh bantuan?
              </a>
            </div>

            <button
              type="submit"
              disabled={!filled}
              className={`block h-12 w-full rounded-lg border border-solid text-sm font-bold leading-[22px] transition-[background,border-color,color] duration-300 ${
                filled
                  ? "border-primary bg-primary cursor-pointer text-white hover:bg-primary-hover"
                  : "border-disabled-bg bg-disabled-bg cursor-not-allowed text-disabled-text"
              }`}
            >
              Selanjutnya
            </button>
          </form>

          {/* Separator */}
          <div className="my-6 flex items-center">
            <span className="h-px flex-1 border-b border-solid border-divider" />
            <span className="px-4 text-xs text-muted-foreground">
              atau masuk dengan
            </span>
            <span className="h-px flex-1 border-b border-solid border-divider" />
          </div>

          {/* Social logins — 3 tombol berfungsi */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setView("qr")}
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-solid border-placeholder bg-white text-sm font-bold leading-[22px] text-muted-foreground transition-[background,border-color,color] duration-300 active:border-disabled-text active:bg-subtle-surface"
            >
              <QrScanIcon />
              Scan Kode QR
            </button>
            <button
              type="button"
              data-testid="google-login"
              onClick={() =>
                openOAuth("https://accounts.google.com/", "google_oauth", 600)
              }
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-solid border-placeholder bg-white text-sm font-bold leading-[22px] text-muted-foreground transition-[background,border-color,color] duration-300 active:border-disabled-text active:bg-subtle-surface"
            >
              {/* ponytail: img svg asli Tokopedia CDN; inline bila butuh styling currentColor */}
              <img src="/images/google.svg" alt="" width={20} height={20} />
              Google
            </button>
            <button
              type="button"
              data-testid="tiktok-login"
              onClick={() =>
                openOAuth("https://www.tiktok.com/login", "tiktok_oauth", 700)
              }
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-solid border-placeholder bg-white text-sm font-bold leading-[22px] text-muted-foreground transition-[background,border-color,color] duration-300 active:border-disabled-text active:bg-subtle-surface"
            >
              <img src="/images/tiktok.svg" alt="" width={20} height={20} />
              Masuk dengan TikTok
            </button>
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            aria-label="Kembali"
            onClick={() => setView("form")}
            className="mr-1 cursor-pointer rounded-lg p-1 font-extrabold text-foreground hover:bg-subtle-surface"
          >
            <ChevronLeftIcon />
          </button>
          <div className="flex flex-col items-center py-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrSrc} alt="QR Code" width={260} height={260} key={qrKey} />
            <p className="mt-4 text-sm font-extrabold text-foreground">
              Masuk dengan scan kode QR
            </p>
            <p className="mt-1 max-w-[280px] text-center text-[12.25px] leading-[19.25px] text-muted-foreground">
              Scan kode QR di atas lewat aplikasi HP yang punya fitur scan kode QR.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setQrKey((k) => k + 1)}
            className="mb-2 block h-12 w-full cursor-pointer rounded-lg border border-solid border-primary bg-primary text-sm font-bold leading-[22px] text-white transition-[background,border-color] duration-300 hover:bg-primary-hover"
          >
            Refresh Kode QR
          </button>
          <button
            type="button"
            onClick={() => setView("form")}
            className="block h-12 w-full cursor-pointer rounded-lg border border-solid border-primary bg-white text-sm font-bold leading-[22px] text-primary transition-[background,border-color] duration-300 active:bg-subtle-surface"
          >
            Gunakan metode verifikasi lain
          </button>
        </>
      )}
    </div>
  );
}
