import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

type MetaTagsTypes = {
  title?: string;
  description?: string;
};

const MetaTags: FC<MetaTagsTypes> = ({ title, description }) => {
  return (
    <Helmet>
      {title && <title>{title || 'Super App BlueExpress'}</title>}
      {description && (
        <meta
          name='description'
          content={description || 'Super App BlueExpress'}
        />
      )}
    </Helmet>
  );
};

export default MetaTags;
