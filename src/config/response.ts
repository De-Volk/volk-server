const resultResponse = (message:string, status:number=200, data = {}) => {
    return {
      status: status,
      message: message,
      ...data,
    };
  };
  
  const basicResponse = (message:string, status:number=200) => {
    return {
      status: status,
      message: message,
    };
  };
  
export {resultResponse,basicResponse}