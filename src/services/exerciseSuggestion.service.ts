import Groq from "groq-sdk";

export async function getExerciseSuggestions(cleanedData: any) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = `

    Based on the following assessment details, analyze the patient's response and suggest suitable exercises for the patient. 
    Provide the output strictly in a JSON array format, with each exercise containing the following fields:  
  
    - "analysis": a brief analysis based on the patient's response,
    - "exerciseTitle": title of the exercise, 
    - "exerciseDescription": description of the exercise (obtained directly from the link as a preview),
    - "exerciseThumbnailUrl": a URL to a preview thumbnail for the exercise video,
    - "exerciseUrl": a valid URL for the exercise articles or video (ensure this link is existing and functional).

    Ensure that the title, description, and thumbnail are pulled from the exerciseUrl itself for consistency with the actual content. Provide 1 analysis and exercise suggestions only.


    Only return the json array as output, do not include any additional text or formatting.

    Ensure that the exerciseUrl is a valid URL.
    
    Assessment Details:
     ${JSON.stringify(cleanedData, null, 2)}
  
    Example Output:
    [
      "analysis": "Analysis of the patient's response",
      "suggestions": [
        {
          "exerciseTitle": "Exercise Title",
          "exerciseDescription": "Description obtained from the link",
          "exerciseThumbnailUrl": "Thumbnail URL from the link preview",
          "exerciseUrl": "Exercise Video Or Article URL"
        },
        {
          "exerciseTitle": "Exercise Title",
          "exerciseDescription": "Description obtained from the link",
          "exerciseThumbnailUrl": "Thumbnail URL from the link preview",
          "exerciseUrl": "Exercise Video Or Article URL"
        }
      ]
    ]
    `;

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.2-11b-text-preview",
  });



  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error("Response content is null");
  }
  const suggestions = JSON.parse(content);

  return suggestions;
}