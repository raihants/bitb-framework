import React from "react";
import { Icons } from "@/components/sites/www-xbox-com-c671f65a/shared/icons";

export default function PlayXboxAnywhere() {
  return (
    <div className="w-full bg-white text-black py-12 lg:py-24">
      <div className="max-w-[1600px] mx-auto px-[5%] text-center">
        <h2 className="text-[32px] md:text-[45px] lg:text-[62px] font-black font-['SegoeProBlack',Segoe_UI,Helvetica,Arial,sans-serif] leading-tight mb-12">
          PLAY XBOX ANYWHERE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-4xl mx-auto">
          {/* Column 1 */}
          <div className="flex flex-col items-center">
            <h3 className="text-[20px] lg:text-[24px] font-semibold mb-4">
              Buy once, play anywhere
            </h3>
            <p className="text-[16px] mb-6">
              Buy a game once and play it across XBOX console, PC, and supported handhelds.
            </p>
            <a href="#" className="flex items-center text-[#0a4f0a] font-black text-[15px] hover:underline uppercase tracking-wide group">
              EXPLORE XBOX PLAY ANYWHERE <Icons.chevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center">
            <h3 className="text-[20px] lg:text-[24px] font-semibold mb-4">
              Progress goes with you
            </h3>
            <p className="text-[16px] mb-6">
              Bring your in-game progress, achievements, friends, benefits, and rewards wherever you choose to play.
            </p>
            <a href="#" className="flex items-center text-[#0a4f0a] font-black text-[15px] hover:underline uppercase tracking-wide group">
              CREATE ACCOUNT <Icons.chevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}