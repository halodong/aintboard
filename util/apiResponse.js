export const getFailedResponse = (error, fileName) => {
  return {
    success: false,
    error,
    fileName,
  };
};

export const getSuccessResponse = (response) => {
  return {
    success: true,
    response,
  };
};
