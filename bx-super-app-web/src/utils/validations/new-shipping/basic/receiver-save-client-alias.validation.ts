import * as yup from 'yup';

export const receiverSaveClientAliasSchema = yup.object().shape({
  frequent_alias_client: yup
    .string()
    .max(40, 'Verifica que esté todo correcto'),
});
