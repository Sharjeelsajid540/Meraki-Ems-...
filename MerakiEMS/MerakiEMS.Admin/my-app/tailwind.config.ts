import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       maxHeight: {
      '500px': '500px',
      '720px': '720px',
      '400px' : '400px',
      '300px' : '300px',
      '470px' : '470px',
    },
        borderRadius: {
        'custom': '2.5rem',
        'btn-border' : '1rem',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
          // Add custom screens here
      screens: {
        '3xl': '1600px', 
      },
       colors: {
        'custom-blue':  '#0B2B50',
        'navbar-color' : '#F1F2F2',
        'custom-hover': '#26476C',
        'custom-delete' : '#F1F2F2'
      },
        fontFamily: {
        'inter': ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
    variants: {
    extend: {
      backgroundColor: ['hover'],
    },
  },
  plugins: [],
};
export default config;
