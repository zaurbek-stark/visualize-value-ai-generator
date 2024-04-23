export const getAssetPrompt = (prompt: string): string => {
  return `Create a minimalist image in the style of "Visualize Value" for this concept: ${prompt}
------
REQUIREMENTS: 
- The background must be black and it must be the dominant color.
- The image must be minimalist and simple. 
- The graphic serves as a metaphor for the user query.
- There should not be any color, gradients, shadows, or complex patterns.
- There should only be line drawing, simple design, vector art in the style of a minimalist.
- If needed, add text in a clean, minimalist font that complements the graphic and underscores the message of the visual metaphor.
`;
}