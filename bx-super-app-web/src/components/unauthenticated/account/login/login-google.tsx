import { FC } from 'react';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import styled from 'styled-components';

import SocialButton from './social-button';
import googleImage from 'images/google.png';
import {
  loginGoogleIsLoadingAtom,
  loginFacebookIsLoadingAtom,
} from 'atoms/login';
import { getAuthUrl } from './get-auth-url';
import { sendEvent } from 'utils/gtm';

const LoginGoogle: FC = () => {
  const [isGoogleLoading, setLoading] = useAtom(loginGoogleIsLoadingAtom);
  const isFacebookLoading = useAtomValue(loginFacebookIsLoadingAtom);

  const handleClick = (): void => {
    sendEvent({
      event: 'try_login',
      method: 'google',
    });
    window.localStorage.setItem('social_login', 'google');
    setLoading(true);
    const socialUrl = getAuthUrl('google');
    window.location.replace(socialUrl);
  };

  return (
    <WrapperBox>
      <SocialButton
        onClick={handleClick}
        isLoading={isGoogleLoading}
        disabled={isFacebookLoading}
      >
        <div>
          <img width='28' height='28' src={googleImage} alt='Google' />
        </div>
      </SocialButton>
    </WrapperBox>
  );
};

const WrapperBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 1200px) {
    margin-bottom: 35px;
  }
`;

export default LoginGoogle;
