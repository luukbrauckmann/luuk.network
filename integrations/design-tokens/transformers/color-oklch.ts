import type { Transform } from "style-dictionary/types";
import { oklch, formatCss } from "culori";

const colorOklch: Transform = {
  name: 'color/oklch',
  type: 'value',
  filter: (token) => token.$type === 'color',
  transform: (token) => {
    try {
      return formatCss(oklch(token.$value));
    } catch {
      return token.$value
    }
  }
};

export default colorOklch;
