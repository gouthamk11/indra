import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

/**
 * Creates a LangChain chain that summarizes a GitHub repository from its README content,
 * returning a strict structured output with fields "summary" (string) and "cool_facts" (string[]).
 * @param {string} readmeContent - The content of the README.md file.
 * @returns {Promise<{ summary: string, cool_facts: string[] }>} - The summary and cool facts.
 */
export async function summarizeReadmeWithLangChain(readmeContent) {
  // 1. Define the strict output schema using zod
  const summarySchema = z.object({
    summary: z.string().describe("A concise summary of the repository based on the README."),
    cool_facts: z
      .array(z.string())
      .describe("A list of 3-5 cool or interesting facts about the repository."),
  });

  // 2. Create the LLM and bind the schema with strict output
  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo", // or "gpt-4o" if available
    temperature: 0.3,
  }).withStructuredOutput(summarySchema, {
    name: "summarize_github_repo",
    strict: true,
  });

  // 3. Build the prompt
  const prompt = `Summarize this GitHub repository from this README file content:\n\n${readmeContent}`;

  // 4. Invoke the LLM and return the structured output
  return await llm.invoke(prompt);
}
