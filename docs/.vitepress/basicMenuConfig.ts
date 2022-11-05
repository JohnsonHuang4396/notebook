import { DefaultTheme } from "vitepress";
import jsMenuModule from "./jsMenuConfig";
import VueMenuModule from "./vueMenuConfig";
import HTMLMenuConfig from "./HTMLMenuConfig";
import mixMenuConfig from "./mixMenuConfig";

const sidebar: DefaultTheme.Sidebar = [
	...jsMenuModule,
	...VueMenuModule,
	...HTMLMenuConfig,
	...mixMenuConfig,
];

export default sidebar;
