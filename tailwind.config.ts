import type { Config } from "tailwindcss";
import { default as svgToDataUri } from "mini-svg-data-uri";
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

const twlConfig: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    AddCustomRadialBg,
    AddVariablesForColors,
    AddAuroraColors,
    BgGridUtilities,
  ],
};


function AddVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

function AddCustomRadialBg({ addUtilities, theme }: any) {
  const colors = flattenColorPalette(theme('colors'));

  const rgbaColor = (colorValue: string, opacity: number = 0.2) => {
    if (colorValue.startsWith('#')) {
      let r = 0, g = 0, b = 0;
      if (colorValue.length === 4) {
        r = parseInt(colorValue[1] + colorValue[1], 16);
        g = parseInt(colorValue[2] + colorValue[2], 16);
        b = parseInt(colorValue[3] + colorValue[3], 16);
      } else if (colorValue.length === 7) {
        r = parseInt(colorValue[1] + colorValue[2], 16);
        g = parseInt(colorValue[3] + colorValue[4], 16);
        b = parseInt(colorValue[5] + colorValue[6], 16);
      }
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return colorValue;
  };

  const newUtilities = Object.entries(colors).reduce((acc, [colorName, colorValue]) => {
    const colorValueString = colorValue as string;
    return {
      ...acc,
      [`.bg-${colorName}-radial`]: {
        background: `radial-gradient(51.5% 42.89% at 50% 25%, hsla(0,0%,100%,.2) 0%, hsla(0,0%,100%,0) 50%), 
                     radial-gradient(70% 60% at 50% 50%, ${rgbaColor(colorValueString, 0.2)} 0%, ${rgbaColor(colorValueString, 0)} 100%), 
                     hsl(var(--background))`,
      },
    };
  }, {});

  addUtilities(newUtilities, ['responsive', 'hover']);
}


function BgGridUtilities({ matchUtilities, theme }: any) {
  matchUtilities(
    {
      "bg-grid": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-grid-small": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-dot": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
        )}")`,
      }),
      "bg-dot-thick": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
        )}")`,
      }),
    },
    { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
  );
}

function AddAuroraColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}


export default twlConfig;
