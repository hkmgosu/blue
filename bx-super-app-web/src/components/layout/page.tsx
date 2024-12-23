import { FC } from 'react';
import styled from 'styled-components';

import MetaTags from './meta-tags';

type PageTypes = {
  title?: string;
  description?: string;
  element?: any;
};

const Page: FC<PageTypes> = ({ children, element, title, description }) => {
  return (
    <MainPage ref={element}>
      <MetaTags title={title} description={description} />
      {children}
    </MainPage>
  );
};

const MainPage = styled.div`
  min-height: 100vh;
  position: relative;
`;

export default Page;
