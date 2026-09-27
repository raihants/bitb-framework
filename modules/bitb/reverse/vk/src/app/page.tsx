import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LoginCard } from "@/components/LoginCard"

export default function Home() {
  return (
    <div className="min-h-screen relative flex flex-col pt-14 overflow-hidden">
      {/* Dynamic background that handles both light and dark mode vectors */}
      <div className="absolute inset-0 z-0 bg-blue-500 dark:bg-[#0F0F0F] bg-gradient-to-br from-blue-400 to-blue-600 dark:from-[#151515] dark:to-[#0A0A0A]">
        {/* Large faint circular lines */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.1" />
            <circle cx="50" cy="50" r="70" fill="none" stroke="white" strokeWidth="0.1" />
            <circle cx="-10" cy="50" r="60" fill="none" stroke="white" strokeWidth="0.1" />
            <circle cx="110" cy="50" r="60" fill="none" stroke="white" strokeWidth="0.1" />
          </svg>
        </div>
      </div>

      <Header />

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 w-full">
        <LoginCard />

        <div className="mt-6 text-white dark:text-gray-300 text-sm font-medium cursor-pointer hover:underline">
          Help
        </div>
      </main>

      <Footer />
    </div>
  )
}