import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@repo/ui/button';

export default function NotFound() {
  return (
    <main className="relative isolate min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <Image
        alt=""
        src="/images/404.jpg"
        className="absolute inset-0 -z-20 size-full object-cover object-top"
        width={3050}
        height={1500}
        quality={80}
        priority
      />

      {/* White Overlay */}
      <div className="absolute inset-0 -z-10 bg-white opacity-40" />

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        {/* 404 Badge */}
        <div className="inline-flex">
          <span className="rounded-full bg-lavender-500 px-4 py-2 text-lg font-semibold uppercase text-lavender-50 ring-1 ring-inset ring-sunbeam-500/25">
            404 Error
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-8 text-5xl font-heading font-black tracking-tight text-balance sm:text-7xl">
          <span className="text-purple-500">Oops!</span>{' '}
          <span className="font-courgette text-lavender-500">Page not found</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg font-medium text-pretty text-gray-550 sm:text-xl/8">
          Looks like this page went on an adventure!
          <br />
          Let&apos;s get you back to familiar territory.
        </p>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <Button size="lg" color="bg-sunbeam" asChild>
            <Link href="/">
              <span aria-hidden="true">←</span> Return Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
