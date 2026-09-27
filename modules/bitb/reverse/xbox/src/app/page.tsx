import React from "react";
import { Header } from "@/components/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/Header";
import HeroBanner from "@/components/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/HeroBanner";
import FeatureGrid from "@/components/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/FeatureGrid";
import { GamePassHero } from "@/components/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/GamePassHero";
import PlayXboxAnywhere from "@/components/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/PlayXboxAnywhere";
import GamesAndRewards from "@/components/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/GamesAndRewards";
import FooterSection from "@/components/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/FooterSection";

export const metadata = {
  title: "Xbox Live | Xbox",
  description: "One account for everything Xbox.",
};

export default function XboxLivePage() {
  return (
    <div className="min-h-screen bg-white text-[#262626] font-['Segoe_UI',SegoeUI,'Helvetica_Neue',Helvetica,Arial,sans-serif]">
      <Header />
      <main>
        <HeroBanner />
        <FeatureGrid />
        <GamePassHero />
        <PlayXboxAnywhere />
        <GamesAndRewards />
      </main>
      <FooterSection />
    </div>
  );
}