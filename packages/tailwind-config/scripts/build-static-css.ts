import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssPresetEnv from 'postcss-preset-env';
import process from 'process';

/* global console */

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const rootDir = path.resolve(__dirname, '..');
const sourceCssPath = path.join(rootDir, 'css', 'globals.css');
const textCssPath = path.join(rootDir, 'css', 'text.css');
const outputCssPath = path.join(rootDir, 'dist', 'globals.css');
const outputTextCssPath = path.join(rootDir, 'dist', 'text.css');
const tokensCssPath = path.join(
  rootDir,
  'node_modules',
  '@repo',
  'tokens',
  'dist',
  'css',
  'tokens.css',
);

// Ensure the dist directory exists
if (!fs.existsSync(path.join(rootDir, 'dist'))) {
  fs.mkdirSync(path.join(rootDir, 'dist'), { recursive: true });
}

// Function to extract CSS variables and their values
function extractCssVariables(css) {
  const variableMap = new Map();
  const variableRegex = /--[\w-]+:\s*([^;]+);/g;
  let match;

  while ((match = variableRegex.exec(css)) !== null) {
    const [fullMatch, value] = match;
    const name = fullMatch.split(':')[0].trim();
    variableMap.set(name, value.trim());
  }

  return variableMap;
}

// Function to recursively resolve font-related variables
function resolveFontVariables(css, variableMap) {
  let resolvedCss = css;
  const varRegex = /var\(([^)]+)\)/g;
  let match;
  let hasChanges = true;
  let iterationCount = 0;
  const MAX_ITERATIONS = 50;

  function resolveValue(value, _varName) {
    if (!value) return value;
    if (!value.includes('var(')) return value;

    let resolvedValue = value;
    const varMatches = value.match(/var\(([^)]+)\)/g) || [];

    for (const varMatch of varMatches) {
      const nestedVarName = varMatch.match(/var\(([^)]+)\)/)[1].trim();
      const nestedValue = variableMap.get(nestedVarName);
      if (nestedValue) {
        const fullyResolvedValue = resolveValue(nestedValue, nestedVarName);
        resolvedValue = resolvedValue.replace(varMatch, fullyResolvedValue);
      }
    }

    return resolvedValue;
  }

  while (hasChanges && iterationCount < MAX_ITERATIONS) {
    iterationCount++;
    hasChanges = false;
    let newCss = resolvedCss;
    varRegex.lastIndex = 0;

    while ((match = varRegex.exec(resolvedCss)) !== null) {
      const [fullMatch, varName] = match;
      const trimmedVarName = varName.trim();
      const value = variableMap.get(trimmedVarName);

      if (value) {
        const resolvedValue = resolveValue(value, trimmedVarName);
        if (resolvedValue !== value) {
          newCss = newCss.replace(fullMatch, resolvedValue);
          hasChanges = true;
        }
      }
    }

    resolvedCss = newCss;
  }

  if (iterationCount >= MAX_ITERATIONS) {
    console.warn(`Warning: Font variable resolution hit maximum iterations (${MAX_ITERATIONS})`);
  }

  return resolvedCss;
}

// Function to resolve non-font variables (original logic)
function resolveNonFontVariables(css, variableMap) {
  let resolvedCss = css;
  const varRegex = /var\(([^)]+)\)/g;
  let match;
  let hasChanges = true;
  let iterationCount = 0;
  const MAX_ITERATIONS = 50;

  while (hasChanges && iterationCount < MAX_ITERATIONS) {
    iterationCount++;
    hasChanges = false;
    let newCss = resolvedCss;
    varRegex.lastIndex = 0;

    while ((match = varRegex.exec(resolvedCss)) !== null) {
      const [fullMatch, varName] = match;
      const trimmedVarName = varName.trim();
      const value = variableMap.get(trimmedVarName);

      if (value) {
        if (value.includes('var(')) {
          hasChanges = true;
        } else {
          newCss = newCss.replace(fullMatch, value);
          hasChanges = true;
        }
      }
    }

    resolvedCss = newCss;
  }

  if (iterationCount >= MAX_ITERATIONS) {
    console.warn(
      `Warning: Non-font variable resolution hit maximum iterations (${MAX_ITERATIONS})`,
    );
  }

  return resolvedCss;
}

// Process the CSS files
async function processCss() {
  try {
    // Read the tokens CSS
    const tokensCss = fs.readFileSync(tokensCssPath, 'utf8');
    const tokensResult = await postcss([
      postcssPresetEnv({
        stage: 3,
      }),
    ]).process(tokensCss, {
      from: tokensCssPath,
    });

    // Extract variables from the tokens CSS
    const variableMap = extractCssVariables(tokensResult.css);

    // Process text.css with font variable resolution
    const textCss = fs.readFileSync(textCssPath, 'utf8');
    const textResult = await postcss([
      postcssCustomProperties({
        preserve: false,
      }),
      postcssPresetEnv({
        stage: 3,
        features: {
          'custom-properties': false,
        },
      }),
    ]).process(textCss, {
      from: textCssPath,
    });

    const themeMatch = textResult.css.match(/@theme\s*{([^}]*)}/);
    if (themeMatch) {
      let themeBlock = themeMatch[0];
      themeBlock = resolveFontVariables(themeBlock, variableMap);
      const outputTextCss = `@layer theme, base, components, utilities;\n@import "tailwindcss/theme.css" layer(theme);\n@import "tailwindcss/utilities.css" layer(utilities);\n\n${themeBlock}`;
      fs.writeFileSync(outputTextCssPath, outputTextCss);
      process.stdout.write(`✅ Text CSS generated at ${outputTextCssPath}\n`);
    }

    // Process webster.css with non-font variable resolution
    const sourceCss = fs.readFileSync(sourceCssPath, 'utf8');
    const combinedCss = `${tokensResult.css}\n\n${sourceCss}`;
    const result = await postcss([
      postcssCustomProperties({
        preserve: false,
      }),
      postcssPresetEnv({
        stage: 3,
        features: {
          'custom-properties': false,
        },
      }),
    ]).process(combinedCss, {
      from: sourceCssPath,
      to: outputCssPath,
    });

    const websterThemeMatch = result.css.match(/@theme\s*{([^}]*)}/);
    if (websterThemeMatch) {
      let themeBlock = websterThemeMatch[0];
      themeBlock = resolveNonFontVariables(themeBlock, variableMap);
      const outputCss = `@import 'tailwindcss';\n\n${themeBlock}`;
      fs.writeFileSync(outputCssPath, outputCss);
      process.stdout.write(`✅ Webster CSS generated at ${outputCssPath}\n`);
    } else {
      process.stderr.write('No @theme block found in the processed CSS\n');
      process.exit(1);
    }
  } catch (error) {
    process.stderr.write(`Error processing CSS: ${error}\n`);
    process.exit(1);
  }
}

// Run the processing
processCss();
