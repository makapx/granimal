/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        "granimal": {
          primary: "#4f518c",
          secondary: "#907ad6",
          accent: "#4cc9f0",
          neutral: "#2c2a4a",
          "neutral-content": "#fff",
          "base-100": "#fff",
          "base-100-content": "#2c2a4a",
          info: "#76a7f4",
          success: "#a5e6ba",
          warning: "#ffb600",
          error: "#f72634",
        },
        "granimal-dark": {
          primary: "#7b2cbf",
          secondary: "#907ad6",
          accent: "#4cc9f0",
          neutral: "#7b2cbf",
          "neutral-content": "#10002b",
          "base-100": "#10002b",
          "base-100-content": "#fff",
          info: "#76a7f4",
          success: "#a5e6ba",
          warning: "#ffb600",
          error: "#f72634",
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
