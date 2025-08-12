# Footer Component

A flexible and composable footer component with multiple layout variants, built with Radix UI primitives and Tailwind CSS.

## Features

- **Multiple Layout Variants**: Simple, Centered, Columns, Newsletter, CTA, and Mission layouts
- **Dark Mode Support**: Built-in dark mode styling
- **Fully Composable**: Use pre-built layouts or compose your own with sub-components
- **Accessible**: Proper ARIA labels and semantic HTML
- **TypeScript Support**: Full type safety with comprehensive interfaces
- **Tree-shakable**: Import only what you need

## Installation

```bash
pnpm install @daddia/ui
```

## Usage

### Basic Example

```tsx
import { Footer } from '@repo/ui/footer';

const navigation = {
  sections: [
    {
      title: 'Solutions',
      links: [
        { name: 'Marketing', href: '/marketing' },
        { name: 'Analytics', href: '/analytics' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Guides', href: '/guides' },
      ],
    },
  ],
  social: [
    { name: 'GitHub', href: 'https://github.com', icon: GitHubIcon },
    { name: 'Twitter', href: 'https://twitter.com', icon: TwitterIcon },
  ],
};

function MyFooter() {
  return (
    <Footer
      layout="columns"
      variant="default"
      size="md"
      company={{
        name: 'Your Company',
        logo: '/logo.svg',
        copyright: '© 2024 Your Company. All rights reserved.',
      }}
      navigation={navigation}
    />
  );
}
```

### Layout Variants

#### Simple Layout

Minimal footer with just copyright and social links.

```tsx
<Footer
  layout="simple"
  company={{ copyright: '© 2024 Company' }}
  navigation={{ social: socialLinks }}
/>
```

#### Centered Layout

Navigation links centered with social icons below.

```tsx
<Footer
  layout="centered"
  navigation={{
    main: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
    ],
    social: socialLinks,
  }}
/>
```

#### Columns Layout

Traditional multi-column footer with navigation sections.

```tsx
<Footer layout="columns" company={companyInfo} navigation={{ sections: navigationSections }} />
```

#### Newsletter Layout

Footer with integrated newsletter signup form.

```tsx
<Footer
  layout="newsletter"
  newsletter={{
    title: 'Subscribe to our newsletter',
    description: 'Get weekly updates',
    onSubmit: (email) => console.log(email),
  }}
/>
```

#### CTA Layout

Footer with prominent call-to-action section.

```tsx
<Footer
  layout="cta"
  cta={{
    title: 'Start using our app today',
    description: 'Boost your productivity',
    buttonText: 'Get started',
    buttonHref: '/signup',
  }}
/>
```

#### Mission Layout

Footer with company mission statement and social links.

```tsx
<Footer
  layout="mission"
  company={{
    description: 'Making the world a better place',
    social: socialLinks,
  }}
/>
```

### Custom Composition

You can compose your own footer layout using the provided sub-components:

```tsx
import {
  Footer,
  FooterSection,
  FooterLinks,
  FooterSocial,
  FooterNewsletterForm,
} from '@daddia/ui/footer';

function CustomFooter() {
  return (
    <Footer>
      <div className="custom-layout">
        <FooterSection title="Custom Section">
          <p>Custom content here</p>
        </FooterSection>

        <FooterLinks
          links={[
            { name: 'Link 1', href: '#' },
            { name: 'Link 2', href: '#' },
          ]}
        />

        <FooterSocial links={socialLinks} />

        <FooterNewsletterForm onSubmit={(email) => handleSubscribe(email)} />
      </div>
    </Footer>
  );
}
```

## Props

### Footer Props

| Prop         | Type                                                                        | Default     | Description                       |
| ------------ | --------------------------------------------------------------------------- | ----------- | --------------------------------- |
| `layout`     | `'simple' \| 'centered' \| 'columns' \| 'newsletter' \| 'cta' \| 'mission'` | `'columns'` | Footer layout variant             |
| `variant`    | `'default' \| 'light' \| 'dark' \| 'transparent'`                           | `'default'` | Visual style variant              |
| `size`       | `'sm' \| 'md' \| 'lg'`                                                      | `'md'`      | Size variant                      |
| `company`    | `FooterCompanyInfo`                                                         | -           | Company information               |
| `navigation` | `FooterNavigation`                                                          | -           | Navigation structure              |
| `newsletter` | `FooterNewsletter`                                                          | -           | Newsletter configuration          |
| `cta`        | `FooterCTA`                                                                 | -           | Call-to-action configuration      |
| `children`   | `ReactNode`                                                                 | -           | Custom content (overrides layout) |

### Type Definitions

```typescript
interface FooterCompanyInfo {
  name?: string;
  logo?: ReactNode | string;
  logoDark?: ReactNode | string;
  description?: string;
  copyright?: string;
}

interface FooterNavigation {
  sections?: FooterLinkSection[];
  social?: FooterSocialLink[];
  main?: FooterLink[];
}

interface FooterNewsletter {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void | Promise<void>;
}

interface FooterCTA {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  onClick?: () => void;
}
```

## Styling

The component uses Tailwind CSS classes and supports dark mode out of the box. You can customize styles by:

1. Passing custom `className` props
2. Using the variant system
3. Overriding CVA configurations
4. Composing with custom components

## Accessibility

- Proper semantic HTML with `<footer>` element
- ARIA labels for navigation and social links
- Screen reader friendly social icon labels
- Keyboard navigation support
- Form labels for newsletter inputs

## Testing

The component includes comprehensive tests covering:

- All layout variants
- Style variants
- User interactions
- Accessibility features
- Custom composition

Run tests with:

```bash
pnpm test footer
```

## License

MIT
