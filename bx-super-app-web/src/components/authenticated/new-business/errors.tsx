import { FC } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';

import {
  newBusinessIsErrorAtom,
  newBusinessErrorAtom,
} from 'atoms/new-business';
import { ShowAlert } from 'components/ui-bx/alert';

const NewBusinessErrors: FC = () => {
  const [isError, setIsError] = useAtom(newBusinessIsErrorAtom);
  const [error] = useAtom(newBusinessErrorAtom);
  return (
    <Wrapper>
      <ShowAlert
        variant='danger'
        isOpen={isError}
        handleClose={() => setIsError(false)}
      >
        <ErrorText>{error}</ErrorText>
      </ShowAlert>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 50px;
`;

const ErrorText = styled.div`
  font-weight: 800;
  font-size: 12px;
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;

export default NewBusinessErrors;
