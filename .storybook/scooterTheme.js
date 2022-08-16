import { create } from "@storybook/theming";
import scooterLogo from "./scooter.png";

export default create({
  base: "dark",

  colorPrimary: "#ea364a",
  colorSecondary: "#ea364a",

  // UI
  appBg: "#121212",
  appContentBg: "#1e202e",
  appBorderColor: "#121212",
  appBorderRadius: 12,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: "monospace",

  // Text colors
  // textColor: 'white',
  // textInverseColor: 'black',

  // Toolbar default and active colors
  barTextColor: "white",
  barSelectedColor: "white",
  barBg: "#333647",

  // Form colors
  inputBg: "transparent",
  inputBorder: "silver",
  inputTextColor: "white",
  inputBorderRadius: 4,

  brandTitle: "scooter",
  brandUrl: "https://factlylabs.com/tools/scooter",
  brandImage: scooterLogo,
});
