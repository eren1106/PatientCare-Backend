import Groq from "groq-sdk";

export async function getExerciseSuggestions(cleanedData: any, exerciseData : any) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = `

    ###Assessment Result###:
     ${JSON.stringify(cleanedData, null, 2)}

    ###Exercises###:
      ${JSON.stringify(exerciseData, null, 2)}

    Based on the following assessment result, provide an analysis of the patient's response.
    Then, suggest suitable exercises for the patient. 
    Your analysis of the patient response will be stored in the ###analysis### field in the json.
    The suggestions should be based on the ###Assessment Result### and the ###Exercises###. 
    Provide the output strictly in a JSON format with following structure:  
  
    {
     "analysis": "Analysis of the patient's response",
     "suggestions": [
       {
        "exerciseTitle": "Exercise Title",
        "exerciseId": "Exercise ID"
       },
       {
        "exerciseTitle": "Exercise Title",
        "exerciseId": "Exercise ID"
       }
     ]
   }

    Suggest 1-3 exercises based on the  ###Assessment Result###.
    Strictly return the json array as output only, do not include any additional text or formatting.
  
    Example Output:
    {
      "analysis": "The patient is experiencing severe pain in their shoulder, making even simple activities like washing hair or reaching difficult. Exercises should focus on gentle movements and improving flexibility.",
      "suggestions": [
        {
          "exerciseTitle": "Wall Squat",
          "exerciseId: "cm40y6rfn004zeub2uzgtkoug",
        },
        {
          "exerciseTitle": "Quadriceps stretch",
          "exerciseId: "cm40y6rgw0051eub2j4kfe4co",
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
    model: "llama-3.2-3b-preview",
  });



  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error("Response content is null");
  }
  
  const suggestions = JSON.parse(content);
  console.log('exerciseSuggestions', content);
  return suggestions;
}