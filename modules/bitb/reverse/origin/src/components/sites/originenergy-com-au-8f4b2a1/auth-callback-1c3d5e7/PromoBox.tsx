import React from "react"
import Image from "next/image"

export function PromoBox() {
  return (
    <div className="mt-8 bg-[#f5f5f5] rounded-xl p-5 flex items-start gap-4">
      <div className="flex-1">
        <h3 className="text-[17px] font-semibold text-[#333333] mb-2 leading-tight">
          Get even more with the Origin app
        </h3>
        <p className="text-[14px] text-[#666666] leading-relaxed">
          Pay your bills with Apple Pay or Google Pay, manage your services, track usage, instantly redeem fuel discounts and other rewards.
        </p>
      </div>
      {/* Assuming we just render a dummy QR code here for the clone */}
      <div className="w-[88px] h-[88px] shrink-0 bg-white border border-gray-200 p-1 rounded overflow-hidden">
        <Image
          src="/sites/originenergy-com-au-8f4b2a1/auth-callback-1c3d5e7/images/qr-code.png"
          alt="QR Code for Origin app"
          width={80}
          height={80}
          className="w-full h-full object-contain"
          unoptimized
        />
      </div>
    </div>
  )
}
