export const sendSuccess = <T>(res: any, data: T, meta?: any, statusCode: number = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
    ...(meta && { meta })
  });
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
