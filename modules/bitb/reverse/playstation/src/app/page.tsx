import { Metadata } from "next";
import { SonyLogoIcon } from "@/components/sites/my-account-sony-com-c9eb1a05/shared/icons";
import { LoginForm } from "@/components/sites/my-account-sony-com-c9eb1a05/root-9eb10111/LoginForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign In | PlayStation",
  icons: {
    icon: [
      { url: "/sites/my-account-sony-com-c9eb1a05/root-9eb10111/images/sony_small.ico" },
    ],
    apple: [
      { url: "/sites/my-account-sony-com-c9eb1a05/root-9eb10111/images/appleicon.png" }
    ]
  }
};

export default function PlayStationLogin() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#090a0a]">
      {/* Background Image with radial gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/sites/my-account-sony-com-c9eb1a05/root-9eb10111/images/background_dark.jpg"
          alt="PlayStation Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(at 70vw 0%, rgba(255, 255, 255, 0.3) 0px, rgba(255, 255, 255, 0) 70vw)'
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-9 items-center justify-end bg-black">
          <a href="#" className="flex h-9 w-[102px] items-center justify-start cursor-pointer hover:opacity-80 transition-opacity">
            <SonyLogoIcon className="text-white" />
          </a>
        </header>

        {/* Main Content Area - 2 Column Layout on Desktop */}
        <div className="flex flex-1 flex-col md:flex-row">

          {/* Left Column: PlayStation Logo (Hidden on mobile) */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="relative h-[160px] w-[160px]">
              <Image
                src="/sites/my-account-sony-com-c9eb1a05/root-9eb10111/images/playstationfamilymark_dark.svg"
                alt="PlayStation Family Mark"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Column: Login Form & Footer */}
          <div className="flex flex-1 flex-col items-center justify-center pt-8 md:pt-0 bg-\[rgba(0,0,0,0.9)\] backdrop-blur-md w-full md:w-1/2">
            <LoginForm />

            {/* Footer */}
            <div className="mt-10 mb-3 flex flex-col items-center justify-center w-full max-w-[488px]">
              <a href="#" className="text-[16px] leading-[24px] text-[#249cff] hover:underline font-[sst,helvetica,arial,sans-serif]">
                Help/Site Map
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}