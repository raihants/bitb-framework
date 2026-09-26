"use client";

import React from 'react';

type Props = {
  onClose: () => void;
};

export default function GoogleSignInPopup({ onClose }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded shadow-lg p-6 max-w-sm w-full">
        <h3 className="text-xl font-bold mb-4">Sign in with Google</h3>
        <p className="text-gray-600 mb-6">Choose an account to continue to Pinterest.</p>
        <div className="space-y-3">
          <button className="w-full text-left bg-gray-100 hover:bg-gray-200 p-3 rounded">
            <strong>user@example.com</strong>
          </button>
          <button className="w-full text-left bg-gray-100 hover:bg-gray-200 p-3 rounded">
            Use another account
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 text-center text-sm font-semibold text-gray-500 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
