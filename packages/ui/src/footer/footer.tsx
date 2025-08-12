'use client';

import * as React from 'react';
import { cn } from '../utils';
import {
  footerVariants,
  footerContainerVariants,
  footerSectionVariants,
  footerLinkVariants,
  footerHeadingVariants,
  footerButtonVariants,
  footerInputVariants,
  footerDividerVariants,
} from './footer.styles';
import type {
  FooterProps,
  FooterSectionProps,
  FooterLinksProps,
  FooterSocialProps,
  FooterNewsletterFormProps,
} from './footer.types';

// Sub-components for composition
export const FooterSection = React.forwardRef<HTMLDivElement, FooterSectionProps>(
  ({ title, children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {title && <h3 className={footerHeadingVariants()}>{title}</h3>}
        {children}
      </div>
    );
  },
);
FooterSection.displayName = 'FooterSection';

export const FooterLinks = React.forwardRef<HTMLUListElement, FooterLinksProps>(
  ({ links, className, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        role="list"
        className={cn(footerSectionVariants({ type: 'links' }), 'mt-6', className)}
        {...props}
      >
        {links.map((link) => (
          <li key={link.name}>
            <a href={link.href} className={footerLinkVariants()}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    );
  },
);
FooterLinks.displayName = 'FooterLinks';

export const FooterSocial = React.forwardRef<HTMLDivElement, FooterSocialProps>(
  ({ links, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(footerSectionVariants({ type: 'social' }), className)}
        {...props}
      >
        {links.map((item) => (
          <a key={item.name} href={item.href} className={footerLinkVariants()}>
            <span className="sr-only">{item.name}</span>
            <item.icon aria-hidden="true" className="size-6" />
          </a>
        ))}
      </div>
    );
  },
);
FooterSocial.displayName = 'FooterSocial';

export const FooterNewsletterForm = React.forwardRef<HTMLFormElement, FooterNewsletterFormProps>(
  (
    { placeholder = 'Enter your email', buttonText = 'Subscribe', onSubmit, className, ...props },
    ref,
  ) => {
    const [email, setEmail] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.(email);
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn(footerSectionVariants({ type: 'newsletter' }), className)}
        {...props}
      >
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          autoComplete="email"
          className={cn(footerInputVariants(), 'sm:w-64 xl:w-full')}
        />
        <div className="mt-4 sm:mt-0 sm:ml-4 sm:shrink-0">
          <button type="submit" className={footerButtonVariants()}>
            {buttonText}
          </button>
        </div>
      </form>
    );
  },
);
FooterNewsletterForm.displayName = 'FooterNewsletterForm';

// Layout renderers for different footer layouts
const SimpleLayout: React.FC<FooterProps> = ({ company, navigation, size }) => {
  return (
    <div className={footerContainerVariants({ size, layout: 'simple' })}>
      <div className="md:flex md:items-center md:justify-between">
        {navigation?.social && (
          <FooterSocial links={navigation.social} className="justify-center md:order-2" />
        )}
        {company?.copyright && (
          <p className={cn(footerLinkVariants(), 'mt-8 text-center md:order-1 md:mt-0')}>
            {company.copyright}
          </p>
        )}
      </div>
    </div>
  );
};

const CenteredLayout: React.FC<FooterProps> = ({ company, navigation, size }) => {
  return (
    <div className={footerContainerVariants({ size, layout: 'centered' })}>
      {navigation?.main && (
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {navigation.main.map((item) => (
            <a key={item.name} href={item.href} className={footerLinkVariants()}>
              {item.name}
            </a>
          ))}
        </nav>
      )}
      {navigation?.social && (
        <FooterSocial links={navigation.social} className="mt-16 justify-center" />
      )}
      {company?.copyright && (
        <p className={cn(footerLinkVariants(), 'mt-10 text-center')}>{company.copyright}</p>
      )}
    </div>
  );
};

const ColumnsLayout: React.FC<FooterProps> = ({ company, navigation, newsletter, size }) => {
  const hasNewsletter = Boolean(newsletter);
  const gridCols = hasNewsletter ? 'xl:grid-cols-3' : 'xl:grid-cols-3';

  return (
    <div className={footerContainerVariants({ size, layout: 'columns' })}>
      <div className={cn('xl:grid xl:gap-8', gridCols)}>
        {/* Logo section */}
        <div className="space-y-8">
          {company?.logo && (
            <>
              {typeof company.logo === 'string' ? (
                <>
                  <img
                    alt={company.name || 'Company logo'}
                    src={company.logo}
                    className="h-9 dark:hidden"
                  />
                  {company.logoDark && typeof company.logoDark === 'string' && (
                    <img
                      alt={company.name || 'Company logo'}
                      src={company.logoDark}
                      className="h-9 hidden dark:block"
                    />
                  )}
                </>
              ) : (
                <div className="h-9">{company.logo}</div>
              )}
            </>
          )}
          {company?.description && (
            <p className={cn(footerLinkVariants(), 'text-balance')}>{company.description}</p>
          )}
        </div>

        {/* Navigation sections */}
        <div
          className={cn(
            'mt-16 grid gap-8 xl:col-span-2 xl:mt-0',
            hasNewsletter ? 'grid-cols-2' : 'grid-cols-2',
          )}
        >
          {navigation?.sections && (
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {navigation.sections.map((section, idx) => (
                <div key={section.title} className={idx > 0 ? 'mt-10 md:mt-0' : ''}>
                  <FooterSection title={section.title}>
                    <FooterLinks links={section.links} />
                  </FooterSection>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter section (if in sidebar) */}
        {hasNewsletter && !company?.description && newsletter && (
          <div className="mt-10 xl:mt-0">
            <h3 className={footerHeadingVariants()}>
              {newsletter.title || 'Subscribe to our newsletter'}
            </h3>
            <p className={cn(footerLinkVariants(), 'mt-2')}>
              {newsletter.description ||
                'The latest news, articles, and resources, sent to your inbox weekly.'}
            </p>
            <FooterNewsletterForm
              placeholder={newsletter.placeholder}
              buttonText={newsletter.buttonText}
              onSubmit={newsletter.onSubmit}
            />
          </div>
        )}
      </div>

      {/* Newsletter below (if not in sidebar) */}
      {hasNewsletter && company?.description && newsletter && (
        <div className={footerDividerVariants()}>
          <div className="lg:flex lg:items-center lg:justify-between">
            <div>
              <h3 className={footerHeadingVariants()}>
                {newsletter.title || 'Subscribe to our newsletter'}
              </h3>
              <p className={cn(footerLinkVariants(), 'mt-2')}>
                {newsletter.description ||
                  'The latest news, articles, and resources, sent to your inbox weekly.'}
              </p>
            </div>
            <FooterNewsletterForm
              placeholder={newsletter.placeholder}
              buttonText={newsletter.buttonText}
              onSubmit={newsletter.onSubmit}
              className="lg:mt-0"
            />
          </div>
        </div>
      )}

      {/* Bottom section with copyright and social */}
      <div className={cn(footerDividerVariants(), 'md:flex md:items-center md:justify-between')}>
        {navigation?.social && <FooterSocial links={navigation.social} className="md:order-2" />}
        {company?.copyright && (
          <p className={cn(footerLinkVariants(), 'mt-8 md:order-1 md:mt-0')}>{company.copyright}</p>
        )}
      </div>
    </div>
  );
};

const CTALayout: React.FC<FooterProps> = ({ company, navigation, cta, size }) => {
  return (
    <div className={footerContainerVariants({ size, layout: 'cta' })}>
      {/* CTA Section */}
      {cta && (
        <div className="mx-auto max-w-2xl text-center">
          <hgroup>
            {cta.subtitle && (
              <h2 className={cn(footerHeadingVariants({ variant: 'accent' }), 'text-base/7')}>
                {cta.subtitle}
              </h2>
            )}
            {cta.title && (
              <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
                {cta.title}
              </p>
            )}
          </hgroup>
          {cta.description && (
            <p className={cn(footerLinkVariants(), 'mx-auto mt-6 max-w-xl text-lg/8 text-pretty')}>
              {cta.description}
            </p>
          )}
          {(cta.buttonText || cta.buttonHref || cta.onClick) && (
            <div className="mt-8 flex justify-center">
              {cta.buttonHref ? (
                <a href={cta.buttonHref} className={footerButtonVariants({ size: 'lg' })}>
                  {cta.buttonText || 'Get started'}
                </a>
              ) : (
                <button onClick={cta.onClick} className={footerButtonVariants({ size: 'lg' })}>
                  {cta.buttonText || 'Get started'}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Regular footer content below CTA */}
      <ColumnsLayout company={company} navigation={navigation} size={size} />
    </div>
  );
};

const MissionLayout: React.FC<FooterProps> = ({ company, navigation, size }) => {
  return (
    <div className={footerContainerVariants({ size, layout: 'mission' })}>
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="space-y-8">
          {company?.logo && (
            <>
              {typeof company.logo === 'string' ? (
                <>
                  <img
                    alt={company.name || 'Company logo'}
                    src={company.logo}
                    className="h-9 dark:hidden"
                  />
                  {company.logoDark && typeof company.logoDark === 'string' && (
                    <img
                      alt={company.name || 'Company logo'}
                      src={company.logoDark}
                      className="h-9 hidden dark:block"
                    />
                  )}
                </>
              ) : (
                <div className="h-9">{company.logo}</div>
              )}
            </>
          )}
          {company?.description && (
            <p className={cn(footerLinkVariants(), 'text-balance')}>{company.description}</p>
          )}
          {navigation?.social && <FooterSocial links={navigation.social} />}
        </div>

        {navigation?.sections && (
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {navigation.sections.slice(0, 2).map((section, idx) => (
                <div key={section.title} className={idx > 0 ? 'mt-10 md:mt-0' : ''}>
                  <FooterSection title={section.title}>
                    <FooterLinks links={section.links} />
                  </FooterSection>
                </div>
              ))}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {navigation.sections.slice(2, 4).map((section, idx) => (
                <div key={section.title} className={idx > 0 ? 'mt-10 md:mt-0' : ''}>
                  <FooterSection title={section.title}>
                    <FooterLinks links={section.links} />
                  </FooterSection>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {company?.copyright && (
        <div className={footerDividerVariants()}>
          <p className={footerLinkVariants()}>{company.copyright}</p>
        </div>
      )}
    </div>
  );
};

// Main Footer component
export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      variant,
      layout = 'columns',
      size = 'md',
      company,
      navigation,
      newsletter,
      cta,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // If children are provided, use them directly (for custom layouts)
    if (children) {
      return (
        <footer
          ref={ref}
          className={cn(footerVariants({ variant, layout, size }), className)}
          {...props}
        >
          {children}
        </footer>
      );
    }

    // Otherwise, render based on layout
    const renderLayout = () => {
      switch (layout) {
        case 'simple':
          return <SimpleLayout company={company} navigation={navigation} size={size} />;
        case 'centered':
          return <CenteredLayout company={company} navigation={navigation} size={size} />;
        case 'newsletter':
          return (
            <ColumnsLayout
              company={company}
              navigation={navigation}
              newsletter={newsletter}
              size={size}
            />
          );
        case 'cta':
          return <CTALayout company={company} navigation={navigation} cta={cta} size={size} />;
        case 'mission':
          return <MissionLayout company={company} navigation={navigation} size={size} />;
        case 'columns':
        default:
          return (
            <ColumnsLayout
              company={company}
              navigation={navigation}
              newsletter={newsletter}
              size={size}
            />
          );
      }
    };

    return (
      <footer
        ref={ref}
        className={cn(footerVariants({ variant, layout, size }), className)}
        {...props}
      >
        {renderLayout()}
      </footer>
    );
  },
);

Footer.displayName = 'Footer';
