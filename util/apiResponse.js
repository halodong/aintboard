export const getFailedResponse = (
  error,
  fileName,
  message = "Something went wrong"
) => {
  return {
    success: false,
    error,
    fileName,
    message,
  };
};

export const getSuccessResponse = (response) => {
  return {
    success: true,
    response,
  };
};
