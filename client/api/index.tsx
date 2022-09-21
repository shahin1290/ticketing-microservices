import axios from "axios";

export function signupUser(payload: { email: string; password: string }) {
  return axios.post("/api/users/signup", payload).then((res) => res.data);
}

export function signinUser(payload: { email: string; password: string }) {
  return axios.post("/api/users/signin", payload, {withCredentials: true}).then((res) => res.data);
}

