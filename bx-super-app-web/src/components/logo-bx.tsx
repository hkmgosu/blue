import { FC } from 'react';

type LogoBxProps = {
  width?: number;
  height?: number;
  inverted?: boolean;
  display?: string;
};

const LogoBx: FC<LogoBxProps> = ({
  inverted = false,
  height,
  width,
  display,
}) => {
  return (
    <svg
      width={height ? undefined : width || 78}
      height={width ? undefined : height || 51}
      display={display ? 'block' : display}
      viewBox='0 0 78 51'
    >
      <path
        fill={
          inverted
            ? 'var(--bx-logo-principal-inverted)'
            : 'var(--bx-logo-principal)'
        }
        d='M6.735 47.749c-3.033 0-5.51-2.317-5.51-5.717v-.042c0-3.166 2.242-5.717 5.296-5.717 3.268 0 5.126 2.657 5.126 5.57a.764.764 0 01-.769.764H2.891c.235 2.38 1.923 3.72 3.888 3.72 1.367 0 2.37-.531 3.182-1.275a.721.721 0 01.469-.191c.406 0 .727.319.727.7a.702.702 0 01-.257.532c-1.046.996-2.285 1.656-4.165 1.656zm3.27-6.355c-.172-1.998-1.326-3.74-3.525-3.74-1.922 0-3.375 1.594-3.588 3.74h7.112zM13.23 46.324l3.609-4.42-3.397-4.145c-.17-.19-.256-.383-.256-.595 0-.467.342-.765.769-.765.32 0 .534.15.727.383l3.182 4.017 3.16-3.996c.193-.234.407-.404.705-.404.427 0 .748.32.748.744a.789.789 0 01-.214.531l-3.438 4.187 3.588 4.378c.15.191.235.384.235.596a.751.751 0 01-.769.765c-.32 0-.534-.15-.727-.384l-3.353-4.23-3.331 4.21c-.192.234-.406.404-.705.404a.741.741 0 01-.748-.745.708.708 0 01.214-.53zM25.34 37.227c0-.467.364-.829.813-.829.47 0 .833.36.833.83v1.487c.897-1.318 2.2-2.444 4.23-2.444 2.648 0 5.276 2.083 5.276 5.696v.042c0 3.591-2.607 5.716-5.276 5.716-2.05 0-3.375-1.105-4.23-2.338v4.783c0 .467-.341.829-.812.829a.818.818 0 01-.833-.83V37.228zm9.463 4.804v-.042c0-2.593-1.794-4.25-3.888-4.25-2.05 0-3.994 1.72-3.994 4.229v.042c0 2.55 1.944 4.25 3.994 4.25 2.136 0 3.888-1.572 3.888-4.23zM39.097 37.227c0-.446.362-.83.812-.83a.82.82 0 01.833.83v2.061c.812-1.828 2.413-2.933 3.802-2.933.492 0 .813.36.813.829 0 .446-.299.765-.726.83-2.136.254-3.888 1.848-3.888 5.015v3.74c0 .446-.341.83-.812.83a.818.818 0 01-.833-.83v-9.542h-.001zM51.677 47.749c-3.033 0-5.51-2.317-5.51-5.717v-.042c0-3.166 2.242-5.717 5.296-5.717 3.267 0 5.126 2.657 5.126 5.57a.764.764 0 01-.769.764h-7.988c.235 2.38 1.922 3.72 3.887 3.72 1.367 0 2.371-.531 3.182-1.275a.721.721 0 01.47-.191c.406 0 .726.319.726.7a.702.702 0 01-.256.532c-1.045.996-2.284 1.656-4.164 1.656zm3.268-6.355c-.171-1.998-1.325-3.74-3.524-3.74-1.923 0-3.375 1.594-3.588 3.74h7.112zM58.47 46.324a.714.714 0 01.428-1.296c.15 0 .299.044.406.129 1.132.765 2.307 1.169 3.503 1.169 1.323 0 2.285-.68 2.285-1.742v-.042c0-1.105-1.302-1.53-2.754-1.935-1.73-.489-3.653-1.084-3.653-3.103v-.042c0-1.891 1.581-3.145 3.76-3.145 1.174 0 2.455.36 3.523.935a.796.796 0 01.406.68c0 .383-.32.7-.727.7a.835.835 0 01-.363-.084c-.94-.531-1.944-.85-2.883-.85-1.303 0-2.136.68-2.136 1.594v.042c0 1.041 1.367 1.445 2.84 1.891 1.709.51 3.546 1.17 3.546 3.145v.042c0 2.084-1.73 3.295-3.93 3.295-1.453-.002-3.055-.532-4.251-1.383zM68.466 46.324a.714.714 0 01.428-1.296c.15 0 .3.044.407.129 1.132.765 2.306 1.169 3.503 1.169 1.323 0 2.285-.68 2.285-1.742v-.042c0-1.105-1.302-1.53-2.755-1.935-1.73-.489-3.652-1.084-3.652-3.103v-.042c0-1.891 1.58-3.145 3.759-3.145 1.175 0 2.456.36 3.523.935a.796.796 0 01.407.68c0 .383-.321.7-.727.7a.835.835 0 01-.363-.084c-.94-.531-1.944-.85-2.884-.85-1.302 0-2.135.68-2.135 1.594v.042c0 1.041 1.367 1.445 2.84 1.891 1.709.51 3.546 1.17 3.546 3.145v.042c0 2.084-1.73 3.295-3.93 3.295-1.453-.002-3.056-.532-4.252-1.383zM26.759 3.342A2.933 2.933 0 0129.7.415a2.933 2.933 0 012.942 2.927v27.153a2.933 2.933 0 01-2.942 2.928 2.933 2.933 0 01-2.941-2.928V3.343zM55.2 30.548a2.966 2.966 0 01-2.974 2.96 2.966 2.966 0 01-2.974-2.96v-.234c-1.37 1.752-3.132 3.349-6.144 3.349-4.5 0-7.122-2.96-7.122-7.75V15.127a2.966 2.966 0 012.974-2.96 2.966 2.966 0 012.974 2.96v8.917c0 2.805 1.331 4.245 3.6 4.245 2.27 0 3.719-1.44 3.719-4.245v-8.917a2.966 2.966 0 012.974-2.96 2.966 2.966 0 012.974 2.96v15.421H55.2zM68.617 33.865c-6.3.068-11.004-4.283-11.072-10.668l-.002-.078c-.064-5.957 4.148-10.91 10.253-10.974 7.005-.075 10.158 5.616 10.204 9.938.019 1.714-1.182 2.856-2.747 2.872l-11.779.126c.617 2.68 2.51 4.061 5.17 4.033 1.644-.017 3.008-.538 4.212-1.446.427-.317.817-.476 1.442-.483 1.331-.015 2.319.988 2.334 2.311a2.32 2.32 0 01-.764 1.76c-1.823 1.578-4.199 2.577-7.25 2.609zm3.7-12.58c-.381-2.643-1.965-4.417-4.47-4.391-2.465.026-4.05 1.795-4.49 4.487l8.96-.095zM6.45 3.208A3.217 3.217 0 003.223 0 3.216 3.216 0 000 3.208V21.66h.006c.096 6.483 5.403 11.71 11.94 11.71 6.598 0 11.945-5.322 11.945-11.886 0-6.531-5.293-11.83-11.843-11.884v6.413c2.992.054 5.4 2.482 5.4 5.471 0 3.023-2.463 5.474-5.501 5.474-3.011 0-5.455-2.409-5.498-5.395v-.158c0-.042.004-.082.005-.124h-.008l.083-10.388-.08-7.684z'
      />
      <path
        fill='var(--bx-logo-dot)'
        d='M9.51 16.979c-2.164 0-3.926-1.752-3.926-3.907 0-2.154 1.76-3.907 3.926-3.907 2.166 0 3.926 1.752 3.926 3.907 0 2.155-1.762 3.907-3.926 3.907z'
      />
      <path
        fill='#fff'
        d='M9.51 9.596a3.484 3.484 0 013.493 3.476 3.484 3.484 0 01-3.493 3.475 3.484 3.484 0 01-3.493-3.475A3.484 3.484 0 019.51 9.596zm0-.862c-2.403 0-4.36 1.945-4.36 4.338s1.956 4.338 4.36 4.338c2.405 0 4.36-1.946 4.36-4.338 0-2.393-1.957-4.338-4.36-4.338z'
      />
    </svg>
  );
};

export default LogoBx;