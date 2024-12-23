import { useState } from 'react';
import StepLine from './step-line';
import Step from './step';

type Props = {
  steps: {
    isActive: boolean;
    text: string;
    step: string;
  }[];
};

const Stepper = ({ steps }: Props): JSX.Element => {
  const [cssVar, setCssVar] = useState(0);
  return (
    <div className='stepper'>
      <div
        className='stepper-lines'
        style={
          {
            '--offset': `${cssVar}px`,
          } as any
        }
      >
        {steps.length > 2 &&
          steps.map((step, index) => {
            if (steps.length === index + 1) return null;
            return <StepLine isActive={false} key={step.text} />;
          })}
      </div>
      <div className='stepper-steps'>
        {steps.map((step, i) => (
          <Step
            isActive={step.isActive}
            text={step.text}
            step={step.step}
            key={step.text}
            onChangeOffset={(value) => {
              if (!i) {
                setCssVar((oldValue) => oldValue + value);
              } else if (steps.length - 1 === i) {
                setCssVar((oldValue) => oldValue + value);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Stepper;
