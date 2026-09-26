"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { HelpCircle, QrCode } from "lucide-react"

export function LoginCard() {
  const [view, setView] = useState<'qr' | 'form'>('qr')
  const [loginType, setLoginType] = useState<'phone' | 'email'>('phone')

  if (view === 'qr') {
    return (
      <div className="bg-white dark:bg-[#19191A] p-8 rounded-2xl shadow-lg w-full max-w-[360px] mx-auto flex flex-col items-center">
        {/* QR Code Placeholder */}
        <div className="w-48 h-48 bg-white rounded-2xl border border-gray-100 p-2 mb-6 relative flex items-center justify-center">
          {/* Simple pattern to look like a QR code */}
          <div className="w-full h-full border-4 border-black border-dashed flex items-center justify-center relative">
            <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-1 p-2">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`bg-black ${i % 2 === 0 ? 'opacity-100' : 'opacity-80'}`}></div>
              ))}
            </div>
            <div className="bg-white w-10 h-10 absolute flex items-center justify-center rounded-lg z-10">
              <Icons.logo className="h-8 w-8" />
            </div>
          </div>
          {/* Corner markers */}
          <div className="absolute top-2 left-2 w-8 h-8 border-4 border-black bg-white z-10 flex items-center justify-center"><div className="w-3 h-3 bg-black"></div></div>
          <div className="absolute top-2 right-2 w-8 h-8 border-4 border-black bg-white z-10 flex items-center justify-center"><div className="w-3 h-3 bg-black"></div></div>
          <div className="absolute bottom-2 left-2 w-8 h-8 border-4 border-black bg-white z-10 flex items-center justify-center"><div className="w-3 h-3 bg-black"></div></div>
        </div>

        <h2 className="text-xl font-bold text-center mb-2 dark:text-white">Sign in to VK</h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-1">
          Scan the QR code with your camera
        </p>
        <a href="#" className="text-sm text-primary hover:underline mb-8">Learn more</a>

        <div className="w-full space-y-3">
          <Button
            variant="outline"
            className="w-full h-10 text-base font-medium rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#2A2A2B]"
            onClick={() => setView('form')}
          >
            Other sign-in options
          </Button>
          <Button
            variant="outline"
            className="w-full h-10 text-base font-medium rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#2A2A2B]"
          >
            Sign up
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-[#19191A] p-8 rounded-2xl shadow-lg w-full max-w-[360px] mx-auto">
      <div className="flex justify-center mb-4">
        <Icons.logo className="h-10 w-10" />
      </div>

      <h2 className="text-xl font-bold text-center mb-6 dark:text-white">Sign in to VK</h2>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 dark:bg-[#2A2A2B] rounded-lg mb-6">
        <button
          onClick={() => setLoginType('phone')}
          className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
            loginType === 'phone'
              ? 'bg-white dark:bg-[#3D3D3E] shadow-sm text-black dark:text-white'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Phone
        </button>
        <button
          onClick={() => setLoginType('email')}
          className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
            loginType === 'email'
              ? 'bg-white dark:bg-[#3D3D3E] shadow-sm text-black dark:text-white'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Email
        </button>
      </div>

      <form className="space-y-4">
        {loginType === 'phone' ? (
          <div className="relative flex items-center">
            <div className="absolute left-3 flex items-center gap-2 pointer-events-none">
              {/* Fake Russian flag */}
              <div className="w-5 h-3.5 flex flex-col rounded-sm overflow-hidden border border-gray-200">
                <div className="h-1/3 bg-white"></div>
                <div className="h-1/3 bg-blue-600"></div>
                <div className="h-1/3 bg-red-600"></div>
              </div>
              <span className="text-sm dark:text-white">+7</span>
            </div>
            <Input
              type="tel"
              className="w-full h-11 pl-[4.5rem] bg-white dark:bg-[#19191A] border-gray-300 dark:border-gray-600 focus-visible:ring-primary/20 dark:text-white"
            />
          </div>
        ) : (
          <div className="relative flex items-center">
            <Input
              type="email"
              placeholder="Email"
              className="w-full h-11 bg-white dark:bg-[#19191A] border-gray-300 dark:border-gray-600 focus-visible:ring-primary/20 dark:text-white"
            />
          </div>
        )}

        <div className="flex items-center gap-2 pt-1 pb-2">
          <input
            type="checkbox"
            id="save-user"
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
            defaultChecked
          />
          <label htmlFor="save-user" className="text-sm dark:text-white cursor-pointer select-none">
            Save user
          </label>
          <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        </div>

        {/* Dynamic button style based on theme */}
        <Button className="w-full h-11 text-base font-medium rounded-lg bg-primary hover:bg-primary/90 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100">
          Sign in
        </Button>

        <Button variant="outline" className="w-full h-11 text-base font-medium rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#2A2A2B]">
          Sign up
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-[#19191A] text-gray-500 dark:text-gray-400">or use</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full h-11 text-base font-medium rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#2A2A2B] flex items-center justify-center gap-2"
        onClick={() => setView('qr')}
      >
        <QrCode className="w-5 h-5" />
        QR code
      </Button>

      <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
        By pressing Sign in, you agree to the <a href="#" className="text-gray-500 dark:text-gray-300 hover:underline">Terms of Service</a><br />
        and <a href="#" className="text-gray-500 dark:text-gray-300 hover:underline">Privacy Policy</a>
      </p>
    </div>
  )
}