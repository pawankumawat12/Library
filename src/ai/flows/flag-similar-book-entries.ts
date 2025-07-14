'use server';
/**
 * @fileOverview An AI agent that flags potentially similar book entries.
 *
 * - flagSimilarBookEntries - A function that handles the process of flagging similar book entries.
 * - FlagSimilarBookEntriesInput - The input type for the flagSimilarBookEntries function.
 * - FlagSimilarBookEntriesOutput - The return type for the flagSimilarBookEntries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FlagSimilarBookEntriesInputSchema = z.object({
  title: z.string().describe('The title of the book being added.'),
  author: z.string().describe('The author of the book being added.'),
  existingTitles: z
    .array(z.object({title: z.string(), author: z.string()}))
    .describe('A list of existing book titles and authors in the library.'),
});
export type FlagSimilarBookEntriesInput = z.infer<
  typeof FlagSimilarBookEntriesInputSchema
>;

const FlagSimilarBookEntriesOutputSchema = z.object({
  isSimilar: z
    .boolean()
    .describe(
      'Whether or not the book entry is similar to an existing book entry.'
    ),
  similarTitles: z
    .array(z.object({title: z.string(), author: z.string()}))
    .describe('A list of similar book titles and authors in the library.'),
});
export type FlagSimilarBookEntriesOutput = z.infer<
  typeof FlagSimilarBookEntriesOutputSchema
>;

export async function flagSimilarBookEntries(
  input: FlagSimilarBookEntriesInput
): Promise<FlagSimilarBookEntriesOutput> {
  return flagSimilarBookEntriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'flagSimilarBookEntriesPrompt',
  input: {schema: FlagSimilarBookEntriesInputSchema},
  output: {schema: FlagSimilarBookEntriesOutputSchema},
  prompt: `You are a librarian helping to maintain the quality of the library catalog.

You will be provided with the title and author of a new book being added to the library.

You will also be provided with a list of existing book titles and authors in the library.

Your job is to determine if the new book is similar to any of the existing books.

If the new book is similar to any of the existing books, you should set the isSimilar output field to true, and the similarTitles output field to a list of the similar books.

If the new book is not similar to any of the existing books, you should set the isSimilar output field to false, and the similarTitles output field to an empty list.

New Book Title: {{{title}}}
New Book Author: {{{author}}}
Existing Books: {{#each existingTitles}}{{{title}}} by {{{author}}}\n{{/each}}`,
});

const flagSimilarBookEntriesFlow = ai.defineFlow(
  {
    name: 'flagSimilarBookEntriesFlow',
    inputSchema: FlagSimilarBookEntriesInputSchema,
    outputSchema: FlagSimilarBookEntriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
