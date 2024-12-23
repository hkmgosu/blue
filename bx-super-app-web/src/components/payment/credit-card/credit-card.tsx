import { FC } from 'react';
import styled from 'styled-components';

import Chip from './chip';
import Signal from './signal';
import Dots from './dots';
import Logo from './card-logo';

type PropTypes = {
  name: string;
  number: string;
  expire?: {
    month: number;
    year: number;
  };
};

const CreditCard: FC<PropTypes> = ({ name, number, expire }) => {
  const date = expire ? `${expire?.month}/${expire?.year}` : '';
  const lastNumberCard = number.slice(-4);

  return (
    <CardContiner>
      <ContentChipAndSignal>
        <Chip />
        <Signal />
      </ContentChipAndSignal>
      <CreditCardNumberContent>
        <DotsContent>
          <Dots />
        </DotsContent>
        <DotsContent>
          <Dots />
        </DotsContent>
        <DotsContent>
          <Dots />
        </DotsContent>
        <NumberContent>{lastNumberCard}</NumberContent>
      </CreditCardNumberContent>
      <InfoContent>
        <NameContent>{name.toUpperCase()}</NameContent>
        <DateContent>{date}</DateContent>
        <LogoContent>
          <Logo />
        </LogoContent>
      </InfoContent>
    </CardContiner>
  );
};

const CardContiner = styled.div`
  min-width: 216px;
  max-width: 260px;
  min-height: 140px;
  max-height: 196px;
  width: 100%;
  border-radius: 15px;
  background-color: var(--bx-color-blue);
`;

const ContentChipAndSignal = styled.div`
  margin: 43px 22px 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CreditCardNumberContent = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 22px;
`;

const DotsContent = styled.div`
  margin-right: 13px;
`;

const NumberContent = styled.div`
  color: var(--bx-color-white);
  font-size: 0.8em;
  font-weight: bold;
`;

const InfoContent = styled.div`
  display: flex;
  position: relative;
  margin: 14px 12px 12px 22px;
`;

const NameContent = styled.div`
  flex: 2;
  color: var(--bx-color-white);
  font-size: 0.5em;
  text-transform: uppercase;
`;

const DateContent = styled(NameContent)`
  flex: 1;
  text-align: center;
  margin-top: -10px;
`;

const LogoContent = styled.div`
  flex: 1;
  text-align: right;
`;

export default CreditCard;
