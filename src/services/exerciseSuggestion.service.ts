import Groq from "groq-sdk";

export async function getExerciseSuggestions(cleanedData: any, exerciseData : any) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = `

    ###Assessment Result###:
     ${JSON.stringify(cleanedData, null, 2)}

    ###Exercises###:
      ${JSON.stringify(exerciseData, null, 2)}

    Based on the following assessment details, analyze the patient's assessment result and suggest suitable exercises for the patient.
    The suggestions should be based on the ###Assessment Result### and the ###Exercises###. 
    Provide the output strictly in a JSON format with following keys:  
  
    - "analysis": a brief analysis based on the patient's response,
    - "exerciseTitle": title of the exercise (obtained from ###Exercises###), 
    - "exerciseId": id of the exercise (obtained from ###Exercises###),

    Suggest 1-5 exercises based on the  ###Assessment Result###.
    Only return the json array as output, do not include any additional text or formatting.
  
    Example Output:
    {
      "analysis": "Analysis of the patient's response",
      "suggestions": [
        {
          "exerciseTitle": "Exercise Title",
          "exerciseId: "Exercise ID",
        },
        {
          "exerciseTitle": "Exercise Title",
          "exerciseId: "Exercise ID",
        }
      ]
    }
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