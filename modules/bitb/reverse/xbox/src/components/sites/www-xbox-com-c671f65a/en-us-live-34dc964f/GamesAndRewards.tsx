import React from "react";
import { Icons } from "@/components/sites/www-xbox-com-c671f65a/shared/icons";

export default function GamesAndRewards() {
  return (
    <div className="w-full bg-white pb-12 lg:pb-24">
      <div className="max-w-[1600px] mx-auto px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Shop for games */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/0ace56e1-1a0c-4ca7-91f3-f475d6eb12ac.jpg"
              alt="Box shots for various games"
              className="w-full max-w-[788px] object-contain mb-8"
            />
            <h3 className="text-[24px] lg:text-[34px] font-bold mb-4 px-4">
              Shop for thousands of games
            </h3>
            <p className="text-[16px] mb-6 px-4 max-w-[600px]">
              Buy and download digital games and content directly from your console, Windows PC, or at xbox.com.
            </p>
            <a href="#" className="inline-flex items-center text-[#0a4f0a] font-black text-[15px] hover:underline uppercase tracking-wide group bg-[#9bf00b] px-6 py-2">
              BROWSE GAMES <Icons.chevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Earn rewards */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/b5058ccd-7e0c-49b1-9e9f-fbce0ec8446c.jpg"
              alt="Medal icon inside a glowing neon circle"
              className="w-full max-w-[788px] object-contain mb-8"
            />
            <h3 className="text-[24px] lg:text-[34px] font-bold mb-4 px-4">
              Earn rewards with XBOX
            </h3>
            <p className="text-[16px] mb-6 px-4 max-w-[600px]">
              Play games and complete quests on your XBOX console, Windows PC, or the XBOX mobile app to earn points towards gift cards and more.
            </p>
            <a href="#" className="inline-flex items-center text-[#0a4f0a] font-black text-[15px] hover:underline uppercase tracking-wide group bg-[#9bf00b] px-6 py-2">
              LEARN MORE <Icons.chevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}