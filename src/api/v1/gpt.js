import router from "./init.js";
import OpenAI from 'openai';
import { PassThrough } from 'stream'

const openai = new OpenAI({
  baseURL: 'https://api.chatanywhere.com.cn',
  apiKey: 'sk-5cIjBgaOgQAI0aISLNsAMmDk7cHimSsf8zmc8yGvk0lIztbZ', // This is the default and can be omitted
});

router.post('/gpt', async (ctx) => {
  const ss = new PassThrough();
  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });
  ctx.body = ss;
  const params = ctx.request.body
  const { contents } = params

  const stream = await openai.beta.chat.completions.stream({
    messages: contents,
    model: 'gpt-3.5-turbo',
    stream: true,
  });

  stream.on('content', (delta, snapshot) => {
    ss.push(delta)
  });
  stream.on('end', () => {
    ss.end()
  })
})

export default router