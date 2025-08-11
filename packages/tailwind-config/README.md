# @repo/tailwind-config

Shared Tailwind CSS v4 configuration with Lumitut Design Tokens for a kid-friendly reading app design system.

## Features

- **Brand Colors**: Purple, Lavender, and Sunbeam color scales (16 shades each)
- **Typography**: Nunito (headings) and Lexend Deca (body) font families
- **Semantic Colors**: Success, warning, error, info states
- **Tailwind v4 Compatible**: Uses the new `@theme` directive

## Installation

```bash
pnpm add @repo/tailwind-config
```

## Usage

Import in your site's main CSS file:

```css
/* Import the shared theme */
@import '@repo/tailwind-config';
```

Or import the built version:

```css
@import '@repo/tailwind-config/dist';
```

## Available Colors

- **Purple** (50-950): Primary brand color
- **Lavender** (50-950): Secondary brand color
- **Sunbeam** (50-950): Accent color
- **Gray** (50-950): Neutral UI elements
- **Cloud**: Pure white
- **Ink**: Rich black

## Example Usage

```html
<div class="bg-purple-500 text-white rounded-2xl p-6">
  <h1 class="font-heading text-2xl text-sunbeam-300">Welcome to Lumitut!</h1>
  <p class="text-lavender-100 mt-4">Start your reading adventure today.</p>
</div>
```

## Build Scripts

```bash
# Build the package
pnpm build

# Watch mode for development
pnpm dev
```

## Structure

```
tailwind-config/
├── globals.css          # Source theme configuration
├── dist/
│   └── globals.css      # Built output
├── scripts/
│   └── build.ts         # Build script
└── postcss.config.mjs   # PostCSS configuration
```

## Dependencies

- `@repo/lumitut-tokens`: Design tokens package
- `tailwindcss`: v4.1+ required
- `postcss`: CSS processing

## License

MIT
