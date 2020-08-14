module.exports = {
  purge: [],
  theme: {
    spinner: theme => ({
      default: {
        color: "#dae1e7", // color you want to make the spinner
        size: "1em", // size of the spinner (used for both width and height)
        border: "2px", // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: "800ms" // the speed at which the spinner should rotate
      }
    })
  },
  variants: {
    //spinner: ["responsive"]
    borderWidth: ["responsive", "hover", "focus"]
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwindcss-spinner")({
      className: "spinner",
      themeKey: "spinner"
    })
  ]
};
