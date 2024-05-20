import axios from "axios";
import { Token, User, UserLogin, UserRegister } from "../types/auth.types";

export async function login(dto: UserLogin) {
  const response = await axios.post<Token>("/AuthUser/login", dto);
  if (response.status !== 200) {
    throw response.data;
  }
  return response.data;
}

export async function register(dto: UserRegister) {
  const response = await axios.post<User>("/AuthUser/register", dto);
  if (response.status !== 200) {
    throw response.data;
  }
  return true; // success
}

export async function getUser(id: number | string) {
  const response = await axios.get<User>(`/AuthUser/personalInfo/${id}`);
  if (response.status !== 200) {
    throw response.data;
  }
  return response.data;
}
