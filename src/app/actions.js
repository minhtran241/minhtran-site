'use server';

import { JSDOM } from 'jsdom';
import { streamText } from 'ai';
import { cohere } from '@ai-sdk/cohere';
import { createStreamableValue } from 'ai/rsc';
import { getChatbotSystemPrompt } from './prompts';

// Function to fetch Open Graph details for a given URL
export const extractMetaTags = async (response) => {
  try {
    // Fetch the content of the URL
    // const response = await fetch(url);
    // const response = await axios.get(url);
    const html = response.data;

    // Parse the HTML using JSDOM
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract meta tags from the document
    const metaTags = Array.from(document.querySelectorAll('meta')).reduce(
      (tags, meta) => {
        // Get the name, property, or itemprop attribute of the meta tag
        const name =
          meta.getAttribute('name') ||
          meta.getAttribute('property') ||
          meta.getAttribute('itemprop');

        // Get the content attribute of the meta tag
        const content = meta.getAttribute('content');

        // If both name and content exist, add them to the tags object
        if (name && content) {
          tags[name] = content;
        }

        return tags;
      },
      {},
    );

    // Return an object containing title, description, and image
    return {
      title:
        document.title || metaTags['og:title'] || metaTags['twitter:title'],
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
      model: cohere('command'),
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
