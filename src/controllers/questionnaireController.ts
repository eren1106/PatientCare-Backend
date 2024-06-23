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

export const getQuestionnaireById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const questionnaires = await prisma.questionnaire.findUnique({
      where : {
        id: id
      },
      include: {
        question : {
          include : {
            option : true,
            fieldType : true
          }
        },
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

export const createQuestionnaire = async (req: Request, res: Response) => {
  const { title, description, type, questions} = req.body.questionnaire;
  const { authorId  } = req.body;
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const questionnaire = await prisma.questionnaire.create({
        data: {
          title,
          description,
          type,
          authorId: authorId,
        }
      });

      for (const q of questions) {
        let fieldType = await prisma.fieldType.findFirst({ where: { name: q.type } });
        if (!fieldType) {
          fieldType = await prisma.fieldType.create({ data: { name: q.type } });
        }

        const question = await prisma.question.create({
          data: {
            title: q.title,
            fieldTypeId: fieldType.id,
            questionnaire: {
              connect: { id: questionnaire.id }
            }
          }
        });

        if (q.type === 'Multiple Choice' && q.options) {
          for (const option of q.options) {
            await prisma.option.create({
              data: {
                content: option.content,
                questionId: question.id
              }
            });
          }
        }
      }

      return questionnaire;
    });

    return apiResponse({
      res,
      result,
      message: 'Questionnaire created successfully',
    });

  } catch (error) {
    return errorResponse({ res, error });
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
  } catch (error) {
    return errorResponse({ res, error });
  }
};