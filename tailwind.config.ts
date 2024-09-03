import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      display: ["Satisfy", "cursive"],
    },
    extend: {
      keyframes:{
        marquee: {
          '0%': { transform: 'translateX(280%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
