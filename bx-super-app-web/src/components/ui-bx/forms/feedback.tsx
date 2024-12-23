import { FC, HTMLAttributes } from 'react';
import cs from 'classnames';

type FeedbackProps = {
  type?: 'valid' | 'invalid';
  isActive?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Feedback: FC<FeedbackProps> = ({
  type,
  id,
  isActive,
  children,
  ...props
}) => {
  return (
    <div
      className={cs('form-feedback', {
        'form-feedback-valid': type === 'valid',
        'form-feedback-invalid': type === 'invalid',
        'form-feedback-is-active': isActive,
      })}
      data-testid='business-phone-error'
      id={id}
      {...props}
    >
      {children}
    </div>
  );
};

Feedback.defaultProps = {
  type: 'valid',
};

Feedback.displayName = 'Feedback';

export default Feedback;
