import { FC, ReactNode, useReducer } from 'react';
import styled from 'styled-components';
import { BxChevronLeft, BxChevronRight } from '@bx-design/react-icons';

type CarouselTypes = {
  data?: ReactNode;
  elementsNumber: number;
  gutter: number;
  elementWidth: number;
};

type StateType = {
  position: number;
};

type ActionType =
  | { type: 'left'; payload: number }
  | { type: 'right'; payload: number };

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'left':
      let newPos = state.position + action.payload;

      return { position: newPos };
    case 'right':
      let newPos2 = state.position - action.payload;

      return { position: newPos2 };
  }
};

const Carousel: FC<CarouselTypes> = ({
  data,
  elementsNumber,
  gutter,
  elementWidth,
}) => {
  const totalWidth = elementsNumber * elementWidth + elementsNumber * gutter;
  const min = totalWidth / 2;
  const max = min * -1;
  const step = elementWidth + gutter * 2;

  const initialState: StateType = { position: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <CarouselWrapper>
        <LeftButton>
          <Chevron
            onClick={() => {
              if (state.position < 0) {
                dispatch({ type: 'left', payload: step });
              }
            }}
          >
            <ContainerIcon>
              <BxChevronLeft size={30} />
            </ContainerIcon>
          </Chevron>
        </LeftButton>
        <RightButton>
          <Chevron
            onClick={() => {
              if (state.position >= max) {
                dispatch({ type: 'right', payload: step });
              }
            }}
          >
            <ContainerIcon>
              <BxChevronRight size={30} />
            </ContainerIcon>
          </Chevron>
        </RightButton>
        <ViewBox position={state.position}>{data}</ViewBox>
      </CarouselWrapper>
    </>
  );
};
const LeftButton = styled.div`
  position: absolute;
  left: 0;
  z-index: 10;
  padding: 10px;
  margin: 0 16px;
  cursor: pointer;
`;
const Chevron = styled.a``;
const RightButton = styled.div`
  position: absolute;
  right: 0;
  z-index: 10;
  padding: 10px;
  margin: 0 16px;
  cursor: pointer;
`;

const CarouselWrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  align-items: center;
  justify-content: start;
  overflow: hidden;
  padding: 10px;
`;

type ViewBoxType = {
  position: number;
};
const ViewBox = styled.div<ViewBoxType>`
  display: flex;
  position: relative;
  transition: all ease 0.4s;
  transform: ${(props) =>
    props.position ? `translateX(${props.position}px)` : ''};
`;
const ContainerIcon = styled.div`
  color: var(--bx-color-orange) !important;
`;
export default Carousel;
