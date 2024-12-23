import { FC } from 'react';
import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

const NewBusinessReadyExist: FC = () => {
  return (
    <Wrapper>
      <Text>
        ¿Tu Empresa ya está inscrita?{' '}
        <Link to='/join-to-business'>Ingresa aquí</Link>
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 10px 0 10px 0;
`;

const Text = styled.p`
  font-size: 16px;
  text-align: center;
  margin: 0 auto;
`;

const Link = styled(LinkRouter)`
  color: var(--bx-color-orange);
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
`;

export default NewBusinessReadyExist;
