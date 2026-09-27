import Image from "next/image";
import Link from "next/link";
import { TwitchLogo } from "@/components/sites/twitch-7b268867/shared/icons";

export default function TwitchHome() {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#efeff1] font-sans overflow-hidden flex flex-col">
      {/* Navbar */}
      <nav className="h-[50px] bg-[#18181b] border-b border-[#000000] flex items-center justify-between px-2 shrink-0 z-50">
        <div className="flex items-center h-full">
          <Link href="/" className="p-1 mr-4 hover:bg-white/10 rounded-md transition-colors">
            <TwitchLogo className="text-[#bf94ff] w-7 h-8" />
          </Link>
          <div className="flex items-center h-full">
            <Link href="/" className="px-2 font-semibold text-[18px] text-[#bf94ff] hover:text-[#bf94ff]">
              Browse
            </Link>
            <button className="p-1 ml-2 hover:bg-white/10 rounded-md transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-[400px] mx-4">
          <div className="flex w-full bg-[#18181b] rounded-md border border-white/20 overflow-hidden focus-within:border-white focus-within:bg-black focus-within:ring-2 focus-within:ring-[#bf94ff]">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent px-3 py-1.5 text-[15px] outline-none placeholder-white/50"
            />
            <button className="bg-white/5 hover:bg-white/10 px-3 flex items-center justify-center border-l border-white/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M2 10.5a8.5 8.5 0 1 1 15.176 5.262l4.531 4.531-1.414 1.414-4.531-4.531A8.5 8.5 0 0 1 2 10.5Zm8.5 6.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-white/10 rounded-md transition-colors hidden sm:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M16.852 12.68 12 7.828 7.148 12.68 4 10.161V17h16v-6.839l-3.148 2.519ZM22 6v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6l5 4 5-5 5 5 5-4Z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="p-1 hover:bg-white/10 rounded-md transition-colors hidden sm:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M6 8a6 6 0 1 1 7.025 5.913l.012.036A3 3 0 0 0 15.883 16H17a4 4 0 0 1 4 4v2h-2v-2a2 2 0 0 0-2-2h-1.117A5 5 0 0 1 12 16.15 5 5 0 0 1 8.117 18H7a2 2 0 0 0-2 2v2H3v-2a4 4 0 0 1 4-4h1.117a3 3 0 0 0 2.846-2.051l.012-.036A6.002 6.002 0 0 1 6 8Zm6 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="p-1 hover:bg-white/10 rounded-md transition-colors hidden sm:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M18 15v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3l4-2v10l-4-2ZM4 6h12v12H4V6Z" clipRule="evenodd" />
            </svg>
          </button>

          <div className="flex items-center gap-2 ml-2">
            <Link href="/login" className="bg-white/10 hover:bg-white/20 text-white text-[13px] font-semibold h-[30px] px-3 rounded flex items-center transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="bg-[#9146ff] hover:bg-[#772ce8] text-white text-[13px] font-semibold h-[30px] px-3 rounded flex items-center transition-colors">
              Sign Up
            </Link>
            <button className="p-1 ml-1 hover:bg-white/10 rounded-md transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2V4h12a2 2 0 0 0-2-2H5Z" />
                <path fillRule="evenodd" d="M7 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8Zm2 0h10v12H9V8Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[50px] xl:w-[240px] bg-[#1f1f23] flex-shrink-0 flex flex-col items-center xl:items-stretch overflow-y-auto hidden md:flex">
          <div className="py-3 px-2 xl:px-4 flex items-center justify-center xl:justify-between">
            <span className="hidden xl:inline font-semibold text-[13px]">Live Channels</span>
            <button className="hover:bg-white/10 p-1 rounded transition-colors hidden xl:block">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="m14.207 5 1.414 1.414-5.793 5.793L15.621 18l-1.414 1.414L7 12.207 14.207 5Z" />
              </svg>
            </button>
            <button className="hover:bg-white/10 p-1 rounded transition-colors xl:hidden">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.793 12.207 8 6.414 9.414 5l7.207 7.207-7.207 7.207L8 18l5.793-5.793Z" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-1 px-2">
            {[
              { name: "xQc", game: "Grand Theft Auto V", viewers: "35.2K", img: "img_0.jpeg" },
              { name: "caseoh_", game: "Minecraft", viewers: "48.2K", img: "img_1.png" },
              { name: "Subroza", game: "VALORANT", viewers: "2.6K", img: "img_3.png" },
              { name: "Zy0xxx", game: "Genshin Impact", viewers: "5.6K", img: "img_4.png" }
            ].map((channel, i) => (
              <a key={i} href="#" className="flex items-center p-1.5 hover:bg-white/5 rounded-md transition-colors group cursor-pointer">
                <div className="relative">
                  <Image
                    src={`/sites/twitch-7b268867/root-8a5edab2/images/${channel.img}`}
                    alt={channel.name}
                    width={30}
                    height={30}
                    className="rounded-full bg-zinc-800"
                  />
                </div>
                <div className="hidden xl:flex flex-col ml-2.5 flex-1 min-w-0">
                  <span className="font-semibold text-[14px] leading-tight truncate">{channel.name}</span>
                  <span className="text-[#adadb8] text-[13px] leading-tight truncate">{channel.game}</span>
                </div>
                <div className="hidden xl:flex items-center ml-2">
                  <div className="w-2 h-2 rounded-full bg-[#eb0400] mr-1.5"></div>
                  <span className="text-[13px] font-medium">{channel.viewers}</span>
                </div>
              </a>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative">
          {/* Carousel Placeholder */}
          <div className="w-full max-w-[1200px] mx-auto pt-8 pb-10 px-4 md:px-8 relative flex justify-center">
            <button className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded transition-colors hidden md:block">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="m14.207 5 1.414 1.414-5.793 5.793L15.621 18l-1.414 1.414L7 12.207 14.207 5Z" />
              </svg>
            </button>

            <div className="w-full aspect-video md:aspect-[21/9] max-w-[900px] bg-zinc-900 rounded flex overflow-hidden shadow-2xl shadow-black/50 relative">
              <div className="w-full md:w-3/4 h-full relative">
                <Image
                  src="/sites/twitch-7b268867/root-8a5edab2/images/img_5.jpg"
                  alt="caseoh_"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#eb0400] text-white text-[13px] font-semibold px-1.5 rounded">LIVE</div>
              </div>
              <div className="hidden md:flex w-1/4 bg-[#18181b] flex-col p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Image src="/sites/twitch-7b268867/root-8a5edab2/images/img_1.png" width={40} height={40} alt="Avatar" className="rounded-full" />
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#bf94ff]">caseoh_</h3>
                    <p className="text-[13px] text-[#bf94ff]">Minecraft</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  <span className="bg-white/10 text-white/80 text-[12px] font-semibold px-2 py-0.5 rounded-full">DropsEnabled</span>
                  <span className="bg-white/10 text-white/80 text-[12px] font-semibold px-2 py-0.5 rounded-full">English</span>
                </div>
                <p className="text-[13px] line-clamp-4">
                  🟨LOSING MY MIND🟨
                </p>
              </div>
            </div>

            <button className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded transition-colors hidden md:block">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.793 12.207 8 6.414 9.414 5l7.207 7.207-7.207 7.207L8 18l5.793-5.793Z" />
              </svg>
            </button>
          </div>

          <div className="max-w-[1600px] mx-auto px-4 md:px-8 pb-10">
            <h2 className="text-[18px] font-semibold mb-4 text-[#bf94ff]">
              <span className="text-[#efeff1]">Live</span> channels we think you'll like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex flex-col gap-2">
                  <div className="w-full aspect-video bg-zinc-800 rounded relative group overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 bg-[#9146ff] -translate-x-full group-hover:-translate-x-1 transition-transform z-0"></div>
                    <div className="absolute inset-0 bg-zinc-800 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform z-10 flex">
                      <Image
                        src="/sites/twitch-7b268867/root-8a5edab2/images/img_5.jpg"
                        alt="Thumbnail"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-[#eb0400] text-white text-[13px] font-semibold px-1.5 rounded z-20">LIVE</div>
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[13px] px-1.5 rounded z-20">48.2K viewers</div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-1">
                    <Image src="/sites/twitch-7b268867/root-8a5edab2/images/img_1.png" width={40} height={40} alt="Avatar" className="rounded-full flex-shrink-0 cursor-pointer" />
                    <div className="flex flex-col min-w-0">
                      <h3 className="text-[14px] font-semibold truncate hover:text-[#bf94ff] cursor-pointer">🟨LOSING MY MIND🟨</h3>
                      <p className="text-[13px] text-[#adadb8] truncate hover:underline cursor-pointer">caseoh_</p>
                      <p className="text-[13px] text-[#adadb8] hover:text-[#bf94ff] cursor-pointer">Minecraft</p>
                      <div className="flex gap-1 mt-1">
                        <span className="bg-white/10 hover:bg-white/20 cursor-pointer text-[#adadb8] text-[12px] font-semibold px-2 py-0.5 rounded-full">DropsEnabled</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-8 border-t border-white/10"></div>

            <h2 className="text-[18px] font-semibold mb-4 text-[#bf94ff]">
              <span className="text-[#efeff1]">Categories</span> we think you'll like
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {[
                { name: "Just Chatting", img: "img_6.jpg", viewers: "408K" },
                { name: "VALORANT", img: "img_7.jpg", viewers: "135K" },
                { name: "League of Legends", img: "img_8.jpg", viewers: "283K" },
                { name: "Dota 2", img: "img_6.jpg", viewers: "80K" },
                { name: "Minecraft", img: "img_7.jpg", viewers: "120K" },
                { name: "Genshin Impact", img: "img_8.jpg", viewers: "45K" },
              ].map((category, i) => (
                <div key={i} className="flex flex-col gap-1 cursor-pointer group">
                  <div className="w-full aspect-[3/4] bg-zinc-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#9146ff] -translate-x-full group-hover:-translate-x-1 transition-transform z-0"></div>
                    <div className="absolute inset-0 bg-zinc-800 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform z-10">
                      <Image
                        src={`/sites/twitch-7b268867/root-8a5edab2/images/${category.img}`}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold text-[14px] mt-1 hover:text-[#bf94ff] truncate">{category.name}</h3>
                  <p className="text-[13px] text-[#adadb8]">{category.viewers} viewers</p>
                  <div className="flex mt-1">
                    <span className="bg-white/10 hover:bg-white/20 text-[#adadb8] text-[12px] font-semibold px-2 py-0.5 rounded-full">IRL</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
