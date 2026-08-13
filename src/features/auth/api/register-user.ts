import { apiClient } from "../../../lib/api-client";
import type { MindUser } from "../types/MindUser";

// Define un tipo para los datos necesarios al registrar (usualmente sin campos automáticos como `id` o `createdAt`)
export type CreateUserDto = Omit<MindUser, 'mind_user_id'>; 

export const registerUser = async (userData: CreateUserDto): Promise<MindUser> => {
  // Usamos .post<T>(url, data)
  const response = await apiClient.post<MindUser>('/users', userData);
  return response.data;
};