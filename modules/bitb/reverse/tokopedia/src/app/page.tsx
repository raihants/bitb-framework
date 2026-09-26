import Link from "next/link";
import LoginCard from "@/components/LoginCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="pt-8 pb-[9px] text-center">
        <Link href="/" aria-label="Tokopedia">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/tkp-logo.png"
            alt="Tokopedia"
            width={160}
            height={34}
            className="mx-auto"
          />
        </Link>
      </header>

      {/* Struktur identik situs asli: .css-8w8z3o — login-bg full-width,
          kartu .content absolute top-15px menimpa gambar */}
      <div className="relative mt-[30px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/login-bg.png"
          alt=""
          aria-hidden="true"
          className="mx-auto block w-full max-w-[816px]"
        />
        <div className="absolute inset-x-0 top-[15px] mx-auto w-fit">
          <LoginCard />
        </div>
      </div>

      <footer className="py-4 text-center text-xs text-foreground">
        © 2009-{new Date().getFullYear()}, PT Tokopedia
        <a
          href="https://www.tokopedia.com/help"
          className="ml-4 inline-block pl-0 font-semibold text-primary"
        >
          Bantuan
        </a>
      </footer>
    </main>
  );
}
