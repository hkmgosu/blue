const rutPattern = (): RegExp => /^(\d{0,2})\.?(\d{3})\.?(\d{3})-?(\d|k)$/gi;
const companyRutPattern = (): RegExp =>
  /^([5-9]{1}[0-9]{1})\.?(\d{3})\.?(\d{3})-?(\d|k)$/gi;

const fakeRutPattern = (): RegExp => /^(\d)\1?\.?(\1{3})\.?(\1{3})-?(\d|k)?$/gi;

export const isRutValid = (rut: string): boolean => rutPattern().test(rut);
export const isFakeRut = (rut: string): boolean => fakeRutPattern().test(rut);
export const isCompanyRut = (rut: string): boolean =>
  companyRutPattern().test(rut);

export const cleanRut = (rut: string): string =>
  isRutValid(rut) ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : '';

export const getRutDigits = (rut: string): string => cleanRut(rut).slice(0, -1);
export const getRutVerifier = (rut: string): string => cleanRut(rut).slice(-1);

type DeconstructedRut = {
  digits: string;
  verifier: string;
};

export const deconstructRut = (rut: string): DeconstructedRut => ({
  digits: getRutDigits(rut),
  verifier: getRutVerifier(rut),
});

export const getVerificationCode = (digits: string): number | string => {
  let sum = 0;
  const secuence: number[] = [2, 3, 4, 5, 6, 7, 2, 3];

  for (let i = digits.length - 1; i >= 0; i--) {
    const d: string = digits.charAt(i);
    sum += Number(d) * secuence[digits.length - (i + 1)];
  }

  const rest = elevenModule(sum);

  return rest === '11' ? '0' : rest === '10' ? 'k' : rest;
};

const elevenModule = (num: number): string => {
  return (11 - (num % 11)).toString();
};

export const formatRut = (rut: string): string => {
  if (!isRutValid(rut)) return rut;

  const rutCleaned = cleanRut(rut);

  let result =
    rutCleaned.slice(-4, -1) + '-' + rutCleaned.substr(rut.length - 1);

  for (let i = 4; i < rutCleaned.length; i += 3) {
    result = rutCleaned.slice(-3 - i, -i) + '.' + result;
  }

  return result;
};

export const validateRut = (
  rut: string | null | undefined,
  noFakeRut = true,
): boolean => {
  if (typeof rut !== 'string') return false;
  if (!isRutValid(rut)) return false;
  if (noFakeRut && isFakeRut(rut)) return false;
  return getRutVerifier(rut) === getVerificationCode(getRutDigits(rut));
};

export const validateCompanyRut = (
  rut: string | null | undefined,
  noFakeRut = true,
): boolean => {
  if (typeof rut !== 'string') return false;
  if (!isRutValid(rut)) return false;
  if (!isCompanyRut(rut)) return false;
  if (noFakeRut && isFakeRut(rut)) return false;
  return getRutVerifier(rut) === getVerificationCode(getRutDigits(rut));
};
