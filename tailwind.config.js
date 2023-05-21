/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Open_Sans: ['"Open Sans"', "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "blue-gray-100": "#F1F5F9",
      },
      borderRadius: {
        "10px": "10px",
        "100px": "100px",
      },
      fontSize: {
        sm: ["13px", "20px"],
        base: ["15px", "22px"],
        lg: ["32px", "48px"],
      },
      colors: {
        "black-100": "#0F172A",
        "gray-300": "#334155",
        "gray-500": "#64748B",
        "gray-800": "#EDF2F7",
      },
      height: {
        9.5: "38px",
      },
      width: {
        "338px": "338px",
      },
      boxShadow: {
        "header-shadow": "0px 3px 5px 0px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
