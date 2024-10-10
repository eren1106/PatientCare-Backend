import { Response } from "express";
import { STATUS_CODES } from "../constants";
import { removeUndefinedFields } from "./utils";

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
  const cleanRes = removeUndefinedFields(response); // TODO: test if this affect performance alot, if alot then just remove
  console.log(cleanRes);
  return res.status(statusCode).json(cleanRes);
};

export const apiResponse = ({
  res,
  result,
  message,
  extra = undefined
}: { res: Response; result: any; message?: string; extra?: any }) => {
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

export const errorResponse = ({
  res,
  error,
  result = undefined,
  statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR
}: { res: Response; error: any; result?: any; statusCode?: number }) => {
  return apiResponseWrapper(res, {
    message: error,
    extra: result,
    status: 'FAILED',
    statusCode: statusCode,
  });
};

export const customResponse = ({
  res,
  message = "",
  result = undefined,
  status = 'SUCESS',
  statusCode = STATUS_CODES.OK,
  extra = undefined,
}: { res: Response; message?: string; result?: any; status?: string; statusCode?: number, extra?: any }) => {
  return apiResponseWrapper(res, {
    message,
    data: result,
    status,
    statusCode: statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
    extra,
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