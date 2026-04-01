import Anthropic from '@anthropic-ai/sdk';
import { AI_MODEL } from './_config.js';

let client = null;

function getClient() {
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

function buildUserMessage(pageContent, ctx) {
  return `Business: ${ctx.businessName} (${ctx.businessType})
What they offer: ${ctx.whatYouSell}
Target customer: ${ctx.targetCustomer}
Website goal: ${ctx.websiteGoal}

Page content:
${pageContent.slice(0, 6000)}`;
}

async function callOnce(criterion, userMessage) {
  const response = await getClient().messages.create({
    model: AI_MODEL,
    max_tokens: 200,
    temperature: 0,
    system: criterion.systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text.trim() : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON in response');

  const parsed = JSON.parse(jsonMatch[0]);
  if (!criterion.allowedScores.includes(parsed.score)) {
    throw new Error(`Score ${parsed.score} not in allowed set`);
  }

  return {
    score: parsed.score,
    detail: String(parsed.detail || '').slice(0, 120),
    fix: parsed.score < criterion.max ? (String(parsed.fix || '').slice(0, 150) || null) : null,
  };
}

export async function scoreWithAI(criterion, pageContent, ctx) {
  const userMessage = buildUserMessage(pageContent, ctx);
  try {
    const result = await callOnce(criterion, userMessage);
    return { ...result, status: 'scored' };
  } catch {
    try {
      const result = await callOnce(criterion, userMessage);
      return { ...result, status: 'scored' };
    } catch {
      return { score: null, detail: null, fix: null, status: 'unavailable' };
    }
  }
}
