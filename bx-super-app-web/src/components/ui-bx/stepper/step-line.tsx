import { FC } from 'react';
import cs from 'classnames';

type Props = {
  isActive: boolean;
};

const StepLine: FC<Props> = ({ isActive }) => {
  return (
    <div
      className={cs('step-line', {
        'step-line-is-active': isActive,
      })}
    />
  );
};

export default StepLine;
