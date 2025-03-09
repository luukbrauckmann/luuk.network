import { existsSync, mkdirSync } from "node:fs";

export const generatedDir = './src/.generated';

export default function() {
  if (!existsSync(generatedDir)) {
    mkdirSync(generatedDir);
  }
};
