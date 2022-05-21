import { useState } from "react";
const useHttp=(requestConfig,processData)=>{


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url,{
          method:requestConfig.method ? requestConfig.method:"GET",
          headers:requestConfig.headers ? requestConfig.headers:{},
          body:userData? JSON.stringify(userData):null
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      processData(data)

    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };
  return{
    isLoading,
    error,
    sendRequest
  }
}
export default useHttp