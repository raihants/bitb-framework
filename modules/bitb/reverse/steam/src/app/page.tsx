"use client";

import React, { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // ponytail: no backend submission, demo only
    alert('Demo: Tidak ada data yang dikirim ke server.');
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: '"Motiva Sans", Arial, sans-serif', backgroundColor: 'rgb(24, 26, 33)' }}
    >
      {/* ── BACKGROUND ── */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(24, 26, 33, 0) 0%, rgb(24, 26, 33) 100%), url("https://store.fastly.steamstatic.com/public/shared/images/joinsteam/new_login_bg_strong_mask.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── GLOBAL HEADER ── */}
      <header
        className="relative z-50 flex justify-center h-[60px] md:h-[104px]"
        style={{ backgroundColor: 'rgb(23, 26, 33)' }}
      >
        {/* Desktop Header */}
        <div className="hidden md:flex w-full items-center justify-between px-4" style={{ maxWidth: '940px' }}>
          <div className="flex items-center gap-8">
            <a href="https://store.steampowered.com" className="flex-shrink-0">
              <img
                src="https://store.fastly.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016"
                alt="Link to the Steam Homepage"
                style={{ width: '176px', height: 'auto' }}
              />
            </a>
            <nav className="hidden md:flex items-end h-full pb-0" style={{ gap: '0px' }}>
              {[
                { label: 'STORE', active: true },
                { label: 'COMMUNITY' },
                { label: 'ABOUT' },
                { label: 'SUPPORT' },
              ].map(({ label, active }) => (
                <a
                  key={label}
                  href="#"
                  className="menuitem"
                  style={{
                    display: 'inline-block',
                    padding: '0 14px',
                    lineHeight: '104px',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: active ? 'rgb(26, 159, 255)' : 'rgb(184, 182, 180)',
                    textDecoration: 'none',
                    borderBottom: active ? '2px solid rgb(26, 159, 255)' : '2px solid transparent',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3" style={{ fontSize: '11px' }}>
            <a href="#" className="header_installsteam_btn header_installsteam_btn_green" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgb(92, 126, 16)',
                  backgroundImage: 'url("https://store.fastly.steamstatic.com/public/shared/images/header/btn_header_installsteam_download.png?v=1")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '10px 4px',
                  padding: '0px 9px 0px 35px',
                  height: '24px',
                  lineHeight: '24px',
                  color: 'rgb(229, 228, 220)',
                  fontSize: '11px',
                  whiteSpace: 'nowrap',
                }}
              >
                Install Steam
              </div>
            </a>
            <a href="#" className="global_action_link" style={{ color: 'rgb(184, 182, 180)', textDecoration: 'none', fontSize: '11px' }}>
              sign in
            </a>
            <span style={{ color: 'rgb(61, 68, 80)' }}>|</span>
            <span
              className="pulldown"
              style={{
                color: 'rgb(184, 182, 180)',
                fontSize: '11px',
                cursor: 'pointer',
                backgroundImage: 'url("https://store.fastly.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
                paddingRight: '14px',
              }}
            >
              language
            </span>
          </div>
        </div>

        {/* Mobile Header Content */}
        <div className="md:hidden flex w-full items-center px-4 gap-4 h-full">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col justify-center gap-1 w-8 h-8 focus:outline-none"
          >
            <span className="w-6 h-0.5 bg-gray-300"></span>
            <span className="w-6 h-0.5 bg-gray-300"></span>
            <span className="w-6 h-0.5 bg-gray-300"></span>
          </button>

          <div className="flex-1 flex items-center h-[32px]">
            <input
              type="text"
              name="term_mobile"
              placeholder="Search the store"
              className="w-full h-full px-[10px] text-[13px] text-white outline-none"
              style={{
                backgroundColor: 'rgb(49, 57, 69)',
                fontFamily: '"Motiva Sans", Arial, sans-serif',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRight: 'none',
                borderRadius: '2px 0px 0px 2px',
              }}
            />
            <button
              className="h-full w-[36px] flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: 'rgb(26, 159, 255)',
                border: 'none',
                borderRadius: '0px 2px 2px 0px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE SIDEBAR MENU ── */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-[280px] h-full bg-[#171a21] flex flex-col overflow-y-auto">
            <div className="flex flex-col text-[14px] text-[#b8b6b4]">
              <a href="#" className="p-4 text-white font-bold border-b border-[#2a2a2a] bg-[#1a1a1a]">Sign in</a>

              <div className="flex justify-between items-center p-4 font-bold border-b border-[#2a2a2a] text-white">
                <span>Store</span>
                <svg width="10" height="7" viewBox="0 0 10 7" fill="currentColor"><path d="M0 0l5 7 5-7z" /></svg>
              </div>
              <div className="flex justify-between items-center p-4 font-bold border-b border-[#2a2a2a] text-[#b8b6b4]">
                <span>Community</span>
                <svg width="10" height="7" viewBox="0 0 10 7" fill="currentColor"><path d="M0 0l5 7 5-7z" /></svg>
              </div>
              <a href="#" className="p-4 font-bold border-b border-[#2a2a2a] text-[#b8b6b4]">About</a>
              <a href="#" className="p-4 font-bold border-b border-[#2a2a2a] text-[#b8b6b4]">Support</a>

              <div className="flex flex-col p-4 gap-4 mt-2 text-[12px]">
                <a href="#">Change language</a>
                <a href="#">Get the Steam Mobile App</a>
                <a href="#">View desktop website</a>
              </div>

              <div className="p-4 mt-8 opacity-60">
                <img src="https://store.fastly.steamstatic.com/public/shared/images/responsive/footerLogo_valve_new.png" alt="Valve" style={{ width: '92px', height: '26px' }} />
                <div className="text-[10px] mt-2 leading-tight">
                  © Valve Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries. Privacy Policy | Legal | Accessibility | Steam Subscriber Agreement | Refunds | Cookies
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SUB HEADER (Store Nav) ── */}
      <div
        className="relative z-40 flex justify-center"
        style={{
          background: 'linear-gradient(to right, rgba(34,58,81,1) 0%, rgba(27,40,56,1) 100%)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div
          className="w-full flex items-center justify-between"
          style={{ maxWidth: '940px', height: '46px', padding: '0 4px' }}
        >
          {/* Sub nav buttons (Desktop) */}
          <nav className="hidden md:flex items-center h-full">
            {['Browse', 'Recommendations', 'Categories', 'Ways to Play', 'Special Sections'].map((label) => (
              <button
                key={label}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '5px',
                  height: '46px',
                  padding: '0px 10px',
                  fontSize: '13px',
                  fontFamily: '"Motiva Sans", sans-serif',
                  color: 'rgb(255, 255, 255)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'box-shadow 0.2s ease-out, color 0.2s ease-out',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgb(103, 193, 245)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgb(255, 255, 255)'; }}
              >
                {label}
                {/* Chevron down */}
                <svg width="10" height="7" viewBox="0 0 10 7" fill="currentColor" style={{ opacity: 0.6 }}>
                  <path d="M0 0l5 7 5-7z" />
                </svg>
              </button>
            ))}
          </nav>

          {/* Sub nav buttons (Mobile) */}
          <nav className="flex md:hidden items-center justify-start h-full w-full px-2 gap-4">
            {['Browse', 'Recommendations', 'More'].map((label) => (
              <button
                key={label}
                className="flex items-center gap-1 h-[46px] text-[12px] text-white bg-transparent outline-none"
                style={{ fontFamily: '"Motiva Sans", sans-serif' }}
              >
                {label}
                <svg width="10" height="7" viewBox="0 0 10 7" fill="currentColor">
                  <path d="M0 0l5 7 5-7z" />
                </svg>
              </button>
            ))}
          </nav>

          {/* Search bar (Desktop only) */}
          <div className="hidden md:flex items-center" style={{ height: '32px' }}>
            <input
              type="text"
              name="term"
              placeholder="Search the store"
              className="w-[300px]"
              style={{
                height: '32px',
                padding: '0px 10px',
                fontSize: '13px',
                fontFamily: '"Motiva Sans", Arial, sans-serif',
                color: 'rgb(255, 255, 255)',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRight: 'none',
                borderRadius: '2px 0px 0px 2px',
                outline: 'none',
              }}
            />
            <button
              style={{
                height: '32px',
                width: '36px',
                backgroundColor: 'rgba(103, 193, 245, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderLeft: 'none',
                borderRadius: '0px 2px 2px 0px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="rgb(184, 188, 191)">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
        <div style={{ width: '668px', maxWidth: '100%', padding: '0 16px' }}>

          {/* H2: Sign in */}
          <h2
            className="text-center md:text-left text-[28px] font-[800] text-white pt-[2px] mb-[10px]"
            style={{
              fontFamily: '"Motiva Sans", sans-serif',
            }}
          >
            Sign in
          </h2>

          {/* Login Card */}
          <div
            className="flex flex-col md:flex-row bg-transparent md:bg-[#181a21] border-none md:border md:border-white/10"
          >
            {/* ── Left Column: Form ── */}
            <div className="flex-1 p-0 md:p-[24px]">
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>

                {/* Account Name */}
                <div style={{ marginBottom: '16px' }}>
                  <label
                    className="block text-[12px] font-[400] text-[#1a9fff] mb-[6px] tracking-[0.04em] uppercase"
                  >
                    Sign in with account name
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      backgroundColor: 'rgb(50, 53, 60)',
                      color: 'rgb(255, 255, 255)',
                      fontSize: '15px',
                      fontFamily: 'Arial',
                      padding: '10px',
                      border: '1px solid rgb(50, 53, 60)',
                      borderRadius: '2px',
                      outline: 'none',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgb(26, 159, 255)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgb(50, 53, 60)'; }}
                  />
                </div>

                {/* Password */}
                <div style={{ marginBottom: '16px' }}>
                  <label
                    className="block text-[12px] font-[400] text-[#acb2b8] mb-[6px] tracking-[0.04em] uppercase"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      backgroundColor: 'rgb(50, 53, 60)',
                      color: 'rgb(255, 255, 255)',
                      fontSize: '15px',
                      fontFamily: 'Arial',
                      padding: '10px',
                      border: '1px solid rgb(50, 53, 60)',
                      borderRadius: '2px',
                      outline: 'none',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgb(26, 159, 255)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgb(50, 53, 60)'; }}
                  />
                </div>

                {/* Remember Me */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: 'rgb(50, 53, 60)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {rememberMe && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="rgb(255,255,255)" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M1 4l3 3 5-6" />
                      </svg>
                    )}
                  </div>
                  <label
                    onClick={() => setRememberMe(!rememberMe)}
                    style={{ fontSize: '13px', color: 'rgb(172, 178, 184)', cursor: 'pointer', userSelect: 'none' }}
                  >
                    Remember me
                  </label>
                </div>

                {/* Sign in Button */}
                <button
                  type="submit"
                  className="DjSvCZoKKfoNSmarsEcTS"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    fontFamily: '"Motiva Sans", sans-serif',
                    fontWeight: 400,
                    color: 'rgb(255, 255, 255)',
                    background: 'linear-gradient(90deg, rgb(6, 191, 255) 0%, rgb(45, 115, 255) 100%)',
                    border: 'none',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                >
                  Sign in
                </button>

                {/* Help link */}
                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                  <a
                    href="#"
                    style={{
                      fontSize: '13px',
                      color: 'rgb(139, 146, 154)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgb(255,255,255)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgb(139, 146, 154)'; }}
                  >
                    Help, I can&apos;t sign in
                  </a>
                </div>
              </form>

              {/* New to Steam + Create an account */}
              <div
                className="hidden md:flex flex-col justify-center items-center mt-[20px] p-0"
              >
                <div
                  className="headline"
                  style={{ fontSize: '12px', color: 'rgb(233, 233, 233)', marginBottom: '4px' }}
                >
                  New to Steam?
                </div>
                <a
                  href="#"
                  className="login_create_btn btn_blue_steamui btn_medium"
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontFamily: '"Motiva Sans", sans-serif',
                    color: 'rgb(255, 255, 255)',
                    backgroundColor: 'rgb(61, 68, 80)',
                    padding: '3px 20px',
                    margin: '10px 0px',
                    borderRadius: '2px',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgb(75, 83, 98)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgb(61, 68, 80)'; }}
                >
                  <span>Create an account</span>
                </a>
                <a
                  href="#"
                  className="login_join_desc"
                  style={{
                    fontSize: '11px',
                    color: 'rgb(139, 146, 154)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgb(255,255,255)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgb(139, 146, 154)'; }}
                >
                  Learn more about Steam
                </a>
              </div>
            </div>

            {/* ── Divider ── */}
            <div
              className="hidden md:block w-[1px] bg-white/10 my-[20px] shrink-0"
            />

            {/* ── Mobile QR Call-to-action ── */}
            <div className="flex md:hidden flex-col items-center mt-12 px-4 pb-8">
              <div className="text-[#1a9fff] text-[12px] font-bold mb-2">NEW!</div>
              <div className="text-[#8b929a] text-[12px] text-center max-w-[220px] leading-tight mb-4">
                Steam Mobile App users can sign in by scanning a QR code.
              </div>
              <button className="bg-[#3d4450] text-white text-[12px] font-bold py-2 px-4 rounded-[2px] w-[180px]">
                Show me a QR code
              </button>
            </div>

            {/* ── Right Column: QR Code (Desktop) ── */}
            <div
              className="hidden md:flex w-[270px] shrink-0 p-[24px] flex-col items-center"
            >
              <div
                style={{
                  fontSize: '12px',
                  color: 'rgb(26, 159, 255)',
                  marginBottom: '12px',
                  alignSelf: 'flex-start',
                }}
              >
                Or sign in with QR code
              </div>

              {/* QR Code box */}
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  position: 'relative',
                }}
              >
                {/* QR placeholder — real QR is a blob: URL per session */}
                <svg
                  width="184"
                  height="184"
                  viewBox="0 0 184 184"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ imageRendering: 'pixelated' }}
                >
                  {/* Finder pattern TL */}
                  <rect x="0" y="0" width="56" height="56" fill="black" rx="4" />
                  <rect x="8" y="8" width="40" height="40" fill="white" />
                  <rect x="16" y="16" width="24" height="24" fill="black" />
                  {/* Finder pattern TR */}
                  <rect x="128" y="0" width="56" height="56" fill="black" rx="4" />
                  <rect x="136" y="8" width="40" height="40" fill="white" />
                  <rect x="144" y="16" width="24" height="24" fill="black" />
                  {/* Finder pattern BL */}
                  <rect x="0" y="128" width="56" height="56" fill="black" rx="4" />
                  <rect x="8" y="136" width="40" height="40" fill="white" />
                  <rect x="16" y="144" width="24" height="24" fill="black" />
                  {/* Timing pattern H */}
                  {[64,72,80,88,96,104,112,120].map((x, i) => i % 2 === 0 && (
                    <rect key={x} x={x} y="56" width="8" height="8" fill="black" />
                  ))}
                  {/* Timing pattern V */}
                  {[64,72,80,88,96,104,112,120].map((y, i) => i % 2 === 0 && (
                    <rect key={y} x="56" y={y} width="8" height="8" fill="black" />
                  ))}
                  {/* Data modules (decorative) */}
                  {[
                    [64,64],[80,64],[96,64],[112,64],
                    [64,72],[88,72],[104,72],[120,72],
                    [72,80],[96,80],[112,80],
                    [64,88],[80,88],[104,88],
                    [72,96],[88,96],[120,96],
                    [64,104],[96,104],[112,104],
                    [80,112],[104,112],[120,112],
                    [64,120],[72,120],[88,120],[104,120],
                    [64,128],[80,128],[96,128],[112,128],
                    [72,136],[88,136],[120,136],
                    [64,144],[104,144],
                    [80,152],[96,152],[112,152],
                    [128,64],[136,64],[152,64],[160,64],
                    [128,72],[144,72],[168,72],
                    [136,80],[152,80],
                    [128,88],[160,88],[176,88],
                    [136,96],[144,96],[168,96],
                    [128,104],[152,104],[176,104],
                    [136,112],[160,112],
                    [128,120],[144,120],[168,120],[176,120],
                  ].map(([x, y], i) => (
                    <rect key={i} x={x} y={y} width="8" height="8" fill="black" />
                  ))}
                  {/* Steam logo center */}
                  <rect x="76" y="76" width="32" height="32" fill="white" />
                  <image
                    href="https://store.fastly.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016"
                    x="80" y="80" width="24" height="24"
                  />
                </svg>
              </div>

              <p
                style={{
                  fontSize: '12px',
                  fontFamily: '"Motiva Sans", sans-serif',
                  color: 'rgb(139, 146, 154)',
                  textAlign: 'center',
                  lineHeight: '18px',
                  margin: '0',
                }}
              >
                Use the{' '}
                <a
                  href="#"
                  style={{ color: 'rgb(255, 255, 255)', textDecoration: 'underline' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgb(26, 159, 255)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgb(255, 255, 255)'; }}
                >
                  Steam Mobile App
                </a>
                {' '}to sign in via QR code
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="relative z-10"
        style={{
          backgroundColor: 'rgb(23, 26, 33)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '20px 0',
        }}
      >
        <div
          style={{
            maxWidth: '940px',
            margin: '0 auto',
            padding: '0 16px',
            display: 'flex',
            flexDirection: 'row',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {/* Valve logo */}
          <div style={{ flexShrink: 0 }}>
            <img
              src="https://store.fastly.steamstatic.com/public/shared/images/responsive/footerLogo_valve_new.png"
              alt=""
              style={{ width: '92px', height: '26px', opacity: 0.6 }}
            />
            <div style={{ fontSize: '10px', color: 'rgb(100, 100, 100)', marginTop: '8px', maxWidth: '160px', lineHeight: '14px' }}>
              © 2024 Valve Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries.
            </div>
          </div>

          {/* Footer columns */}
          {[
            {
              head: 'STEAM',
              links: ['About Steam', 'Steam SSA', 'Steamworks', 'Steam Distribution', 'Gift Cards'],
            },
            {
              head: 'VALVE',
              links: ['Jobs', 'Steam', 'Half-Life', 'Portal', 'Counter-Strike'],
            },
            {
              head: 'LEGAL',
              links: ['Privacy Policy', 'Legal', 'Steam Subscriber Agreement', 'Refunds', 'Cookies'],
            },
            {
              head: 'MORE',
              links: ['Accessibility', 'Contact Steam Support'],
            },
          ].map(({ head, links }) => (
            <div key={head}>
              <h3
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  fontFamily: '"Motiva Sans", sans-serif',
                  color: 'rgb(184, 188, 191)',
                  lineHeight: '17px',
                  margin: '0 0 8px',
                }}
              >
                {head}
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {links.map((link) => (
                  <li key={link} style={{ marginBottom: '4px' }}>
                    <a
                      href="#"
                      style={{
                        fontSize: '11px',
                        color: 'rgb(100, 100, 100)',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgb(184, 188, 191)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgb(100, 100, 100)'; }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
