import { apiClient } from "../../../lib/api-client";
import type { MindUser } from "../types/MindUser"

export type LoginUserDto = Omit<MindUser, "mind_user_id" | "mind_nick" | "mind_user_sesions_token">

export const loginUser = async(userData:LoginUserDto) => {
    const response = await apiClient.post<MindUser>('/users/login', userData);
    return response.data;
}