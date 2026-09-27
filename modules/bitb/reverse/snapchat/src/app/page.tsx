"use client";

import React, { useState } from 'react';

// Snapchat Ghost Outline SVG
function GhostIcon() {
  return (
    <svg
      width="58"
      height="58"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 6.5C18.2 6.5 15 10.3 14.7 17.5C14.7 18.2 13.9 18.6 13.3 18.4C12.3 18.1 11.2 18.3 10.5 19C9.7 19.8 9.5 21.1 10.1 22.1C10.7 23 11.8 23.5 12.8 23.3C13.5 23.2 14.1 23.7 14 24.4C13.8 26.1 13.2 27.6 12 28.8C10.6 30.2 8.7 31.1 6.5 31.5C5.8 31.6 5.3 32.2 5.5 32.9C5.8 34.3 7.3 35.3 8.7 35.1C10.6 34.9 12.3 35.8 13.1 37.5C13.7 38.8 14.9 39.5 16.3 39.5C18.3 39.5 20.7 38.3 24 38.3C27.3 38.3 29.7 39.5 31.7 39.5C33.1 39.5 34.3 38.8 34.9 37.5C35.7 35.8 37.4 34.9 39.3 35.1C40.7 35.3 42.2 34.3 42.5 32.9C42.7 32.2 42.2 31.6 41.5 31.5C39.3 31.1 37.4 30.2 36 28.8C34.8 27.6 34.2 26.1 34 24.4C33.9 23.7 34.5 23.2 35.2 23.3C36.2 23.5 37.3 23 37.9 22.1C38.5 21.1 38.3 19.8 37.5 19C36.8 18.3 35.7 18.1 34.7 18.4C34.1 18.6 33.3 18.2 33.3 17.5C33 10.3 29.8 6.5 24 6.5Z"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Google logo SVG
function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2045c0-.638-.0573-1.252-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.567 2.6836-3.874 2.6836-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.3441 0-4.3282-1.5836-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573C.3477 6.1732 0 7.5482 0 9s.3477 2.8268.9573 4.0418L3.964 10.71z" fill="#FBBC05"/>
      <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1632 6.6559 3.5795 9 3.5795z" fill="#EA4335"/>
    </svg>
  );
}

// Passkey icon SVG
function PasskeyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.5 2.5a6 6 0 0 0-5.83 7.42l-6.38 6.37a1 1 0 0 0-.29.71v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1.5H9.5a1 1 0 0 0 1-1V16H12a1 1 0 0 0 .7-.29l1.38-1.37A6 6 0 1 0 15.5 2.5Zm1.75 6a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Z" fill="#16191c"/>
    </svg>
  );
}

export default function SnapchatLoginPage() {
  const [username, setUsername] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f7f8',
        fontFamily: '"Avenir Next", Helvetica, Arial, sans-serif',
      }}
    >
      {/* Top Banner Button: Hanya muncul di mobile (< 768px) */}
      <div className="flex md:hidden justify-center pt-4 pb-2">
        <button
          type="button"
          style={{
            backgroundColor: '#FFFC00',
            color: '#000000',
            fontWeight: 700,
            fontSize: '14px',
            borderRadius: '20px',
            padding: '8px 24px',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
          }}
        >
          Open Snapchat
        </button>
      </div>

      {/* Main Content: Card Login */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 16px 32px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '390px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            border: '1px solid #eaeaea',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '36px 32px 28px',
            boxSizing: 'border-box',
          }}
        >
          {/* Logo Ghost */}
          <div style={{ marginBottom: '14px' }}>
            <GhostIcon />
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#16191c',
              textAlign: 'center',
              margin: '0 0 24px',
              letterSpacing: '-0.2px',
            }}
          >
            Log in to Snapchat
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '14px', width: '100%' }}>
              <label
                htmlFor="username"
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#5b626a',
                  marginBottom: '6px',
                  textAlign: 'left',
                }}
              >
                Username or Email
              </label>
              <input
                id="username"
                type="text"
                name="accountIdentifier"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  outline: 'none',
                  fontSize: '15px',
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Use phone number instead */}
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                color: '#0099ff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '18px',
                padding: 0,
              }}
            >
              Use phone number instead
            </button>

            {/* Next Button */}
            <button
              type="submit"
              style={{
                backgroundColor: '#0099ff',
                color: '#ffffff',
                border: 'none',
                borderRadius: '22px',
                height: '40px',
                minWidth: '115px',
                padding: '0 28px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                marginBottom: '24px',
              }}
            >
              Next
            </button>
          </form>

          {/* OR Divider */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #e5e7eb', margin: 0 }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280' }}>OR</span>
            <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #e5e7eb', margin: 0 }} />
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            style={{
              width: '100%',
              height: '44px',
              border: '1px solid #d8d8d8',
              borderRadius: '22px',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#16191c',
              cursor: 'pointer',
              marginBottom: '12px',
            }}
          >
            <GoogleLogo />
            Continue with Google
          </button>

          {/* Passkey Button */}
          <button
            type="button"
            style={{
              width: '100%',
              height: '44px',
              border: '1px solid #d8d8d8',
              borderRadius: '22px',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#16191c',
              cursor: 'pointer',
            }}
          >
            <PasskeyIcon />
            Sign in with a passkey
          </button>
        </div>

        {/* New to Snapchat? Sign Up */}
        <div
          style={{
            marginTop: '28px',
            display: 'flex',
            gap: '8px',
            fontSize: '14px',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#16191c' }}>New to Snapchat?</span>
          <a
            href="https://accounts.snapchat.com/v2/signup"
            style={{
              fontWeight: 600,
              color: '#16191c',
              textDecoration: 'none',
            }}
          >
            Sign Up
          </a>
        </div>
      </main>

      {/* Footer Nav Links: Tampil rapi di layar Desktop */}
      <footer
        style={{
          width: '100%',
          backgroundColor: '#ffffff',
          padding: '40px 0 32px',
          borderTop: '1px solid #eaeaea',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Column: Company */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#16191c', marginBottom: '14px' }}>
              Company
            </div>
            {['Snap Inc.', 'Careers', 'News'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  color: '#4f555e',
                  textDecoration: 'none',
                  marginBottom: '8px',
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Column: Community */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#16191c', marginBottom: '14px' }}>
              Community
            </div>
            {['Support', 'Community Guidelines', 'Safety Centre'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  color: '#4f555e',
                  textDecoration: 'none',
                  marginBottom: '8px',
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Column: Advertising */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#16191c', marginBottom: '14px' }}>
              Advertising
            </div>
            {['Buy Ads', 'Advertising Policies', 'Brand Guidelines'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  color: '#4f555e',
                  textDecoration: 'none',
                  marginBottom: '8px',
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Column: Legal */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#16191c', marginBottom: '14px' }}>
              Legal
            </div>
            {['Privacy Center', 'Cookie Policy', 'Terms of Service'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  color: '#4f555e',
                  textDecoration: 'none',
                  marginBottom: '8px',
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}