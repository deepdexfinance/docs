import { DocsLayout, DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

function docsOptions(): DocsLayoutProps {
  return {
    tree: source.pageTree,
    githubUrl: 'https://github.com/deepdexfinance/docs',
    ...baseOptions(),
  };
}
export default function Layout({ children }: LayoutProps<'/'>) {

  return (
    <DocsLayout {...docsOptions()}>
      {children}
    </DocsLayout>
  );
}
