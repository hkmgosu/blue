export type SizesType = string;
export type SizeType = 'length' | 'width' | 'height' | 'weight';

export type SizeForSizes = {
  [key in SizesType]: {
    [key in SizeType]: number;
  };
};

export const sizeToMeasures: SizeForSizes = {
  none: {
    length: 0,
    height: 0,
    width: 0,
    weight: 0,
  },
  XS: {
    length: 10,
    height: 6,
    width: 10,
    weight: 0.5,
  },
  S: {
    length: 26,
    height: 16,
    width: 16,
    weight: 3,
  },
  M: {
    length: 26,
    height: 16,
    width: 36,
    weight: 6,
  },
  L: {
    length: 26,
    height: 31,
    width: 56,
    weight: 16,
  },
};

export const sizeOptions = Object.keys(sizeToMeasures).filter(
  (value) => value !== 'none'
);
