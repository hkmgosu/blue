type Size = string | 'S' | 'M' | 'L' | 'none';

type SizesToStringType = {
  [key in Size]: string;
};

const sizesToString: SizesToStringType = {
  none: '',
  S: 'Tamaño S',
  M: 'Tamaño M',
  L: 'Tamaño L',
};

export function parseSize(size: Size): string {
  return sizesToString[size];
}
