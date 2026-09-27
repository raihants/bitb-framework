"use client";
import React, { useState } from 'react';
import MasonryBackground from '@/components/sites/pinterest-login/MasonryBackground';
import LoginDialog from '@/components/sites/pinterest-login/LoginDialog';
import GoogleSignInPopup from '@/components/sites/pinterest-login/GoogleSignInPopup';

export default function PinterestLoginPage() {
  const [showGooglePopup, setShowGooglePopup] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Masonry */}
      <MasonryBackground />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Top Left Sign up button */}
      <div className="absolute top-4 left-4 z-20">
        <button className="bg-white text-black font-bold py-2 px-4 rounded-full hover:bg-gray-200 transition">
          Sign up
        </button>
      </div>

      {/* Main Login Dialog */}
      <div className="absolute inset-0 flex items-center justify-center z-20 p-4">
        <LoginDialog onGoogleClick={() => setShowGooglePopup(true)} />
      </div>

      {/* Google Sign-in Popup overlay */}
      {showGooglePopup && (
        <GoogleSignInPopup onClose={() => setShowGooglePopup(false)} />
      )}
    </div>
  );
}
