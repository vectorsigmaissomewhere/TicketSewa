/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      customGray: '#ebeef2',
    },
    fontFamily: {
      arial: ['Arial', 'Helvetica', 'sans-serif'],
    },
  },
};
export const plugins = [];

