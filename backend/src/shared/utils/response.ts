export const sendSuccess = <T>(
  res: any, 
  data: T, 
  meta?: any, 
  statusCode: number = 200,
  pagination?: any
) => {
  const responseObj: any = {
    success: true,
    data,
  };

  const pag = pagination || (meta && meta.pagination);
  if (pag) {
    responseObj.pagination = pag;
  }

  if (meta) {
    responseObj.meta = meta;
  }

  return res.status(statusCode).json(responseObj);
};

export const sendError = (res: any, message: string, errorCode: string, statusCode: number = 500) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
    },
  });
};
