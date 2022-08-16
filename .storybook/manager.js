import { addons } from "@storybook/addons";
import scooterTheme from "./scooterTheme";
import Favicon from "./public/favicon.ico";

addons.setConfig({
  theme: scooterTheme,
});

const link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href", Favicon);
document.head.appendChild(link);
