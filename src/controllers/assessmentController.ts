import { Request, Response } from 'express';
import { apiResponse, errorResponse } from '../utils/api-response.util';
import prisma from '../lib/prisma';
import { STATUS_CODES } from '../constants';
import { getExerciseSuggestions } from '../services/exerciseSuggestion.service';

export const getAllAssessmentByPatientId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // Fetch assessments with related data
      const assessments = await prisma.assessment.findMany({
        where: {
          patientRecord: {
            patientId: id,
          },
        },
        include: {
          questionnaire: {
            include: {
              sections: {
                include: {
                  question: true,
                },
              },
            },
          },
          response: true,
          doctor: {
            select: {
              id: true,
              fullname : true,
              profileImageUrl: true,
              email : true
            },
          },
        },
      });
  
      // Determine the status of each assessment
      const result = assessments.map((assessment) => {
        const totalQuestions = assessment.questionnaire.sections.reduce((acc, section) => acc + section.question.length, 0);
        const answeredQuestions = assessment.response.length;
  
        let status = 'Assigned';
        if (answeredQuestions > 0 && answeredQuestions < totalQuestions) {
          status = 'In Progress';
        } else if (answeredQuestions === totalQuestions) {
          status = 'Completed';
        }
  
        return {
          assessmentId : assessment.id,
          questionnaireName: assessment.questionnaire.title,
          questionnaireType: assessment.questionnaire.type,
          questionnaireIndex: assessment.questionnaire.index,
          status,
          doctorName: assessment.doctor.fullname,
          doctorEmail : assessment.doctor.email,
          profileImageUrl: assessment.doctor.profileImageUrl,
          assignedDate: assessment.createdDatetime,
        };
      });
  
      return apiResponse({
        res,
        result,
      });
    } catch (error) {
      return errorResponse({ res, error });
    }
  };

  export const getAssessmentDetails = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const assessment = await prisma.assessment.findUnique({
        where: { id },
        include: {
          questionnaire: {
            include: {
              sections: {
                include: {
                  question: {
                    include: {
                      optionTemplate: {
                        include: {
                          option: true,
                        },
                      },
                      response: {
                        where: { assessmentId: id },
                        include: {
                          option: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
  
      if (!assessment) {
        return res.status(404).json({ message: 'Assessment not found' });
      }
  
      const questionnaireDetails = {
        title: assessment.questionnaire.title,
        description: assessment.questionnaire.description,
        sections: assessment.questionnaire.sections.map((section) => ({
          sectionId: section.id,
          sectionName: section.name,
          sectionDescription: section.description,
          questions: section.question.map((question) => {
            const options = question.optionTemplate.option.map((opt) => ({
              optionId: opt.id,
              scaleValue: opt.scaleValue,
              content: opt.content,
            }));
  
            const response = question.response.find((r) => r.assessmentId === id);
  
            return {
              id : question.id,
              title: question.title,
              options,
              answer: response ? response.option.id : null,
              responseId: response ? response.id : '',
            };
          }),
        })),
      };
  
      return res.status(200).json({
        result: questionnaireDetails,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  };

  interface CreateResponse {
    responseId: string;
    assessmentId: string;
    questionId: string;
    optionId: string;
  }
  
  export const createOrUpdateAssessmentResponses = async (req: Request, res: Response) => {
    const responses: CreateResponse[] = req.body.response;
  
    try {
      const result = await Promise.all(
        responses.map(async (response) => {
          if (response.responseId) {
            // Update the existing response
            return prisma.response.update({
              where: { id: response.responseId },
              data: {
                optionId: response.optionId,
              },
            });
          } else {
            // Create a new response
            return prisma.response.create({
              data: {
                assessmentId: response.assessmentId,
                questionId: response.questionId,
                optionId: response.optionId,
              },
            });
          }
        })
      );
  
      return res.status(200).json({
        message: 'Responses processed successfully',
        result,
      });
    } catch (error: any) {
      console.error('Error processing responses:', error.message);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  };


  export const getPatientAssessmentDetailsForAIFeed = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const assessment = await prisma.assessment.findUnique({
        where: { id },
        include: {
          questionnaire: {
            include: {
              sections: {
                include: {
                  question: {
                    include: {
                      optionTemplate: {
                        include: {
                          option: true,
                        },
                      },
                      response: {
                        where: { assessmentId: id },
                        include: {
                          option: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
  
      if (!assessment) {
        return res.status(404).json({ message: 'Assessment not found' });
      }
  
      const cleanedData = {
        title: assessment.questionnaire.title,
        description: assessment.questionnaire.description,
        sections: assessment.questionnaire.sections.map((section) => ({
          sectionName: section.name,
          sectionDescription: section.description,
          questions: section.question.map((question) => {
            const options = question.optionTemplate.option.map((opt) => {
              const optionText = opt.content ? `${opt.scaleValue} - ${opt.content}` : `${opt.scaleValue}`;
              return optionText;
            });
            const response = question.response.find((r) => r.assessmentId === id);
            const answer = response ? (response.option.content ? `${response.option.scaleValue} - ${response.option.content}` : `${response.option.scaleValue}`) : null;
            return {
              title: question.title,
              options,
              answer
            };
          }),
        })),
      };
  
      const exerciseSuggestions = await getExerciseSuggestions(cleanedData);
      return res.status(200).json({
        result: exerciseSuggestions,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  };