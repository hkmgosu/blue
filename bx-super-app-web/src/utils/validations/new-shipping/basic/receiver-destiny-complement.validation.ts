import * as yup from 'yup';

export const receiverDestinyComplementSchema = yup.object().shape({
  complement: yup.string(),
});
