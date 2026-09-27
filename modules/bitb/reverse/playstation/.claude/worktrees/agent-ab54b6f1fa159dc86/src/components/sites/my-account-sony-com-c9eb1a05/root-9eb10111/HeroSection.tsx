import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { SearchIcon } from '@/components/sites/my-account-sony-com-c9eb1a05/shared/icons';

interface HeroSectionProps {
  /** optional override for background image */
  bgImage?: string;
}

export default function HeroSection({ bgImage }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
        } else {
          el.classList.remove('opacity-100', 'translate-y-0');
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={cn(
        'hero flex flex-col items-center p-16 bg-[#f5f5f5]',
        'opacity-0 translate-y-5 transition-opacity duration-500 ease-[ease]',
        'md:flex-row md:justify-between'
      )}
      style={{ backgroundImage: `url(${bgImage ?? '/sites/my-account-sony-com-c9eb1a05/root-9eb10111/images/hero-bg.webp'})` }}
    >
      <div className="content space-y-4 md:w-1/2">
        <h1 className={cn('text-[48px] font-[700] text-[#111111]')}>Welcome to Sony Account</h1>
        <p className={cn('text-base text-[#111111]')}>Sign in to access your personalized services.</p>
        <button className={cn('bg-[#0066ff] text-white rounded-[8px] px-6 py-3 transition-colors duration-300')}>Sign In</button>
        <SearchIcon className="h-6 w-6 text-[#0066ff]" />
      </div>
      <img
        src="/sites/my-account-sony-com-c9eb1a05/root-9eb10111/images/hero-bg.webp"
        alt="Hero background"
        className="mt-4 md:mt-0 md:ml-4 object-cover w-full md:w-1/2"
      />
    </section>
  );
}
