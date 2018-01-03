let FIGURES_STRINGS = {
  F: `
  011
  110
  010
  `,
  I1: `1`,
  I2: `11`,
  I3: `111`,
  I4: `1111`,
  I5: `11111`,
  L4: `
  10
  10
  11
  `,
  L5: `
  10
  10
  10
  11
  `,
  N: `
  10
  10
  11
  01
  `,
  O: `
  11
  11
  `,
  P: `
  11
  11
  10
  `,
  T4: `
  10
  11
  10
  `,
  U: `
  11
  10
  11
  `,
  V3: `
  10
  11
  `,
  V5: `
  100
  100
  111
  `,
  W: `
  100
  110
  011
  `,
  X: `
  010
  111
  010
  `,
  Y: `
  10
  11
  10
  10
  `,
  Z4: `
  10
  11
  01
  `,
  Z5: `
  100
  111
  001
  `
};

export class Figure {
  constructor(name, figureStr) {
    figureStr = figureStr.replace(/ /g, '')
      .trim();
    this.name = name;
    this.figureStr = figureStr;
  }

  toString() {
    return `Figure<${this.name}>:${this.figureStr}`;
  }

  valueOf() {
    return this.figureStr;
  }
}

/**
 * @type Array<Figure>
 * */
export const FIGURES = Object.keys(FIGURES_STRINGS)
  .map(key => new Figure(key, FIGURES_STRINGS[key]));


