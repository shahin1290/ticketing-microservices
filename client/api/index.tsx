import axios from "axios";

export async function signupUser(payload: { email: string; password: string }) {
  const response = await axios.post("/api/users/signup", payload);
  return response.data;
}

export async function signinUser(payload: { email: string; password: string }) {
  const response = await axios.post("/api/users/signin", payload, {
    withCredentials: true,
  });
  return response.data;
}
