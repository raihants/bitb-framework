"use client";
import React from 'react';
import { ChevronUp } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function HeroBanner() {
  return (
    <section className="SB-hero-banner pt-[96px]">
      <div className="m-banner zpt relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-[62px] font-bold font-['SegoeProBlack',_'Segoe_UI',_SegoeUI,_Helvetica,_Arial,_sans-serif] leading-[60px] tracking-[-0.62px] text-[#107c10]">
          ONE ACCOUNT FOR EVERYTHING XBOX
        </h1>
        <span className="relative top-[4px] text-[#9bf00b] flex justify-center mt-2">
          <ChevronUp size={45} strokeWidth={3} className="text-[#9bf00b]" />
        </span>
      </div>

      <div className="banner-background bg-[#e6e6e6] pt-[61px] pb-[92px] mt-[-70px]">
        <div className="m-banner zpt max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-[34px] font-bold leading-[40px] text-black">
            Keep connected to your games and friends, and get the most out of XBOX wherever you are.
          </h2>

          <div className="c-group pt-[24px] flex flex-row justify-center items-center">
            <a
              href="/en-US/auth/msa"
              className={cn(
                buttonVariants({ variant: "default" }),
                "c-call-to-action text-[15px] font-[900] text-[#0a4f0a] bg-[#9bf00b] hover:bg-[#9bf00b]/90 py-[5px] pr-[20px] pl-[22px] mr-[42px] h-auto rounded-none"
              )}
            >
              SIGN IN
            </a>
            <a
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "c-call-to-action text-[15px] font-[900] text-[#0a4f0a] bg-transparent hover:bg-transparent hover:underline hover:text-[#0a4f0a] h-auto p-0 rounded-none"
              )}
            >
              CREATE A FREE ACCOUNT
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
