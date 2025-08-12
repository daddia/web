import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { type footerVariants } from './footer.styles'

// Navigation and link types
export interface FooterLink {
  name: string
  href: string
}

export interface FooterLinkSection {
  title: string
  links: FooterLink[]
}

export interface FooterSocialLink {
  name: string
  href: string
  icon: (props: any) => JSX.Element
}

// Company information
export interface FooterCompanyInfo {
  name?: string
  logo?: ReactNode | string
  logoDark?: ReactNode | string
  description?: string
  copyright?: string
}

// Newsletter subscription
export interface FooterNewsletter {
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
  onSubmit?: (email: string) => void | Promise<void>
}

// Call to action
export interface FooterCTA {
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonHref?: string
  onClick?: () => void
}

// Main Footer navigation structure
export interface FooterNavigation {
  sections?: FooterLinkSection[]
  social?: FooterSocialLink[]
  main?: FooterLink[] // For simple centered layouts
}

// Footer props combining all options with variants
export interface FooterProps
  extends ComponentPropsWithoutRef<'footer'>,
    VariantProps<typeof footerVariants> {
  company?: FooterCompanyInfo
  navigation?: FooterNavigation
  newsletter?: FooterNewsletter
  cta?: FooterCTA
  children?: ReactNode
}

// Sub-component props for composition
export interface FooterSectionProps extends ComponentPropsWithoutRef<'div'> {
  title?: string
  children: ReactNode
}

export interface FooterLinksProps extends ComponentPropsWithoutRef<'ul'> {
  links: FooterLink[]
}

export interface FooterSocialProps extends ComponentPropsWithoutRef<'div'> {
  links: FooterSocialLink[]
  className?: string
}

export interface FooterNewsletterFormProps
  extends Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  placeholder?: string
  buttonText?: string
  onSubmit?: (email: string) => void | Promise<void>
}
