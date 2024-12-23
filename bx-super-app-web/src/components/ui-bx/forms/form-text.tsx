import { FC, HTMLAttributes } from 'react';

type FormTextProps = HTMLAttributes<HTMLDivElement>;

const FormText: FC<FormTextProps> = ({ id, children, ...props }) => {
  return (
    <div className='form-text' id={id} {...props}>
      {children}
    </div>
  );
};

FormText.displayName = 'FormText';

export default FormText;
