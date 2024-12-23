import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { BxCheckCircle } from '@bx-design/react-icons';

export type TimelineDataType = {
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
  description?: string | ReactNode;
  active?: boolean;
};

type TimelinesProps = {
  data: TimelineDataType[];
  align: 'horizontal' | 'vertical';
  type?: 'data' | 'date';
};

const Timelines: FC<TimelinesProps> = ({ data, align, type = 'data' }) => {
  const zIndex = 10;

  return (
    <>
      <ContainerStepper align={align} type={type}>
        {data?.map((d: TimelineDataType, i: number) => (
          <Step zIndex={zIndex - i} key={i}>
            {i > 0 && <Connector align={align} />}
            <Info align={align}>
              <Title type={type}>{d.title}</Title>
              {type === 'data' ? (
                <Circle active={d.active}>{d.icon}</Circle>
              ) : (
                <ContainerIcon>
                  <BxCheckCircle size={30} />
                </ContainerIcon>
              )}
              <SubTitle align={align}>{d.subtitle}</SubTitle>
            </Info>
          </Step>
        ))}
      </ContainerStepper>
      <ContainerDescriptions align={align}>
        {data.map((d, i) => {
          return <Description key={i}>{d.description}</Description>;
        })}
      </ContainerDescriptions>
    </>
  );
};

Timelines.displayName = 'Timeline';
Timelines.defaultProps = {};

type ContainerProps = {
  align?: 'horizontal' | 'vertical';
  type?: 'data' | 'date';
  zIndex?: number;
};

type CircleProps = {
  active?: boolean;
};

export const ContainerStepper = styled.div<ContainerProps>`
  display: flex;
  ${(props) => {
    switch (props.align) {
      case 'vertical':
        return 'margin:48px 0;';
      case 'horizontal':
        return 'margin-top:48px;';
    }
  }}
  flex-direction: ${(props) => (props.align === 'vertical' ? 'column' : 'row')};
`;

export const Step = styled.div<ContainerProps>`
  flex: 1;
  position: relative;
  z-index: ${(props) => props.zIndex};
`;

export const Info = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) =>
    props.align === 'vertical' ? 'flex-end' : 'center'};
  flex: 1;
  flex-direction: ${(props) =>
    props.align === 'vertical' ? 'row-reverse' : 'column'};
  ${(props) => {
    switch (props.align) {
      case 'vertical':
        return 'padding:24px 0;';
      case 'horizontal':
        return '';
    }
  }}
`;

export const Title = styled.div<ContainerProps>`
  font-family: var(--bx-font-primary);
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 109.9%;
  ${(props) => props.type === 'date' && 'padding-left:16px;'}
`;

const ContainerIcon = styled.div`
  background: #fff;
`;

export const Circle = styled.div<CircleProps>`
  background: ${(props) =>
    props.active ? 'var(--bx-color-blue)' : 'var(--bx-color-grey-time)'};
  border-radius: 50%;
  padding: 24px;
  margin: 8px 0;
`;

export const SubTitle = styled.div<ContainerProps>`
  font-family: var(--bx-font-secondary);
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 145%;
  letter-spacing: 0.03em;
  font-size: 16px;
  ${(props) => props.align === 'vertical' && 'min-width:100px;'}
`;

export const Connector = styled.div<ContainerProps>`
  position: absolute;
  width: auto;
  height: 2px;
  z-index: -1;
  background-color: var(--bx-color-orange);
  ${(props) => {
    switch (props.align) {
      case 'vertical':
        return `
          top: calc(-50%);
          bottom: calc(50%);
          width: 1px;
          height: auto;
          left: 115px;
          background-color: var(--bx-color-black);
        `;
      case 'horizontal':
        return `
          left: calc(-50%);
          right: calc(50%);
          top: calc(50%);
          height: 2px;
          width: auto;
          background-color: var(--bx-color-orange);'
        `;
    }
  }}
`;

export const Description = styled.div`
  padding: 8px 24px;
  font-family: var(--bx-font-secondary);
  font-style: normal;
  font-weight: normal;
  text-transform: capitalize;
  font-size: 14px;
  flex: 1;
  text-align: center;
`;

export const ContainerDescriptions = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${(props) => (props.align === 'vertical' ? 'column' : 'row')};
  justify-content: space-between;
  ${(props) => {
    switch (props.align) {
      case 'horizontal':
        return 'margin-bottom:48px;';
      case 'vertical':
        return '';
    }
  }}
`;

export default Timelines;
