/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#fff",
      black: "#343739",
      gray: "#97a4a8",
      "primary-50": "#E0EEF5",
      "primary-100": "#c1ddeb",
      "primary-200": "#A3CCE1",
      "primary-300": "#84BBD7",
      "primary-400": "#65AACD",
      "primary-500": "#4699C3",
      "danger-50": "#EFC1BD",
      "danger-100": "#E8A29C",
      "danger-200": "#E0837B",
      "danger-300": "#D8645A",
      "danger-400": "#D04539",
      "danger-500": "#AB3428",
      "warning-50": "#FDFAD9",
      "warning-100": "#FAF5B2",
      "warning-200": "#F7EF81",
      "warning-300": "#F7EB64",
      "warning-400": "#F5E63D",
      "warning-500": "#F3E016",
      "green-500": "#80ed99",
      "green-50": "#c7f9cc",
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/container-queries"),
  ],
};
