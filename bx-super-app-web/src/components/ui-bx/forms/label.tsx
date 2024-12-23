import { FC, LabelHTMLAttributes } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const Label: FC<LabelProps> = ({ children, htmlFor, form, id, ...props }) => {
  return (
    <label
      className='form-label'
      htmlFor={htmlFor}
      form={form}
      id={id}
      {...props}
    >
      {children}
    </label>
  );
};

Label.displayName = 'Label';

export default Label;
