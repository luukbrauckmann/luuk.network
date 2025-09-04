import type { Transform } from "style-dictionary/types";

const sizeFluid: Transform = {
  name: 'size/fluid',
  type: 'value',
  filter: (token) => token.$type === 'dimension',
  transform: (token) => {

  }
};

export default sizeFluid;
