/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        animation: {
          fadeIn: "fadeIn 1s ease-in-out forwards",
        },
        colors: {
          primary: "#6C5CE7",  // Purple
          secondary: "#FF7675", // Red/Pink
          accent: "#00CEC9",  // Teal
          background: "#F5F5F5", // Light Grey
          dark: "#2D3436", // Dark Mode
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
          extend: {
            animation: {
              'fade-in': 'fadeIn 1s ease-out forwards',
              'fade-in-up': 'fadeInUp 1s ease-out forwards',
            },
            keyframes: {
              fadeIn: {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              },
              fadeInUp: {
                '0%': { opacity: 0, transform: 'translateY(10px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
            },
          },
          
        },
      },
    },
    plugins: [],
  };
 