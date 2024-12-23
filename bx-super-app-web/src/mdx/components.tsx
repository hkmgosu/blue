import { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';

type MdxProps = {
  children: ReactNode;
};

function H2({ children }: MdxProps): JSX.Element {
  return <h2 className='text-[26px] leading-8 mb-8 font-black'>{children}</h2>;
}

function H3({ children }: MdxProps): JSX.Element {
  return <h3 className='text-xl mb-5 font-bold'>{children}</h3>;
}

function H4({ children }: MdxProps): JSX.Element {
  return <h4 className='text-lg mb-5 font-bold'>{children}</h4>;
}

function P({ children }: MdxProps): JSX.Element {
  return <p className='text-base mb-8 last-of-type:mb-0'>{children}</p>;
}
function Ul({ children }: MdxProps): JSX.Element {
  return <ul className='list-disc mb-8'>{children}</ul>;
}

function Ol({ children }: MdxProps): JSX.Element {
  return <ol className='list-decimal mb-8'>{children}</ol>;
}

const components = {
  h2: (props: any) => <H2 {...props} />,
  h3: (props: any) => <H3 {...props} />,
  h4: (props: any) => <H4 {...props} />,
  p: (props: any) => <P {...props} />,
  ul: (props: any) => <Ul {...props} />,
  ol: (props: any) => <Ol {...props} />,
};

type Props = {
  children: ReactNode;
};

function MDXProviderComponents({ children }: Props): JSX.Element {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}

export default MDXProviderComponents;

type MarkdownProps = {
  children: string;
  options?: MarkdownToJSX.Options;
};

export function MDXComponentsMarkdown({
  children,
  options,
}: MarkdownProps): JSX.Element {
  return (
    <Markdown
      children={children}
      options={{
        ...options,
        overrides: { ...components, ...options?.overrides },
      }}
    />
  );
}
