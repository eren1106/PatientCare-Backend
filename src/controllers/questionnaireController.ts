import { Request, Response } from 'express';
import { apiResponse, errorResponse } from '../utils/api-response.util';
import prisma from '../lib/prisma';
import { STATUS_CODES } from '../constants';
import { getExerciseSuggestions } from '../services/exerciseSuggestion.service';

export const getAllOptions = async (req: Request, res: Response) => {
  try {
    const options = await prisma.optionTemplate.findMany({
      include : {
        option : true
      }
    });
    return apiResponse({
      res,
      result: options
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
}


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

export const getAllAssessmentByPatientRecordId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const assessment = await prisma.assessment.findMany({
      where : {
        // isDelete : false
        patientRecordId : id
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
            question: {
              include : {
                optionTemplate : {
                  include : {
                    option : true
                  }
                }
              }
            }
          }
        }
        
      }
    });
    if (!questionnaires) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        message: `Questionnaire with ID ${id} not found.`,
      });
    }

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
    const { doctorId, questionnaireId, recordId } = req.body.assessment;

    const assessment = await prisma.assessment.create({
      data : {
        doctorId : doctorId,
        questionnaireId : questionnaireId,
        patientRecordId : recordId
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


export const createQuestionnaire = async (req: Request, res: Response) => {
  const { title, description, type, index, authorId, sections } = req.body.questionnaire;

  try {
    // Create the questionnaire with nested sections and questions
    const questionnaire = await prisma.questionnaire.create({
      data: {
        title,
        description,
        type,
        index,
        authorId,
        sections: {
          create: sections.map((section: any) => ({
            name: section.name,
            description: section.description,
            question: {
              create: section.questions.map((question: any) => ({
                title: question.title,
                optionId: question.optionId,
              })),
            },
          })),
        },
      },
      include: {
        sections: {
          include: {
            question: true,
          },
        },
      },
    });

    return apiResponse({
      res,
      result: questionnaire,
      message: 'Questionnaire created successfully',
    });
  } catch (error : any) {
    return res.status(400).json({
      message: 'Error updating questionnaire',
      error: error.message.toString(),
    });
  }
};



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
  } catch (error : any) {
    return res.status(400).json({
      message: 'Error updating questionnaire',
      error: error.message.toString(),
    });
  }
};

export const updateQuestionnaire = async (req: Request, res: Response) => {
  const { title, description, sections }: UpdateQuestionnaireRequest = req.body;
  const { id } = req.params;
  try {
    // Update the questionnaire
    const updatedQuestionnaire = await prisma.questionnaire.update({
      where: { id },
      data: {
        title,
        description,
        sections: {
          upsert: sections.map((section) => ({
            where: { id: section.id || '' },
            update: {
              name: section.name,
              description: section.description,
              question: {
                upsert: section.question.map((q) => ({
                  where: { id: q.id || '' },
                  update: {
                    title: q.title,
                    optionId: q.optionId,
                  },
                  create: {
                    title: q.title,
                    optionId: q.optionId,
                  },
                })),
              },
            },
            create: {
              name: section.name,
              description: section.description,
              question: {
                create: section.question.map(( q) => ({
                  title: q.title,
                  optionId:  q.optionId,
                })),
              },
            },
          })),
        },
      },
      include: {
        sections: {
          include: {
            question: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: 'Questionnaire updated successfully',
      result: updatedQuestionnaire,
    });
  } catch (error : any) {
    return res.status(400).json({
      message: 'Error updating questionnaire',
      error: error.message.toString(),
    });
  }
};

export const getAssessmentResult = async (req: Request, res: Response) => {
  const assessmentId = req.params.id;

  try {
    // Fetch the assessment with related data
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        questionnaire: {
          include: {
            sections: {
              include: {
                question: {
                  include: {
                    response: {
                      where: { assessmentId },
                      include: {
                        option: true,
                      },
                    },
                    optionTemplate: true,
                  },
                },
              },
            },
          },
        },

        exerciseSuggest: {
          include: {
            suggestion: true,
          }
        },
        response: {
          include: {
            question: true,
            option: true,
          },
        },
      },
    });

    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    const { questionnaire } = assessment;
    const totalQuestions = questionnaire.sections.reduce((acc, section) => acc + section.question.length, 0);
    const answeredQuestions = assessment.response.length;

    let questionnaireStatus = 'Assigned';
    if (answeredQuestions > 0 && answeredQuestions < totalQuestions) {
      questionnaireStatus = 'In Progress';
    } else if (answeredQuestions === totalQuestions) {
      questionnaireStatus = 'Completed';
    }

    const sectionScores = questionnaire.sections.map((section) => {
      const sectionResponses = section.question.flatMap((q) => q.response);
      const totalPossibleScore = section.question.reduce((acc, question) => {
        return acc + (question.optionTemplate.scaleType === 'NUMERIC_SCALE' ? 10 : 5);
      }, 0);
      const totalScore = sectionResponses.reduce((acc, response) => acc + response.option.scaleValue, 0);
      const sectionScore = totalScore;

      return {
        sectionName: section.name,
        sectionScore: sectionScore,
        sectionTotalScore: totalPossibleScore,
        questions: section.question.map((question) => {
          const response = question.response.find((r) => r.assessmentId === assessmentId);
          return {
            questionId: question.id,
            questionTitle: question.title,
            response: response
              ? {
                  scaleValue: response.option.scaleValue,
                  content: response.option.content,
                }
              : null,
          };
        }),
      };
    });

    const totalPossibleScore = questionnaire.sections.reduce((acc, section) => {
      return acc + section.question.reduce((acc, question) => {
        return acc + (question.optionTemplate.scaleType === 'NUMERIC_SCALE' ? 10 : 5);
      }, 0);
    }, 0);
    const totalScore = assessment.response.reduce((acc, response) => acc + response.option.scaleValue, 0);
    const totalScorePercentage = (totalScore / totalPossibleScore) * 100;

    const result = {
      questionnaireName: questionnaire.title,
      questionnaireType: questionnaire.type,
      exerciseSuggestions : assessment.exerciseSuggest,
      questionnaireIndex: questionnaire.index,
      questionnaireStatus,
      sectionScores,
      totalScore: totalScorePercentage.toFixed(2),
    };

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Error fetching assessment result:', error.message);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const createOptionTemplate = async (req: Request, res: Response) => {
  const { scaleType, options } = req.body;

  try {
    const optionTemplate = await prisma.optionTemplate.create({
      data: {
        scaleType,
        option: {
          create: options.map((opt: { scaleValue: number; content: string }) => ({
            scaleValue: opt.scaleValue,
            content: opt.content,
          })),
        },
      },
      include: {
        option: true,
      },
    });

    return apiResponse({
      res,
      result: optionTemplate,
      message: 'Option template created successfully',
    });
  } catch (error: any) {
    return errorResponse({ res, error });
  }
};


export const getAllOptionTemplates = async (req: Request, res: Response) => {
  try {
    const optionTemplates = await prisma.optionTemplate.findMany({
      include: {
        option: true,
      },
    });

    return apiResponse({
      res,
      result: optionTemplates,
    });
  } catch (error: any) {
    return errorResponse({ res, error });
  }
};



export const updateOptionTemplate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { scaleType, options } = req.body;

  try {
    // Update the option template
    const optionTemplate = await prisma.optionTemplate.update({
      where: { id },
      data: {
        scaleType,
      },
    });

    // Update existing options and create new ones
    for (const opt of options) {
      if (opt.id) {
        // Update existing option
        await prisma.option.update({
          where: { id: opt.id },
          data: {
            scaleValue: opt.scaleValue,
            content: opt.content,
          },
        });
      } else {
        // Create new option
        await prisma.option.create({
          data: {
            optionTemplateId: id,
            scaleValue: opt.scaleValue,
            content: opt.content,
          },
        });
      }
    }


    return apiResponse({
      res,
      result: optionTemplate,
      message: 'Option template updated successfully',
    });
  } catch (error: any) {
    return errorResponse({ res, error });
  }
};

export const deleteOptionTemplate = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Check if the option template is referenced in questions or options
    const referencedQuestion = await prisma.question.findFirst({
      where: { optionId: id },
    });


    if (referencedQuestion) {
      return res.status(400).json({
        message: 'Cannot delete option template as it is referenced in questions or options',
      });
    }

    const options = await prisma.option.deleteMany({
      where: { optionTemplateId: id },
    })

    const optionTemplate = await prisma.optionTemplate.delete({
      where: { id },
    });

    return apiResponse({
      res,
      result: optionTemplate,
      message: 'Option template deleted successfully',
    });
  } catch (error: any) {
    return errorResponse({ res, error });
  }
};

interface Option {
  id?: string; 
  content: string;
}

interface Question {
  id?: string; 
  title: string;
  type: string;
  optionId: string;
  options?: Option[]; 
}



interface Section {
  id: string;
  name: string;
  description: string;
  question: Question[];
}

interface UpdateQuestionnaireRequest {
  id: string;
  title: string;
  description: string;
  sections: Section[];
}