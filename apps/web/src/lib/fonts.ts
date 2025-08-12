import { Nunito, Lexend_Deca, Courgette } from 'next/font/google';

export const nunito = Nunito({
  weight: ['400', '500', '600', '700', '800', '900'], // Regular, Medium, Semibold, Bold, ExtraBold, Black
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const lexendDeca = Lexend_Deca({
  weight: ['400', '500', '600', '700', '800', '900'], // Regular, Medium, Semibold, Bold, ExtraBold, Black
  subsets: ['latin'],
  variable: '--font-lexend-deca',
  display: 'swap',
});

export const courgette = Courgette({
  weight: '400', // Courgette only has regular weight
  subsets: ['latin'],
  variable: '--font-courgette',
  display: 'swap',
});

export const fontClassNames = `${nunito.variable} ${lexendDeca.variable} ${courgette.variable}`;
