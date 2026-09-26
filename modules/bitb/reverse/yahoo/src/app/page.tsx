import Link from "next/link";
import { LoginCard } from "@/components/sites/login.yahoo.com/root/LoginCard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col yahoo bg-white relative overflow-x-hidden">
      {/* Header */}
      <header className="relative z-20 w-full px-6 md:px-[5%] lg:px-[10%] py-4 bg-white h-[64px]">
        <div className="gap-x-4 gap-y-4 items-center flex-row flex h-full">
          <div className="shrink-0 flex">
            <Link href="#">
              <img
                alt="Yahoo"
                className="dark:hidden"
                src="https://s.yimg.com/rz/p/yahoo_frontpage_en-US_s_f_p_bestfit_frontpage_2x.png"
                style={{ height: "2.25rem" }}
              />
              <img
                alt="Yahoo"
                className="hidden dark:block"
                src="https://s.yimg.com/rz/p/yahoo_frontpage_en-US_s_f_w_bestfit_frontpage_2x.png"
                style={{ height: "2.25rem" }}
              />
            </Link>
          </div>
          <div className="gap-x-4 gap-y-4 flex-row grow justify-end hidden md:flex">
            <a
              href="https://help.yahoo.com/kb/index?locale=id_ID&amp;page=product&amp;y=PROD_ACCT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#26282a] text-sm font-semibold hover:underline"
            >
              Help
            </a>
            <a
              href="https://legal.yahoo.com/sg/en/yahoo/terms/otos/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#26282a] text-sm font-semibold hover:underline"
            >
              Terms
            </a>
            <a
              href="https://legal.yahoo.com/sg/en/yahoo/privacy/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#26282a] text-sm font-semibold hover:underline"
            >
              Privacy
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full flex-1 flex flex-col">
        {/* Mobile View */}
        <div className="md:hidden flex-1 px-6 pt-4 pb-8">
          <LoginCard />
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex flex-1 w-full justify-center">
          {/* 1440px fixed width container, centered, bleeding off edges if screen is smaller */}
          <div className="relative w-[1440px] shrink-0 min-h-[1024px]">
            {/* Desktop Background Image */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
              style={{
                backgroundImage: 'url("https://tpc.googlesyndication.com/simgad/7023609561164461229")',
              }}
            />

            {/* Login Card Container */}
            <div className="absolute z-10 top-[11px] right-[205px]">
              <LoginCard />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Footer */}
      <footer className="md:hidden pb-8 pt-4 flex items-center justify-center gap-x-6 bg-white">
        <Link href="#" className="text-[#5b636a] text-sm font-semibold hover:underline">Help</Link>
        <Link href="#" className="text-[#5b636a] text-sm font-semibold hover:underline">Terms</Link>
        <Link href="#" className="text-[#5b636a] text-sm font-semibold hover:underline">Privacy</Link>
      </footer>
    </div>
  );
}
