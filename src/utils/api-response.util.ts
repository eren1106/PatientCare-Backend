import { Response } from "express";
import { STATUS_CODES } from "../constants";

interface IApiResponse {
  message: string;
  data?: any;
  status?: string;
  statusCode?: number;
  extra?: any;
  count?: number;
}

const apiResponseWrapper = (
  res: Response,
  {
    message,
    data,
    status = 'SUCCESS',
    statusCode = STATUS_CODES.OK,
    extra,
    count,
  }: IApiResponse
) => {
  const response = {
    message,
    data,
    count,
    status,
    extra,
  };
  console.log(response);
  return res.status(statusCode).json(response);
};

export const apiResponse = ({ res, result, message, extra }: { res: Response; result: any; message?: string; extra?: any }) => {
  if (Array.isArray(result) && result.length === 0) {
    return noResultArrayResponse(res);
  }
  if (result === null || result === undefined) return noResultResponse(res);

  const response = {
    message: message || 'Success',
    data: result,
    count: Array.isArray(result) ? result.length : undefined,
    extra,
  };

  return apiResponseWrapper(res, response);
};

export const errorResponse = ({ res, error, result }: { res: Response; error: any; result?: any }) => {
  return apiResponseWrapper(res, {
    message: error,
    extra: result,
    status: 'FAILED',
    statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
  });
};

const noResultResponse = (res: Response) => {
  return apiResponseWrapper(res, {
    message: 'Data not found',
    status: 'FAILED',
    statusCode: STATUS_CODES.NOT_FOUND,
  });
};

const noResultArrayResponse = (res: Response) => {
  return apiResponseWrapper(res, {
    message: 'No results found',
    data: [],
  });
};