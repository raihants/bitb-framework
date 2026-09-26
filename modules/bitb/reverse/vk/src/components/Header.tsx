import { Search } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 w-full h-14 bg-white dark:bg-[#19191A] flex items-center justify-between px-4 z-50">
      <div className="flex items-center w-full max-w-full">
        {/* Left: Search */}
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search VK"
            className="block w-full pl-10 pr-3 py-1.5 border-none rounded-lg bg-gray-100 dark:bg-[#222223] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
          />
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Right: Create business page */}
        <div>
          <button className="px-4 py-1.5 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2A2A2B] text-black dark:text-white transition-colors bg-white dark:bg-[#19191A]">
            Create business page
          </button>
        </div>
      </div>
    </header>
  )
}