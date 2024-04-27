export const formatZodErrors = (errors: any) => {
  return errors.reduce((acc: any, error: any) => {
    if (error.path.length > 1) {
      if (acc[error.path[0]]) {
        acc[error.path[0]].push(error.message);
      } else {
        acc[error.path[0]] = [error.message];
      }
    } else {
      acc[error.path[0]] = error.message;
    }
    return acc;
  }, {});
};

// generate validation response for zod
export const generateValidationResponse = (errors: any) => {
  return {
    code: 400,
    status: 'error',
    message: 'Bad Request',
    errors: formatZodErrors(errors),
  };
};
