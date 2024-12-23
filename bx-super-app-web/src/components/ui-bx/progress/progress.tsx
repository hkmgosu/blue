import { FC, ReactNode } from 'react';
import styled, { keyframes, css } from 'styled-components';

type ProgressProps = {
  min?: number;
  max?: number;
  now?: number;
  variant?: 'success' | 'danger' | 'warning' | 'info';
  striped?: boolean;
  label?: ReactNode;
  animated?: boolean;
  srOnly?: boolean;
};

const limit = ({
  min,
  max,
  now,
}: {
  min: number;
  max: number;
  now: number;
}): number => (now > max ? max : now < min ? min : now);

const Progress: FC<ProgressProps> = ({
  min,
  max,
  now,
  variant,
  striped,
  label,
  animated,
  srOnly,
}) => {
  return (
    <ContainerProgress>
      <Wrapper>
        <ProgressBar
          role='progressbar'
          min={min}
          max={max}
          now={limit({ now: now || 0, min: min || 0, max: max || 0 })}
          variant={variant}
          striped={striped}
          animated={animated}
        ></ProgressBar>
      </Wrapper>
      {srOnly ? (
        <span className='sr-only'>{label}</span>
      ) : (
        <Label>{label}</Label>
      )}
    </ContainerProgress>
  );
};

Progress.defaultProps = {
  min: 0,
  max: 100,
};

const ContainerProgress = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.span`
  --progress-label-gap: var(--bx-progress-label-gap, 0.5rem);
  --progress-font-size: var(--bx-progress-font-size, 14px);

  display: inline-block;
  margin-left: var(--progress-label-gap);
  font-size: var(--progress-font-size);
`;

const Wrapper = styled.div`
  --progress-height: var(--bx-progress-height, 7px);
  --progress-border-radius: var(--bx-progress-border-radius, 100px);
  --progress-background: var(
    --bx-progress-background,
    var(--bx-button-secondary-fg)
  );
  --progress-background-active: var(
    --bx-progress-background-active,
    var(--bx-color-blue)
  );

  display: flex;
  height: var(--progress-height);
  overflow: hidden;
  font-size: 0.75rem;
  border-radius: var(--progress-border-radius);
  width: 100%;
  background: var(--progress-background);

  span {
    margin-left: 0.5rem;
  }
`;

type ProgressBarProps = {
  min?: number;
  max?: number;
  now?: number;
  variant?: 'success' | 'danger' | 'warning' | 'info';
  striped?: boolean;
  animated?: boolean;
};

const progressBarStripes = keyframes`
  0% {
    background-position-x: 1rem;
  }
`;

const animationBorder = css`
  animation: ${progressBarStripes} 1s linear infinite;
`;

const ProgressBar = styled.div<ProgressBarProps>`
  --progress-border-radius: var(--bx-progress-border-radius, 100px);
  --progress-background-active: var(
    --bx-progress-background-active,
    var(--bx-color-blue)
  );

  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: var(--bx-color-white);
  text-align: center;
  white-space: nowrap;
  transition: width 0.6s ease;
  width: ${(props) => props.now + '%;'}
  background-color: var(--progress-background-active);
  border-radius: var(--progress-border-radius);
  ${(props) =>
    props.striped
      ? `
      background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
      background-size: 1rem 1rem;
  `
      : ''}
  ${(props) => (props.animated ? animationBorder : '')}
`;

export default Progress;
