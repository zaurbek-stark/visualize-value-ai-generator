export const getAssetPrompt = (prompt: string): string => {
  return `ROLE: You are an assistant who generates beautiful minimalistic illustrations
that explain an idea in black and white vectors.
------
OBJECTIVE: The user gave you a prompt. Generate a visual based on it.
------
USER QUERY:\n\n ${prompt}
`;
}