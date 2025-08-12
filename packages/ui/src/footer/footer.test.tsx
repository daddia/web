import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Footer, FooterSection, FooterLinks, FooterSocial, FooterNewsletterForm } from './footer';
import type { FooterProps } from './footer.types';

// Mock social icon component
const MockIcon = (props: any) => <svg {...props} data-testid="mock-icon" />;

describe('Footer', () => {
  const defaultProps: FooterProps = {
    company: {
      name: 'Test Company',
      copyright: '© 2024 Test Company. All rights reserved.',
    },
    navigation: {
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
        { name: 'GitHub', href: 'https://github.com', icon: MockIcon },
        { name: 'Twitter', href: 'https://twitter.com', icon: MockIcon },
      ],
    },
  };

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Footer {...defaultProps} />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders copyright text', () => {
      render(<Footer {...defaultProps} />);
      expect(screen.getByText('© 2024 Test Company. All rights reserved.')).toBeInTheDocument();
    });

    it('renders navigation sections', () => {
      render(<Footer {...defaultProps} />);
      expect(screen.getByText('Solutions')).toBeInTheDocument();
      expect(screen.getByText('Support')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
      render(<Footer {...defaultProps} />);
      expect(screen.getByRole('link', { name: 'Marketing' })).toHaveAttribute('href', '/marketing');
      expect(screen.getByRole('link', { name: 'Analytics' })).toHaveAttribute('href', '/analytics');
      expect(screen.getByRole('link', { name: 'Documentation' })).toHaveAttribute('href', '/docs');
      expect(screen.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', '/guides');
    });

    it('renders social links', () => {
      render(<Footer {...defaultProps} />);
      const githubLink = screen.getByRole('link', { name: 'GitHub' });
      const twitterLink = screen.getByRole('link', { name: 'Twitter' });

      expect(githubLink).toHaveAttribute('href', 'https://github.com');
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
    });

    it('renders social icons', () => {
      render(<Footer {...defaultProps} />);
      const icons = screen.getAllByTestId('mock-icon');
      expect(icons).toHaveLength(2);
    });

    it('renders with custom className', () => {
      render(<Footer {...defaultProps} className="custom-footer" />);
      expect(screen.getByRole('contentinfo')).toHaveClass('custom-footer');
    });

    it('renders custom children when provided', () => {
      render(
        <Footer>
          <div data-testid="custom-content">Custom Footer Content</div>
        </Footer>,
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Custom Footer Content')).toBeInTheDocument();
    });
  });

  describe('Layout Variants', () => {
    it('renders simple layout', () => {
      render(<Footer {...defaultProps} layout="simple" />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('© 2024 Test Company. All rights reserved.')).toBeInTheDocument();
    });

    it('renders centered layout', () => {
      const props: FooterProps = {
        ...defaultProps,
        layout: 'centered',
        navigation: {
          main: [
            { name: 'About', href: '/about' },
            { name: 'Blog', href: '/blog' },
          ],
          social: defaultProps.navigation?.social,
        },
      };
      render(<Footer {...props} />);
      expect(screen.getByRole('navigation', { name: 'Footer' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
      expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
    });

    it('renders columns layout', () => {
      render(<Footer {...defaultProps} layout="columns" />);
      expect(screen.getByText('Solutions')).toBeInTheDocument();
      expect(screen.getByText('Support')).toBeInTheDocument();
    });

    it('renders newsletter layout', () => {
      const props: FooterProps = {
        ...defaultProps,
        layout: 'newsletter',
        newsletter: {
          title: 'Subscribe to our newsletter',
          description: 'Get updates sent to your inbox.',
          placeholder: 'Enter your email',
          buttonText: 'Subscribe',
        },
      };
      render(<Footer {...props} />);
      expect(screen.getByText('Subscribe to our newsletter')).toBeInTheDocument();
      expect(screen.getByText('Get updates sent to your inbox.')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
    });

    it('renders CTA layout', () => {
      const props: FooterProps = {
        ...defaultProps,
        layout: 'cta',
        cta: {
          subtitle: 'Get started',
          title: 'Start using our app today',
          description: 'Boost your productivity with our tools.',
          buttonText: 'Get started',
          buttonHref: '/signup',
        },
      };
      render(<Footer {...props} />);
      expect(screen.getByText('Get started')).toBeInTheDocument();
      expect(screen.getByText('Start using our app today')).toBeInTheDocument();
      expect(screen.getByText('Boost your productivity with our tools.')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '/signup');
    });

    it('renders mission layout', () => {
      const props: FooterProps = {
        ...defaultProps,
        layout: 'mission',
        company: {
          ...defaultProps.company!,
          description: 'Making the world a better place.',
        },
      };
      render(<Footer {...props} />);
      expect(screen.getByText('Making the world a better place.')).toBeInTheDocument();
    });
  });

  describe('Style Variants', () => {
    it('applies default variant styles', () => {
      render(<Footer {...defaultProps} variant="default" />);
      expect(screen.getByRole('contentinfo')).toHaveClass('bg-white', 'dark:bg-gray-900');
    });

    it('applies light variant styles', () => {
      render(<Footer {...defaultProps} variant="light" />);
      expect(screen.getByRole('contentinfo')).toHaveClass('bg-gray-50', 'dark:bg-gray-950');
    });

    it('applies dark variant styles', () => {
      render(<Footer {...defaultProps} variant="dark" />);
      expect(screen.getByRole('contentinfo')).toHaveClass('bg-gray-900', 'text-white');
    });

    it('applies transparent variant styles', () => {
      render(<Footer {...defaultProps} variant="transparent" />);
      expect(screen.getByRole('contentinfo')).toHaveClass('bg-transparent');
    });
  });

  describe('Size Variants', () => {
    it('applies small size', () => {
      render(<Footer {...defaultProps} size="sm" />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('applies medium size', () => {
      render(<Footer {...defaultProps} size="md" />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('applies large size', () => {
      render(<Footer {...defaultProps} size="lg" />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  describe('Sub-components', () => {
    describe('FooterSection', () => {
      it('renders section with title and children', () => {
        render(
          <FooterSection title="Test Section">
            <p>Section content</p>
          </FooterSection>,
        );
        expect(screen.getByText('Test Section')).toBeInTheDocument();
        expect(screen.getByText('Section content')).toBeInTheDocument();
      });

      it('renders section without title', () => {
        render(
          <FooterSection>
            <p>Section content</p>
          </FooterSection>,
        );
        expect(screen.getByText('Section content')).toBeInTheDocument();
      });
    });

    describe('FooterLinks', () => {
      it('renders list of links', () => {
        const links = [
          { name: 'Link 1', href: '/link1' },
          { name: 'Link 2', href: '/link2' },
        ];
        render(<FooterLinks links={links} />);

        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Link 1' })).toHaveAttribute('href', '/link1');
        expect(screen.getByRole('link', { name: 'Link 2' })).toHaveAttribute('href', '/link2');
      });
    });

    describe('FooterSocial', () => {
      it('renders social links with icons', () => {
        const links = [
          { name: 'Facebook', href: 'https://facebook.com', icon: MockIcon },
          { name: 'Twitter', href: 'https://twitter.com', icon: MockIcon },
        ];
        render(<FooterSocial links={links} />);

        expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute(
          'href',
          'https://facebook.com',
        );
        expect(screen.getByRole('link', { name: 'Twitter' })).toHaveAttribute(
          'href',
          'https://twitter.com',
        );
        expect(screen.getAllByTestId('mock-icon')).toHaveLength(2);
      });

      it('includes screen reader only text for social links', () => {
        const links = [{ name: 'Facebook', href: 'https://facebook.com', icon: MockIcon }];
        render(<FooterSocial links={links} />);

        const srText = screen.getByText('Facebook');
        expect(srText).toHaveClass('sr-only');
      });
    });

    describe('FooterNewsletterForm', () => {
      it('renders newsletter form with default props', () => {
        render(<FooterNewsletterForm />);

        expect(screen.getByLabelText('Email address')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
      });

      it('renders with custom placeholder and button text', () => {
        render(<FooterNewsletterForm placeholder="Your email address" buttonText="Sign up" />);

        expect(screen.getByPlaceholderText('Your email address')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
      });

      it('handles form submission', async () => {
        const handleSubmit = jest.fn();
        render(<FooterNewsletterForm onSubmit={handleSubmit} />);

        const input = screen.getByPlaceholderText('Enter your email');
        const button = screen.getByRole('button', { name: 'Subscribe' });

        fireEvent.change(input, { target: { value: 'test@example.com' } });
        fireEvent.click(button);

        await waitFor(() => {
          expect(handleSubmit).toHaveBeenCalledWith('test@example.com');
        });
      });

      it('requires email input', () => {
        render(<FooterNewsletterForm />);
        const input = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;
        expect(input).toBeRequired();
        expect(input.type).toBe('email');
      });

      it('updates email state on input change', () => {
        render(<FooterNewsletterForm />);
        const input = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'user@test.com' } });
        expect(input.value).toBe('user@test.com');
      });
    });
  });

  describe('CTA Interactions', () => {
    it('renders CTA button as link when href provided', () => {
      const props: FooterProps = {
        layout: 'cta',
        cta: {
          buttonText: 'Get started',
          buttonHref: '/signup',
        },
      };
      render(<Footer {...props} />);

      const button = screen.getByRole('link', { name: 'Get started' });
      expect(button).toHaveAttribute('href', '/signup');
    });

    it('renders CTA button with onClick when no href provided', () => {
      const handleClick = jest.fn();
      const props: FooterProps = {
        layout: 'cta',
        cta: {
          buttonText: 'Get started',
          onClick: handleClick,
        },
      };
      render(<Footer {...props} />);

      const button = screen.getByRole('button', { name: 'Get started' });
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has footer landmark role', () => {
      render(<Footer {...defaultProps} />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('has navigation landmark for centered layout', () => {
      const props: FooterProps = {
        ...defaultProps,
        layout: 'centered',
        navigation: {
          main: [{ name: 'About', href: '/about' }],
        },
      };
      render(<Footer {...props} />);
      expect(screen.getByRole('navigation', { name: 'Footer' })).toBeInTheDocument();
    });

    it('uses lists for link groups', () => {
      render(<Footer {...defaultProps} />);
      const lists = screen.getAllByRole('list');
      expect(lists.length).toBeGreaterThan(0);
    });

    it('provides screen reader text for social icons', () => {
      render(<Footer {...defaultProps} />);
      expect(screen.getByText('GitHub')).toHaveClass('sr-only');
      expect(screen.getByText('Twitter')).toHaveClass('sr-only');
    });

    it('labels form inputs appropriately', () => {
      const props: FooterProps = {
        ...defaultProps,
        layout: 'newsletter',
        newsletter: {
          title: 'Newsletter',
        },
      };
      render(<Footer {...props} />);
      expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    });
  });
});
