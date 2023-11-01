function registrationSuccessResponse(newUser) {
    return {
      message: "Пользователь успешно зарегистрирован",
      user: {
        id: newUser.id,
        email: newUser.email
      }
    };
  }
  
  function registrationErrorResponse(message) {
    return { message };
  }
  
  module.exports = {
    registrationSuccessResponse,
    registrationErrorResponse,
  };
  