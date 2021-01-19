module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backdropFilter: {
      none: "none",
      blur: "blur(50px)",
    },
    extend: {
      colors: {
        gradient0: "var(--gradient0)",
        gradient1: "var(--gradient1)",
        gradient2: "var(--gradient2)",
        gradient3: "var(--gradient3)",
        gradient4: "var(--gradient4)",
        gradient5: "var(--gradient5)",
        gradient6: "var(--gradient6)",
      },
      backgroundImage: () => ({
        "palm-tree":
          "url('https://images.unsplash.com/photo-1610407672428-c44dd6981eec?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1576&q=80')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [require("tailwindcss-filters")],
};
