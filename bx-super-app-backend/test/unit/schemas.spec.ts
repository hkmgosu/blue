import {
  RutValidation,
  EmailValidation,
  PasswordValidation,
} from '../../src/commons/validations/schemas';

describe('AppController', () => {
  test('validate well formated email', async () => {
    const result = await EmailValidation.isValid({
      email: 'test@stefanini.com',
    });
    expect(result).toBeTruthy();
  });
  test('validate bad formated email', async () => {
    const result = await EmailValidation.isValid({ email: 'fjmaturana' });
    expect(result).toBeFalsy();
  });
  //Password validation
  test('validate password to be required', async () => {
    const result = await PasswordValidation.isValid({ password: null });
    expect(result).toBeFalsy();
  });
  test('validate short password to be false', async () => {
    const result = await PasswordValidation.isValid({ password: 'a1' });
    expect(result).toBeFalsy();
  });
  test('validate well fomated password', async () => {
    const result = await PasswordValidation.isValid({
      password: 'a1b2c3d4e5a',
    });
    expect(result).toBeTruthy();
  });
  //Rut validation
  test('validate well formated RUT', async () => {
    const result = await RutValidation.isValid({ rut: '18021369-4' });
    expect(result).toBeTruthy();
  });
  test('validate formated RUT', async () => {
    const result = await RutValidation.isValid({ rut: '18.021.369-4' });
    expect(result).toBeTruthy();
  });
  test('validate non valid, well formated RUT', async () => {
    const result = await RutValidation.isValid({ rut: '18021369-1' });
    expect(result).toBeFalsy();
  });
});
