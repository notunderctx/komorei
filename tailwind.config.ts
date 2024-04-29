import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
      height: {
        extalarge: "388px",
      },

      colors: {
        Kumo: "#201f31",
        kumo_Beta: "#2c2b40",
        primary: "#141519",
        secondary: "#212127",
        action: "#FF7F57",
        image: "#3B3C41",
        txt: "#dbdcdd",
        tersier: "#0c0d10",
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        karla: ["Karla", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontWeight: {
        mega: "900",
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities);
    },
    function customUtilities({ addUtilities }: any) {
      const newUtilities = {
        ".search-box": {
          position: "absolute",
          display: "flex",
          top: "50%",
          left: "50%",
          transform: "translate(-100%, -50%)",
          background: "#2f3640",
          height: "40px",
          borderRadius: "40px",
        },
        ".search-box:hover > .search-text": {
          width: "240px",
          padding: "0 19px",
        },
        ".search-box:hover > .search-btn": {
          background: "white",
          color: "black",
        },
        ".search-btn": {
          color: "#e84118",
          float: "right",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "#2f3640",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "0.4s",
          cursor: "pointer",
          textDecoration: "none",
        },
        ".search-btn > i": {
          fontSize: "30px",
        },
        ".search-text": {
          border: "none",
          background: "none",
          outline: "none",
          float: "left",
          padding: "0",
          color: "white",
          fontSize: "16px",
          fontWeight: "normal",
          transition: "0.4s",
          lineHeight: "30px",
          width: "0px",
        },
      };

      addUtilities(newUtilities);
    },
  ],
} satisfies Config;

export default config;
