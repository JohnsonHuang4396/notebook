const jsLink = "/js/md";

export default [
	{
		text: "JS",
		collapsible: true,
		collapsed: false,
		items: [
			{ text: "JS好文", link: "/js/index.md" },
			{ text: "JS基础", link: `${jsLink}/JSBasic.md` },
			{ text: "JS手撕", link: `${jsLink}/JSAdvance.md` },
		],
	},
];
