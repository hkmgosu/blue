import { FC } from 'react';
import styled from 'styled-components';
import { Spinner } from 'components/ui-bx/spinner';

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

const SocialButton: FC<Props> = ({
  onClick,
  disabled,
  isLoading,
  children,
}) => {
  return (
    <Button onClick={onClick} disabled={disabled} isLoading={isLoading}>
      {isLoading ? (
        <Container>
          <Spinner size='md' variant='secondary' />
        </Container>
      ) : (
        <Container>{children}</Container>
      )}
    </Button>
  );
};

type ButtonProps = {
  isLoading?: boolean;
};

const Button = styled.button<ButtonProps>`
  width: 100%;
  border: none;
  background: var(--bx-login-button-bg);
  border-radius: 1rem;
  box-shadow: var(--bx-login-button-shadow);
  padding: 26px;
  color: var(--bx-fg);

  @media (min-width: 992px) {
    padding: 20px 22px;
  }

  &:hover {
    color: var(--bx-fg);
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.65;
  }
`;

const Container = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

export default SocialButton;
