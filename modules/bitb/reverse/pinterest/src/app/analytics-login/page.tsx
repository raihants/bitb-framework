"use client";
import React, { useState } from 'react';
import MasonryBackground from '@/components/sites/analytics-pinterest-com/login/MasonryBackground';
import LoginDialog from '@/components/sites/analytics-pinterest-com/login/LoginDialog';
import GoogleSignInPopup from '@/components/sites/analytics-pinterest-com/login/GoogleSignInPopup';

export default function AnalyticsLoginPage() {
  const [showGooglePopup, setShowGooglePopup] = useState(false);
  return (
    <div className="relative min-h-screen w-full bg-white md:bg-black overflow-x-hidden">
      {/* Desktop Background */}
      <div className="hidden md:block"><MasonryBackground /></div>
      {/* Center dialog */}
      <div className="absolute inset-0 flex items-start md:items-center justify-center z-20 md:p-4 bg-white md:bg-transparent">
        <LoginDialog onGoogleClick={() => setShowGooglePopup(true)} />
      </div>
      {/* Google popup */}
      {showGooglePopup && <GoogleSignInPopup onClose={() => setShowGooglePopup(false)} />}
    </div>
  );
}
