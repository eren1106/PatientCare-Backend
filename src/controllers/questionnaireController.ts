import { Request, Response } from 'express';
import { apiResponse, errorResponse } from '../utils/api-response.util';
import prisma from '../lib/prisma';
import { STATUS_CODES } from '../constants';

export const getAllQuestionnaires = async (req: Request, res: Response) => {
    try {
      const questionnaires = await prisma.questionnaire.findMany({
        where : {
          isDelete : false
        }
      });
      return apiResponse({
        res,
        result: questionnaires
      });
    } catch (error) {
      return errorResponse({ res, error });
    }
};

export const getAllAssessmentByPatientId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const assessment = await prisma.assessment.findMany({
      where : {
        // isDelete : false
        userId : id
      },
      include : {
        questionnaire : true
      }
    });
    return apiResponse({
      res,
      result: assessment
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const getQuestionnaireById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const questionnaires = await prisma.questionnaire.findUnique({
      where : {
        id: id
      },
      include: {
        sections: {
          include : {
            question: true
          }
        }
        
      }

      
    });

    if (!questionnaires) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        message: `Questionnaire with ID ${id} not found.`,
      });
    }

     // Fetch all options based on question scales
     const allOptions = await prisma.option.findMany({
      where: {
        scaleType: {
          in: ['FREQUENCY', 'PAIN_SCALE', 'NUMERIC_SCALE'],
        },
      },
    });

    // Map the options to each question based on their scale type
    // questionnaires.sections.forEach(section => {
    //   section.question.forEach(question => {
    //     question.options = allOptions.filter(option => option.scaleType === question.scale);
    //   });
    // });
    return apiResponse({
      res,
      result: questionnaires
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const createAssessment = async (req: Request, res: Response) => {
  try {
    const { userId, questionnaireId, recordId } = req.body.assessment;
    const assessmentData = {
      userId,
      questionnaire: {
        connect: { id: questionnaireId }
      },
      patientRecord: {
        connect: { id: recordId }
      }
    };


    const assessment = await prisma.assessment.create({
      data: assessmentData
    });
    return apiResponse({
      res,
      result: assessment
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const deleteAssessment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const assessment = await prisma.assessment.delete({
      where : {
        id : id
      }
    });
    return apiResponse({
      res,
      result: assessment
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
}

// export const createQuestionnaire = async (req: Request, res: Response) => {
//   const { title, description, type, questions} = req.body.questionnaire;
//   const { authorId  } = req.body;
//   try {
//     const result = await prisma.$transaction(async (prisma) => {
//       const questionnaire = await prisma.questionnaire.create({
//         data: {
//           title,
//           description,
//           type,
//           authorId: authorId,
//         }
//       });

//       for (const q of questions) {
//         let fieldType = await prisma.fieldType.findFirst({ where: { name: q.type } });
//         if (!fieldType) {
//           fieldType = await prisma.fieldType.create({ data: { name: q.type } });
//         }

//         const question = await prisma.question.create({
//           data: {
//             title: q.title,
//             fieldTypeId: fieldType.id,
//             questionnaire: {
//               connect: { id: questionnaire.id }
//             }
//           }
//         });

//         if (q.type === 'Multiple Choice' && q.options) {
//           for (const option of q.options) {
//             await prisma.option.create({
//               data: {
//                 content: option.content,
//                 questionId: question.id
//               }
//             });
//           }
//         }
//       }

//       return questionnaire;
//     });

//     return apiResponse({
//       res,
//       result,
//       message: 'Questionnaire created successfully',
//     });

//   } catch (error) {
//     return errorResponse({ res, error });
//   }
// };


export const deleteQuestionnaire = async (req: Request, res: Response) => {
  const questionnaireId = req.params.id;
  try {
   
    const deletedQuestionnaire = await prisma.questionnaire.update({
      where: {
        id: questionnaireId
      },
      data: {
        isDelete: true
      }
    });

    return apiResponse({
      res,
      result: deletedQuestionnaire,
      message: "Questionnaire deleted"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

// export const updateQuestionnaire = async (req: Request, res: Response) => {
//   const { id, title, description, type, questions } = req.body.questionnaire;
//   const { authorId } = req.body;

//   try {
//     const result = await prisma.$transaction(async (prisma) => {
//       // Update questionnaire
//       const updatedQuestionnaire = await prisma.questionnaire.update({
//         where: { id },
//         data: {
//           title,
//           description,
//           type,
//           authorId,
//           updatedDatetime: new Date(),
//         },
//       });

//       // Get existing questions for this questionnaire
//       const existingQuestions = await prisma.question.findMany({
//         where: { questionnaire: { some: { id: updatedQuestionnaire.id } } },
//       });

//       // Track the ids of questions and options to delete
//       const deletedQuestionIds = existingQuestions
//         .filter(q => !questions.some((incomingQ : Question) => incomingQ.id === q.id))
//         .map(q => q.id);

//       // Delete questions that were removed
//       await prisma.question.deleteMany({
//         where: { id: { in: deletedQuestionIds } },
//       });

//       // Process questions from the request
//       for (const q of questions) {
//         let fieldType = await prisma.fieldType.findFirst({ where: { name: q.type } });
//         if (!fieldType) {
//           fieldType = await prisma.fieldType.create({ data: { name: q.type } });
//         }

//         let question;
//         if (q.id) {
//           // Update existing question
//           question = await prisma.question.update({
//             where: { id: q.id },
//             data: {
//               title: q.title,
//               fieldTypeId: fieldType.id,
//             },
//           });
//         } else {
//           // Create new question
//           question = await prisma.question.create({
//             data: {
//               title: q.title,
//               fieldTypeId: fieldType.id,
//               questionnaire: {
//                 connect: { id: updatedQuestionnaire.id },
//               },
//             },
//           });
//         }

//         // If question type is multiple choice, handle options
//         if (q.type === 'Multiple Choice' && q.options) {
//           const existingOptions = await prisma.option.findMany({
//             where: { questionId: question.id },
//           });

//           const deletedOptionIds = existingOptions
//             .filter(option => !q.options.some((incomingOpt : Option) => incomingOpt.id === option.id))
//             .map(option => option.id);

//           // Delete removed options
//           await prisma.option.deleteMany({
//             where: { id: { in: deletedOptionIds } },
//           });

//           // Process options
//           for (const option of q.options) {
//             if (option.id) {
//               // Update existing option
//               await prisma.option.update({
//                 where: { id: option.id },
//                 data: {
//                   content: option.content,
//                 },
//               });
//             } else {
//               // Create new option
//               await prisma.option.create({
//                 data: {
//                   content: option.content,
//                   questionId: question.id,
//                 },
//               });
//             }
//           }
//         }
//       }

//       return updatedQuestionnaire;
//     });

//     return apiResponse({
//       res,
//       result,
//       message: 'Questionnaire updated successfully',
//     });
//   } catch (error) {
//     return errorResponse({ res, error });
//   }
// };

interface Option {
  id?: string; 
  content: string;
}

interface Question {
  id?: string; 
  title: string;
  type: string;
  options?: Option[]; 
}