import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from './utils';

const buttonVariants = cva(
  // Base styles - applied to all buttons
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-base font-semibold uppercase transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative min-w-[140px]',
  {
    variants: {
      variant: {
        default: '',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        outline: 'border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-auto px-4 py-2',
        icon: 'h-10 w-10 min-w-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color?: string; // e.g., 'bg-sunbeam', 'bg-purple', 'bg-lavender' or just 'sunbeam', 'purple', 'lavender'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    // Parse color prop to generate dynamic background and shadow
    const colorStyles = React.useMemo(() => {
      // Ghost and link variants don't use shadows
      const noShadowVariants = variant === 'ghost' || variant === 'link';

      // Handle color prop
      if (color && !noShadowVariants) {
        // Extract color name from prop (e.g., 'sunbeam' from 'bg-sunbeam' or just 'sunbeam')
        const colorName = color.replace(/^bg-/, '');

        return {
          backgroundColor: `var(--color-${colorName}-500)`,
          color: colorName === 'sunbeam' ? 'var(--color-ink)' : 'var(--color-white)',
          boxShadow: `0 4px 0 var(--color-${colorName}-700)`,
        } as React.CSSProperties;
      }

      // Default colors for non-colored buttons
      if (variant === 'default' && !color && !noShadowVariants) {
        return {
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-primary-foreground)',
          boxShadow: '0 4px 0 var(--color-primary)',
        } as React.CSSProperties;
      }

      // Outline variant gets gray shadow
      if (variant === 'outline' && !noShadowVariants) {
        return {
          boxShadow: '0 4px 0 var(--color-gray-300)',
        } as React.CSSProperties;
      }

      // Default shadow for other buttons
      if (!noShadowVariants) {
        return {
          boxShadow: '0 4px 0 rgba(0, 0, 0, 0.25)',
        } as React.CSSProperties;
      }

      return {};
    }, [color, variant]);

    // Add hover and active state classes
    const stateClasses = React.useMemo(() => {
      if (variant === 'ghost' || variant === 'link') {
        return ''; // These variants don't have special shadow/transform states
      }
      return 'hover:brightness-[1.05] hover:-translate-y-px active:translate-y-px';
    }, [variant]);

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), stateClasses)}
        ref={ref}
        style={{ ...colorStyles, ...style }}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
