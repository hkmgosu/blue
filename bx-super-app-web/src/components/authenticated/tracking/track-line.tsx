import { FC } from 'react';
import styled from 'styled-components';
import cs from 'classnames';
import { BxBox, BxStore, BxTruck } from '@bx-design/react-icons';

import WarningIcon from 'components/icons/warning';
import HandWithForm from 'components/icons/hand-and-form';
import type { TimelineDataType } from 'components/ui-bx/timeline/timeline';

export type TrackLineType = TimelineDataType & {
  code: string;
  isError: boolean;
};

type Proptypes = {
  index: number;
  description?: string;
};

const TrackingLine: FC<Proptypes> = ({ index, description }) => {
  return (
    <>
      <Desktop>
        <ContainerStepper>
          <Step>
            <Connector className='right' />
            <Info>
              <Title>Preparación</Title>
              <Circle className={cs({ active: index >= 0 })}>
                {index >= 0 && <BxBox size={32} color='#fff' />}
              </Circle>
            </Info>
          </Step>
          <Step>
            <Connector />
            <Info>
              <Title>Retiro</Title>
              <Circle className={cs({ active: index >= 1 })}>
                {index >= 1 && <BxStore color='#fff' size={32} />}
              </Circle>
            </Info>
          </Step>
          <Step>
            <Connector />
            <Info>
              <Title>En Camino</Title>
              <Circle className={cs({ active: index >= 2 })}>
                {index >= 2 && <BxTruck color='#fff' size={32} />}
              </Circle>
            </Info>
          </Step>
          {index === 3 && (
            <Step className='__error'>
              <Connector />
              <Info className='__error'>
                <Circle className='active __error'>
                  <WarningIcon />
                </Circle>
              </Info>
            </Step>
          )}
          <Step>
            <Connector className='left' />
            <Info>
              <Title>Entregado</Title>
              <Circle className={cs({ active: index >= 4 })}>
                {index >= 4 && <HandWithForm />}
              </Circle>
            </Info>
          </Step>
        </ContainerStepper>
        <ContainerStepper>
          <Description>{index === 0 ? description : ''}</Description>
          <Description>{index === 1 ? description : ''}</Description>
          <Description>{index === 2 ? description : ''}</Description>
          {index === 3 && (
            <Description className='__error'>
              ¡Oh no! tenemos un inconveniente
            </Description>
          )}
          <Description>{index === 4 ? description : ''}</Description>
        </ContainerStepper>
      </Desktop>
      <Mobile>
        <ContainerLine>
          <Item>
            <ContentCircle>
              <VerticalLine className='bottom' />
              <CircleMobile className={cs({ active: index >= 0 })} />
            </ContentCircle>
            <Title>Preparación</Title>
          </Item>
          <Item>
            <ContentCircle>
              <VerticalLine />
              <CircleMobile className={cs({ active: index >= 1 })} />
            </ContentCircle>
            <Title>Retiro</Title>
          </Item>
          <Item>
            <ContentCircle>
              <VerticalLine />
              <CircleMobile className={cs({ active: index >= 2 })} />
            </ContentCircle>
            <Title>En Camino</Title>
          </Item>
          {index === 3 && (
            <Item>
              <ContentCircle>
                <VerticalLine />
                <CircleMobile className='__error' />
              </ContentCircle>
              <Title>Problema</Title>
            </Item>
          )}
          <Item>
            <ContentCircle>
              <VerticalLine className='top' />
              <CircleMobile className={cs({ active: index >= 4 })} />
            </ContentCircle>
            <Title>Entregado</Title>
            <br />
          </Item>
          <div>{index === 4 ? description : ''}</div>
        </ContainerLine>
      </Mobile>
    </>
  );
};

const ContainerStepper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Connector = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: calc(50% + 8px);
  height: 2px;
  background-color: var(--bx-color-orange);
  &.right {
    width: 50%;
    right: 0;
  }
  &.left {
    width: 50%;
    left: 0;
  }
`;

const Step = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  justify-content: center;
  align-items: center;
  &.__error {
    flex: 0.5;
  }
`;

const Info = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &.__error {
    flex-direction: row;
  }
`;

const Circle = styled.div`
  width: 64px;
  height: 64px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-radius: 50%;
  margin: 20px 0px;
  background: var(--bx-color-grey-time);
  color: var(--bx-color-grey-time);
  &.active {
    background: var(--bx-color-blue);
    color: var(--bx-color-white);
  }
  &.__error {
    width: 36px;
    height: 36px;
    padding: 6px;
    background: var(--bx-color-red-medium);
    margin-top: calc(50% + 16px);
  }
`;

const Description = styled.div`
  flex: 1;
  bottom: 50px;
  text-align: center;
  &.__error {
    flex: 0.5;
  }
`;

const Title = styled.span`
  font-family: var(--bx-font-secondary);
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 145%;
  letter-spacing: 0.03em;
  @media (min-width: 768px) {
    font-family: var(--bx-font-primary);
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 109.9%;
  }
`;

const ContainerLine = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
`;

const ContentCircle = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const CircleMobile = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--bx-color-grey-time);
  color: var(--bx-color-grey-time);
  z-index: 1;
  &.active {
    background: var(--bx-color-blue);
    color: var(--bx-color-white);
  }
  &.__error {
    background: var(--bx-color-red-medium);
  }
`;

const VerticalLine = styled.div`
  position: absolute;
  width: 2px;
  background-color: var(--bx-color-orange);
  height: 100%;
  left: calc(50% - 1px);
  &.top {
    height: 50%;
    top: 0;
  }
  &.bottom {
    height: 50%;
    bottom: 0;
  }
`;

const Mobile = styled.div`
  display: block;
  @media (min-width: 768px) {
    display: none;
  }
`;

const Desktop = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

export default TrackingLine;
