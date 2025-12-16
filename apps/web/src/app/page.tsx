'use client';

import { Logo } from '@/components/logo';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex flex-col items-center justify-center">
            {/* Progressive enhancement: Show text first, then replace with SVG */}
            <div className="relative">
              {/* Text version - shown initially, hidden when JS loads */}
              <h1
                className={`font-heading text-6xl font-semibold tracking-tight text-slate-700 sm:text-7xl dark:text-slate-50 transition-opacity duration-300 ${
                  isLoaded ? 'opacity-0 absolute inset-0' : 'opacity-100'
                }`}
                aria-hidden={isLoaded}
              >
                daddia<span className="text-teal-600">.</span>
              </h1>

              {/* SVG Logo - fades in when JS loads */}
              <div
                className={`transition-opacity duration-500 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Logo className="h-16 w-auto sm:h-20 md:h-24 dark:brightness-110" />
              </div>

              {/* Screen reader text - always present for accessibility */}
              <h1 className="sr-only">daddia.</h1>
            </div>

            {/* Fallback for users with JavaScript disabled */}
            <noscript>
              <style>{`
                .js-only { display: none !important; }
              `}</style>
              <h1 className="font-heading text-6xl font-semibold tracking-tight text-slate-700 sm:text-7xl dark:text-slate-50">
                daddia<span className="text-teal-600">.</span>
              </h1>
            </noscript>
          </div>
        </div>
      </div>
    </div>
  );
}
