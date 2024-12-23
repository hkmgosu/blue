export const MathRandom = (): number => Math.random();

export const delay = (time: number): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), time);
  });
