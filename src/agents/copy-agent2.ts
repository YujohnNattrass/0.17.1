import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { AnswerRelevancyMetric, BiasMetric, PromptAlignmentMetric } from '@mastra/evals/llm';

export const weatherAgent3 = new Agent({
  name: 'Weather Agent3',
  instructions: `
      You are a helpful weather assistant that provides accurate weather information and can help planning activities based on the weather.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn't in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative
      - If the user asks for activities and provides the weather forecast, suggest activities based on the weather forecast.
      - If the user asks for activities, respond in the format they request.

      Use the weatherTool to fetch current weather data.
`,
  model: openai('gpt-4o-mini'),
  evals: {
    promptAlignment: new PromptAlignmentMetric(openai('gpt-4o-mini'), { instructions: ['You are a helpful weather assistant that provides accurate weather information and can help planning activities based on the weather.'] }),
    answerRelevancy: new AnswerRelevancyMetric(openai('gpt-4o-mini')),
    bias: new BiasMetric(openai('gpt-4o-mini')),
  }
});
