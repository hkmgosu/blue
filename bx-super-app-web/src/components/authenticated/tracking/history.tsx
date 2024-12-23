import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Col } from '@bx-design/react-grid';
import { DateTime } from 'luxon';
import cs from 'classnames';
import { BxCheckCircle } from '@bx-design/react-icons';

import { useTrackingState } from 'contexts/tracking/tracking-context';
import { TimelineDataType } from 'components/ui-bx/timeline/timeline';

const TrackingHistory: FC = () => {
  const { os } = useTrackingState();
  const [formattedMicroState, setFormattedMicroState] =
    useState<TimelineDataType[]>();

  useEffect(() => {
    if (os?.document) {
      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
      };

      const formatted = os.document.listaPinchazosNacionales.map((state) => {
        let date = state.fecha
          ? DateTime.fromFormat(state.fecha, 'yyyyMMddHHmmss')
              .toJSDate()
              .toLocaleString('es-ES', options)
          : '';

        return {
          title: state.nombreTipo,
          subtitle: date,
        };
      });

      setFormattedMicroState(formatted);
    }
  }, [os]);

  return (
    <Col sm='12'>
      <ContainerHistory>
        <Title>Historial de seguimiento</Title>
        {formattedMicroState && (
          <ContainerLine>
            {formattedMicroState
              .slice()
              .reverse()
              .map((history, index) => (
                <Item key={index}>
                  <LeftContent>
                    <ItemDate>{history.subtitle}</ItemDate>
                    <ContentIcon>
                      <Line
                        className={cs(
                          { bottom: index === 0 },
                          { top: index === formattedMicroState.length - 1 }
                        )}
                      />
                      <BxCheckCircle size={30} />
                    </ContentIcon>
                  </LeftContent>
                  <ItemTitle>{history.title?.toLowerCase()}</ItemTitle>
                </Item>
              ))}
          </ContainerLine>
        )}
      </ContainerHistory>
    </Col>
  );
};

const ContainerHistory = styled.div`
  padding: 40px;
`;

const Title = styled.h2`
  font-family: var(--bx-font-primary);
  font-style: normal;
  font-weight: 900;
  font-size: 22px;
  line-height: 28px;
  margin-bottom: 25px;
`;

const ContainerLine = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 80px;
  position: relative;
`;

const ItemDate = styled.span`
  font-family: var(--bx-font-secondary);
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 145%;
  letter-spacing: 0.03em;
  width: 65px;
`;

const ItemTitle = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 145%;
  letter-spacing: 0.03em;
  text-transform: capitalize;
  @media (min-width: 768px) {
    font-family: var(--bx-font-primary);
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 23px;
    font-family: var(--bx-font-secondary);
  }
`;

const ContentIcon = styled.div`
  padding: 0 14px;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  & > svg {
    background-color: var(--bx-color-white);
    z-index: 1;
  }
`;

const LeftContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div`
  position: absolute;
  width: 1px;
  background-color: var(--bx-color-black);
  height: 100%;
  left: 50%;
  &.top {
    height: 50%;
    top: 0;
  }
  &.bottom {
    height: 50%;
    bottom: 0;
  }
`;

export default TrackingHistory;
