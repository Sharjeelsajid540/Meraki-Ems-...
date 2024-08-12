import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      spacing: {
        'marjin-top': '5px',
        'Welcome-text': '-40px',
        'UserName-text': '-43px',
      },

      borderRadius: {
        'custom': '2.5rem',
        'btn-border': '1rem',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

      },
      colors: {

        'custom-blue': '#0B2B50',
        'navbar-color': '#F1F2F2',
        'custom-hover': '#26476C'





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
