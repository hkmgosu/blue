import * as yup from 'yup';

export const receiverDestinyReferenceSchema = yup.object().shape({
  reference: yup.string(),
});
