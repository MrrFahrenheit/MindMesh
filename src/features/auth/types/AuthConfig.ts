import type { IFormCell } from "../../../types/IFormCell";
import type { CreateUserDto } from "../../../features/auth/api/register-user";
import type { LoginUserDto } from "../../../features/auth/api/login-user";

// 1. Modos válidos de autenticación
export type AuthMode = 'register' | 'login';

// 2. Estructura de cada objeto de configuración
export interface AuthConfigItem {
  title: string;
  fields: IFormCell[];
  submitAction: (data: any) => Promise<any>;
  successMessage: string;
}

// 3. Diccionario mapeado por los modos
export type AuthConfigMap = Record<AuthMode, AuthConfigItem>;