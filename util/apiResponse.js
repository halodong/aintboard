export const getFailedResponse = (
  error,
  fileName,
  message = "Something went wrong"
) => {
  return {
    success: false,
    response: {
      error,
      fileName,
      message,
    },
  };
};

export const getSuccessResponse = (response) => {
  return {
    success: true,
    response,
  };
};
