import router from "./init.js";
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.chatanywhere.com.cn',
  apiKey: 'sk-5cIjBgaOgQAI0aISLNsAMmDk7cHimSsf8zmc8yGvk0lIztbZ', // This is the default and can be omitted
});

router.post('/gpt', async (ctx) => {
  const params = ctx.request.body
  const { content } = params
  if (!content) return ctx.fail('请输入内容')
  const stream = await openai.chat.completions.create({
    messages: [{ role: 'user', content }],
    model: 'gpt-3.5-turbo',
    stream: true,
  })
  if (!stream) return ctx.fail('gpt服务错误')
  // for await (const chunk of stream) {
  //   process.stdout.write(chunk.choices[0]?.delta?.content || '');
  //   // console.log('11', chunk.choices[0]?.delta?.content);
  // }
  return stream
})