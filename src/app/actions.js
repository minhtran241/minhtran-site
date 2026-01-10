'use server';

import * as cheerio from 'cheerio';
import { streamText } from 'ai';
import { cohere } from '@ai-sdk/cohere';
import { createStreamableValue } from '@ai-sdk/rsc';
import { getChatbotSystemPrompt } from './prompts';

// Function to fetch Open Graph details for a given URL
export const extractMetaTags = async (response) => {
  try {
    // Fetch the content of the URL
    // const response = await fetch(url);
    // const response = await axios.get(url);
    const html = response.data;

    // Parse the HTML using cheerio
    const $ = cheerio.load(html);

    // Extract meta tags from the document
    const metaTags = {};
    $('meta').each((_, meta) => {
      const $meta = $(meta);
      // Get the name, property, or itemprop attribute of the meta tag
      const name =
        $meta.attr('name') || $meta.attr('property') || $meta.attr('itemprop');

      // Get the content attribute of the meta tag
      const content = $meta.attr('content');

      // If both name and content exist, add them to the tags object
      if (name && content) {
        metaTags[name] = content;
      }
    });

    // Return an object containing title, description, and image
    return {
      title:
        $('title').text() || metaTags['og:title'] || metaTags['twitter:title'],
      description:
        metaTags.description ||
        metaTags['og:description'] ||
        metaTags['twitter:description'],
      image:
        metaTags.image || metaTags['og:image'] || metaTags['twitter:image'],
    };
  } catch (error) {
    // Handle errors if fetching or parsing fails
    console.error('Error fetching Open Graph details', error);
  }
};

// Define the `continueConversation` function
export async function continueConversation(history) {
  // Create a streamable value
  const stream = createStreamableValue();

  (async () => {
    // Set up the text stream using the AI SDK
    const { textStream } = streamText({
      model: cohere('command-a-03-2025'),
      system: getChatbotSystemPrompt(),
      messages: history,
      // maxTokens: 300,
      maxRetries: 3,
    });

    // Process the streaming text
    for await (const text of textStream) {
      stream.update(text);
    }

    // Mark the stream as complete
    stream.done();
  })();

  // Return the conversation history and new streamed message
  // console.error('New message stream:', stream.value); // Debugging line --- IGNORE ---
  return {
    messages: history,
    newMessage: stream.value,
  };
}
