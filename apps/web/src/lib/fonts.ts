import { Poppins, Lora } from 'next/font/google';

export const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const lora = Lora({
  weight: ['400', '500', '600', '700'], // Regular, Medium, Semibold, Bold
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const fontClassNames = `${poppins.variable} ${lora.variable}`;
