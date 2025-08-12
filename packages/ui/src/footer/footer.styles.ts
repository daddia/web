import { cva } from 'class-variance-authority'

export const footerVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-gray-900',
        light: 'bg-gray-50 dark:bg-gray-950',
        dark: 'bg-gray-900 text-white',
        transparent: 'bg-transparent',
      },
      layout: {
        simple: '', // Simple footer with just copyright and social
        centered: '', // Centered navigation with social icons
        columns: '', // Multi-column layout
        newsletter: '', // With newsletter signup
        cta: '', // With call-to-action section
        mission: '', // With mission statement
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      layout: 'columns',
      size: 'md',
    },
  }
)

export const footerContainerVariants = cva(
  'mx-auto w-full',
  {
    variants: {
      size: {
        sm: 'max-w-5xl px-4 py-8 sm:px-6 lg:px-8',
        md: 'max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20',
        lg: 'max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32',
      },
      layout: {
        simple: '',
        centered: 'overflow-hidden',
        columns: '',
        newsletter: '',
        cta: '',
        mission: '',
      },
    },
    defaultVariants: {
      size: 'md',
      layout: 'columns',
    },
  }
)

export const footerSectionVariants = cva(
  '',
  {
    variants: {
      type: {
        links: 'space-y-4',
        social: 'flex gap-x-6',
        newsletter: 'mt-6 sm:flex sm:max-w-md',
        cta: 'mx-auto max-w-2xl text-center',
      },
    },
    defaultVariants: {
      type: 'links',
    },
  }
)

export const footerLinkVariants = cva(
  'transition-colors',
  {
    variants: {
      variant: {
        default: 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
        light: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
        dark: 'text-gray-300 hover:text-white',
        accent: 'text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm/6',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export const footerHeadingVariants = cva(
  'font-semibold',
  {
    variants: {
      variant: {
        default: 'text-gray-900 dark:text-white',
        light: 'text-gray-900 dark:text-gray-100',
        dark: 'text-white',
        accent: 'text-indigo-600 dark:text-indigo-400',
      },
      size: {
        sm: 'text-xs/5',
        md: 'text-sm/6',
        lg: 'text-base/7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export const footerButtonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-indigo-600 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500',
        secondary: 'bg-white text-gray-900 shadow-xs ring-1 ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:ring-white/20 dark:hover:bg-white/20',
        ghost: 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
      },
      size: {
        sm: 'rounded px-2.5 py-1.5 text-xs',
        md: 'rounded-md px-3 py-2 text-sm',
        lg: 'rounded-md px-3.5 py-2.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export const footerInputVariants = cva(
  'w-full min-w-0 rounded-md text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 dark:text-white dark:outline-gray-700 dark:placeholder:text-gray-500',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-white/5 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500',
        filled: 'bg-gray-50 dark:bg-gray-800 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500',
      },
      size: {
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-3.5 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export const footerDividerVariants = cva(
  'border-t',
  {
    variants: {
      variant: {
        default: 'border-gray-900/10 dark:border-white/10',
        light: 'border-gray-200 dark:border-gray-800',
        dark: 'border-gray-800',
      },
      spacing: {
        sm: 'mt-8 pt-8',
        md: 'mt-12 pt-8',
        lg: 'mt-16 pt-8 sm:mt-20 lg:mt-24',
      },
    },
    defaultVariants: {
      variant: 'default',
      spacing: 'md',
    },
  }
)
