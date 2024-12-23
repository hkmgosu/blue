import { FC, useEffect, useRef } from 'react';
import cs from 'classnames';

type StepProps = {
  step: string;
  isActive: boolean;
  text: string;
  onChangeOffset?: (value: number) => void;
};

const Step: FC<StepProps> = ({ step, isActive, text, onChangeOffset }) => {
  const refDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onChangeOffset) onChangeOffset(refDiv.current?.offsetLeft || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='step'>
      <div className='step-wrapper'>
        <div
          ref={refDiv}
          className={cs('step-wrapper-number', {
            'step-wrapper-number-is-active': isActive,
            'step-number-is-active': isActive,
          })}
        >
          {step}
        </div>

        <div className='step-wrapper-text'>{text}</div>
      </div>
    </div>
  );
};

export default Step;
