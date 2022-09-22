import axios from "axios";

export type ErrorResponse = {
  errors: [{ message: string; field: string }];
};

const useRequest = (url: string, method: "post" | "get") => {
  const doRequest = async <T extends object>(body: T) => {
    try {
      const response = await axios[method](url, body);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        throw (err.response?.data as ErrorResponse).errors;
      }
    }
  };

  return { doRequest };
};

export default useRequest;
