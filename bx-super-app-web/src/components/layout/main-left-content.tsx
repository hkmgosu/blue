import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import styles from './main-left-content.module.scss';
import LogoBx from 'components/logo-bx';
import MainRightBg from 'components/layout/main-right-bg';

type Props = {
  title?: ReactNode;
  description?: ReactNode;
  extraContent?: ReactNode;
};

const MainLeftContent: FC<Props> = ({
  title,
  description,
  extraContent,
  children,
}) => {
  return (
    <div className={styles.main}>
      <MainRightBg />
      <div className={styles.content}>
        {extraContent}
        <div className={styles.innerContent}>
          <div className={styles.imageContainer}>
            <LogoBx width={95} inverted />
          </div>
          <LogoBox>
            <LogoBx width={132} />
          </LogoBox>
          <Title>{title}</Title>
          <p className={styles.subtitle}>{description}</p>
          <IntroImageBox>
            <picture>
              <source
                srcset='https://static.blue.cl/images/bluenvio/campaign/banner-home-mobile.png'
                media='(max-width: 768px)'
              />
              <IntroImage src='https://static.blue.cl/images/bluenvio/campaign/banner-home.png' />
            </picture>
          </IntroImageBox>
          {children}
        </div>
      </div>
    </div>
  );
};

const LogoBox = styled.div`
  display: none;
  @media (min-width: 1200px) {
    display: flex;
    margin-bottom: 22px;
  }
`;

const Title = styled.h1`
  font-weight: 900;
  text-align: center;
  font-size: 35px;
  color: var(--bx-bg);
  @media (min-width: 768px) {
    font-size: 50px;
    margin-bottom: 28px;
  }
  @media (min-width: 1200px) {
    color: var(--bx-fg);
  }
`;

const IntroImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  @media (min-width: 1200px) {
    display: none;
  }
`;

const IntroImage = styled.img`
  width: 220px;
  height: auto;
  border-radius: 1rem;
  @media (min-width: 768px) {
    width: 396px;
  }
  @media (min-width: 992px) {
    width: 540px;
  }
`;

export default MainLeftContent;
