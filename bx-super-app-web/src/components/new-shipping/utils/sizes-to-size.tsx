type Sizes = {
  length: number;
  width: number;
  height: number;
  weight: number;
};

type Size = 'XS' | 'S' | 'M' | 'L' | 'none';

type initialSizesType = {
  id: number;
  name: Size;
  long: number;
  height: number;
  width: number;
  weight: number;
};

export const initialSizes: initialSizesType[] = [
  {
    id: 0,
    name: 'none',
    long: 0,
    height: 0,
    width: 0,
    weight: 0,
  },
  {
    id: 1,
    name: 'XS',
    long: 14,
    height: 10,
    width: 14,
    weight: 0,
  },
  {
    id: 2,
    name: 'S',
    long: 30,
    height: 20,
    width: 20,
    weight: 3,
  },
  {
    id: 3,
    name: 'M',
    long: 30,
    height: 20,
    width: 40,
    weight: 6,
  },

  {
    id: 4,
    name: 'L',
    long: 30,
    height: 35,
    width: 60,
    weight: 16,
  },
];

export const sizesToSize = (send: Sizes): Size => {
  const volumetricWeight: number =
    (Number(send.height) * Number(send.length) * Number(send.width)) / 4000;

  let finalVolumetricWeight = 0;
  if (volumetricWeight >= Number(send.weight)) {
    finalVolumetricWeight = volumetricWeight;
  } else {
    finalVolumetricWeight = Number(send.weight);
  }
  switch (true) {
    case finalVolumetricWeight > 0 && finalVolumetricWeight <= 0.5:
      return 'XS';
    case finalVolumetricWeight > 0.5 && finalVolumetricWeight <= 3:
      return 'S';
    case finalVolumetricWeight > 3 && finalVolumetricWeight <= 6:
      return 'M';
    case finalVolumetricWeight > 6 && finalVolumetricWeight <= 16:
      return 'L';
    default:
      return 'none';
  }
};
