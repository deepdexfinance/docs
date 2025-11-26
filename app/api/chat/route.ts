import { ProvideLinksToolSchema } from '../../../lib/inkeep-qa-schema';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { convertToModelMessages, streamText } from 'ai';

export const runtime = 'edge';

const openai = createOpenAICompatible({
  name: 'openrouter',
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

export async function POST(req: Request) {
  const reqJson = await req.json();

  const result = streamText({
    model: openai('openai/gpt-4o'),
    system: `You are a helpful and knowledgeable assistant that can answer questions about the documentation. DO NOT use source outside the docs. The docs are available at https://docs.deepdex.finance/llms-full.txt`,
    tools: {
      provideLinks: {
        inputSchema: ProvideLinksToolSchema,
      },
    },
    messages: convertToModelMessages(reqJson.messages, {
      ignoreIncompleteToolCalls: true,
    }),
    toolChoice: 'auto',
  });

  return result.toUIMessageStreamResponse();
}
