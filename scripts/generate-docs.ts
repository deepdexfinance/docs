import { generateFiles } from 'fumadocs-openapi';
import { openapi } from '@/lib/openapi';

void generateFiles({
  input: openapi,
  output: './content/docs/developer/apis',
  // we recommend to enable it
  // make sure your endpoint description doesn't break MDX syntax.
  includeDescription: true,
});