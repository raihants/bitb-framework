import { Info } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full py-6 px-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/80 dark:text-gray-400 relative z-10">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <span>VK © 2006–2026</span>
        <a href="#" className="flex items-center gap-1 hover:underline">
          <Info className="w-3.5 h-3.5" />
          Information about content
        </a>
        <a href="#" className="hover:underline">Terms</a>
        <a href="#" className="hover:underline">Learn more about VK ID</a>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 md:mt-0">
        <a href="#" className="hover:underline">VK Ads</a>
        <a href="#" className="hover:underline">Developers</a>
        <a href="#" className="hover:underline ml-4 font-medium text-white dark:text-gray-300">English</a>
      </div>
    </footer>
  )
}