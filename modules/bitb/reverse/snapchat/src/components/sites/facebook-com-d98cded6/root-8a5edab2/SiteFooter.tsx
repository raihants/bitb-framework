"use client";

const LANGUAGES = [
  "English (UK)",
  "Bahasa Indonesia",
  "Basa Jawa",
  "Bahasa Melayu",
  "日本語",
  "العربية",
  "Français (France)",
  "More languages…",
];

const LINKS = [
  "Sign up",
  "Log in",
  "Messenger",
  "Facebook Lite",
  "Video",
  "Meta Pay",
  "Meta Store",
  "Meta Quest",
  "Ray-Ban Meta",
  "Meta AI",
  "Instagram",
  "Threads",
  "Privacy Policy",
  "Privacy Centre",
  "Meta in Indonesia",
  "About",
  "Create ad",
  "Create Page",
  "Developers",
  "Careers",
  "Cookies",
  "AdChoices",
  "Terms",
  "Help",
  "Contact uploading and non-users",
];

// href="#" only — links are non-navigational by design (UI-clone guardrail; never point to real FB).
export function SiteFooter() {
  return (
    <footer className="mx-auto mt-6 w-full max-w-[980px] border-t border-[color:var(--fb-separator)] px-4 py-6 text-[12px] text-[color:var(--fb-footer-text)]">
      <div className="mb-3 flex flex-wrap gap-x-6 gap-y-2">
        {LANGUAGES.map((lang, i) => (
          <a
            key={lang}
            href="#"
            onClick={(e) => e.preventDefault()}
            className={
              i === 0
                ? "text-[color:var(--fb-text)]"
                : "hover:underline"
            }
          >
            {lang}
          </a>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {LINKS.map((link) => (
          <a
            key={link}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hover:underline"
          >
            {link}
          </a>
        ))}
      </div>
      <p className="mt-4">Meta © 2025</p>
    </footer>
  );
}
