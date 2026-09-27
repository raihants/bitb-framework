import React from "react";
import { Icons } from "@/components/sites/www-xbox-com-c671f65a/shared/icons";

export default function FooterSection() {
  return (
    <>
      {/* Support Banner */}
      <div className="w-full bg-[#107c10] text-white py-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <span className="text-[16px] font-semibold">Need additional support?</span>
        <a href="#" className="flex items-center text-white font-black text-[15px] hover:underline uppercase">
          VISIT XBOX SUPPORT <Icons.chevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>

      {/* Legal */}
      <div className="w-full bg-[#f2f2f2] text-[#616161] py-8 text-[11px] lg:text-[13px]">
        <div className="max-w-[1600px] mx-auto px-[5%]">
          <h4 className="font-semibold mb-2">XBOX Subscription Terms:</h4>
          <p className="mb-2">
            See <a href="#" className="underline">xbox.com/subscriptionterms</a>.
          </p>
        </div>
      </div>

      {/* Xbox Social */}
      <div className="w-full bg-white py-12">
        <div className="max-w-[1600px] mx-auto px-[5%] flex flex-col md:flex-row items-center gap-6">
          <span className="text-[16px] font-semibold text-[#262626]">Follow XBOX</span>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="#"><img src="/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/f86740d7-eedd-4d9c-a963-76af7e36c4b2.svg" alt="Email" className="w-8 h-8 hover:opacity-80" /></a>
            <a href="#"><img src="/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/45e3942b-7e08-4f7a-9e78-7b073d07118f.svg" alt="Facebook" className="w-8 h-8 hover:opacity-80" /></a>
            <a href="#"><img src="/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/c971845d-5e9d-4f26-8426-b71b9910b183.svg" alt="X" className="w-8 h-8 hover:opacity-80" /></a>
            <a href="#"><img src="/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/21a47e36-c00c-4fb0-bd18-bc72cfc41e5d.svg" alt="Instagram" className="w-8 h-8 hover:opacity-80" /></a>
            <a href="#"><img src="/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/94ca9c9a-22cf-4d0f-b76d-60cefb1f76b4.svg" alt="WhatsApp" className="w-8 h-8 hover:opacity-80" /></a>
            <a href="#"><img src="/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/e9389fa4-7e2f-4f25-860d-3ada8618dbda.svg" alt="TikTok" className="w-8 h-8 hover:opacity-80" /></a>
            <a href="#"><img src="/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/488d5ad9-d9fa-48dc-a0c8-020a35333edb.svg" alt="YouTube" className="w-8 h-8 hover:opacity-80" /></a>
          </div>
        </div>
      </div>

      {/* Global Microsoft Footer */}
      <footer className="w-full bg-[#f2f2f2] py-8 text-[#616161] text-[11px]">
        <div className="max-w-[1600px] mx-auto px-[5%] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-6 flex-wrap">
            <a href="#" className="hover:underline">English (United States)</a>
            <a href="#" className="hover:underline">Your Privacy Choices</a>
            <a href="#" className="hover:underline">Consumer Health Privacy</a>
          </div>
          <div className="flex gap-6 flex-wrap">
            <a href="#" className="hover:underline">Sitemap</a>
            <a href="#" className="hover:underline">Contact Microsoft</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms of use</a>
            <a href="#" className="hover:underline">Trademarks</a>
            <a href="#" className="hover:underline">Safety & eco</a>
            <a href="#" className="hover:underline">Recycling</a>
            <a href="#" className="hover:underline">About our ads</a>
            <span>© Microsoft 2026</span>
          </div>
        </div>
      </footer>
    </>
  );
}