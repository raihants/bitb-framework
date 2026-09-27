"use client";
import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function GamePassHero({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "tallMob upgradeXGPHero relative w-full overflow-hidden flex items-center justify-center min-h-[500px]",
        className
      )}
    >
      {/* Background Image */}
      <div className="m-hero-item absolute inset-0">
        <Image
          src="/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/c2bdc214-7b42-4e24-82e6-7f027c220931.jpg"
          alt="Game Pass Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Box */}
      <div className="high-contrast relative z-10 flex flex-col items-center text-center px-4 md:px-8 py-16 w-full max-w-4xl mx-auto">
        <div className="mb-4">
          <Image
            src="/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/17a9e373-43e8-4f4d-adc8-c34322a695bd.svg"
            alt="Xbox Game Pass"
            width={300}
            height={50}
            className="w-[200px] md:w-[300px]"
          />
        </div>

        <h2
          className="text-white font-bold mb-4 tracking-tight"
          style={{
            fontFamily: 'SegoeProBlack, "Segoe UI", SegoeUI, Helvetica, Arial, sans-serif',
            fontSize: "clamp(32px, 5vw, 62px)",
            lineHeight: "60px",
            letterSpacing: "-0.62px"
          }}
        >
          UPGRADE TO XBOX GAME PASS
        </h2>

        <p
          className="text-white font-semibold mb-8 max-w-3xl"
          style={{
            fontSize: "clamp(18px, 3vw, 24px)",
            lineHeight: "28px"
          }}
        >
          Play new games on day one, access a library of hundreds of games, and get even more benefits with a Game Pass subscription.
        </p>

        <div className="c-group">
          <a
            href="#"
            className={cn(
              buttonVariants({ variant: "default" }),
              "group rounded-none bg-[#9bf00b] hover:bg-[#8ade0a] text-[#0a4f0a] font-black uppercase flex items-center transition-all h-auto c-call-to-action"
            )}
            style={{
              fontSize: "15px",
              padding: "5px 20px 5px 22px"
            }}
          >
            EXPLORE GAME PASS
            <ChevronRight className="ml-1 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
