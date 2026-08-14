import { useEffect, useState } from "react";
import { registerUser, type CreateUserDto } from "../../../features/auth/api/register-user";
import { LoginForm, RegisterForm } from "../../../interfaces/IAuthForm"
import type { IFormCell } from "../../../types/IFormCell"
import Form from "../../shared/Form";
import { loginUser, type LoginUserDto } from "../../../features/auth/api/login-user";
import type { AuthConfigItem, AuthConfigMap } from "../../../features/auth/types/AuthConfig";
import { getErrorMessage } from "../../../lib/nest-exceptions";
import toast from "react-hot-toast";

type AuthMode = 'register' | 'login';

export default function Auth({ mode }: { mode: AuthMode }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        setError(null);
        setSuccess(false);
    }, [mode]);

    const authConfig: AuthConfigMap = {
        register: {
            title: "Registrarse",
            fields: RegisterForm,
            submitAction: (data: any) => registerUser(data as CreateUserDto),
            successMessage: "¡Registro completado exitosamente!",
        },
        login: {
            title: "Iniciar Sesión",
            fields: LoginForm,
            submitAction: (data: any) => loginUser(data as LoginUserDto),
            successMessage: "¡Sesión iniciada correctamente!",
        },
    };

    const currentConfig: AuthConfigItem = authConfig[mode];

    const handleSubmit = async (data: Record<string, any>) => {
        setSuccess(false);
        setLoading(true);
        setError(null);

        try {
            const result = await currentConfig.submitAction(data);
            setSuccess(true);
        } catch (err) {
            const fallbackMsg = mode === "register"
                ? "Error al registrar el usuario."
                : "Error al iniciar sesión.";

            const parsedError = getErrorMessage(err, fallbackMsg);
            toast.error(parsedError);
            setError(parsedError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="m-3 w-full">
            <Form fields={authConfig[mode].fields} title={authConfig[mode].title} onSubmit={handleSubmit}
            submitText={authConfig[mode].title} disable={loading}
            />
        </div>
    )
}
