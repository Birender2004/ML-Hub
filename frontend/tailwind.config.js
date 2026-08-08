/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          950: "#070A12",
          900: "#0B1020",
          850: "#10172A",
          800: "#151E33",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(56, 189, 248, 0.14), 0 20px 80px rgba(14, 165, 233, 0.08)",
      },
    },
  },
  plugins: [],
};
