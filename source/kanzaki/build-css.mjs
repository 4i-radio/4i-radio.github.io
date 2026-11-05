import { readFile, writeFile } from "node:fs/promises";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

const from = "globals.css";
const css = await readFile(from, "utf8");
const output = await postcss([tailwind({ optimize: true })]).process(css, { from });
await writeFile("../../members/kanzaki/style.css", output.css);
