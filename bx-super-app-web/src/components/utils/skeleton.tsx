import { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

type SkeletonTypes = {
  rounded?: boolean;
  squared?: boolean;
  width?: string;
  height?: string;
};

const Skeleton: FC<SkeletonTypes> = ({ rounded, squared, width, height }) => {
  return (
    <SkeletonWrapper
      rounded={rounded}
      squared={squared}
      width={width}
      height={height}
    />
  );
};

const skeletonOpacity = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const skeletonAnimation = css`
  animation: ${skeletonOpacity} 1.5s ease-in-out 0.5s infinite;
`;

const SkeletonWrapper = styled.span<SkeletonTypes>`
  background-color: var(--bx-skeleton-bg);
  display: block;
  height: ${(props) => props.height || '18px'};
  width: ${(props) => props.width || '100%'};
  ${skeletonAnimation}
  border-radius: 5px;
  ${(props) => props.squared && 'border-radius: 0;'}
  ${(props) => props.rounded && 'border-radius: 50%;'}
`;

export default Skeleton;
