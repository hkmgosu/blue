import { FC } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';

import SocialButton from './social-button';
import facebookImage from 'images/facebook.png';
import { getAuthUrl } from './get-auth-url';
import {
  loginGoogleIsLoadingAtom,
  loginFacebookIsLoadingAtom,
} from 'atoms/login';
import { sendEvent } from 'utils/gtm';

const LoginFacebook: FC = () => {
  const [isFacebookLoading, setLoading] = useAtom(loginFacebookIsLoadingAtom);
  const isGoogleLoading = useAtomValue(loginGoogleIsLoadingAtom);

  const handleClick = (): void => {
    sendEvent({
      event: 'try_login',
      method: 'facebook',
    });
    window.localStorage.setItem('social_login', 'facebook');
    setLoading(true);
    const socialUrl = getAuthUrl('facebook');
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
          <img width='28' height='28' src={facebookImage} alt='Facebook' />
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

export default LoginFacebook;
