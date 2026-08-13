import { useState } from "react";
import { registerUser, type CreateUserDto } from "../../../features/auth/api/register-user";
import { LoginForm, RegisterForm } from "../../../interfaces/IAuthForm"
import type { IFormCell } from "../../../types/IFormCell"
import Form from "../../shared/Form";

export default function Auth({ actualPage }: { actualPage: number }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false);

    const forms: Array<Array<IFormCell>> = [RegisterForm, LoginForm];
    const titles: Array<string> = ["Registrarse", "Iniciar Sesion"];
    
    const handleSubmit = async (data:Record<string, string | number | boolean>) => {
        setLoading(true);
        setError(null);

        try {
            // 1. Agregamos el AWAIT aquí
            const createdUser = await registerUser(data as CreateUserDto);

            console.log('Usuario registrado con éxito:', createdUser);
            setSuccess(true);

        } catch (err: any) {
            // NestJS suele devolver los mensajes de error en `err.response?.data?.message`
            const errorMessage = err.response?.data?.message || 'Ocurrió un error al registrar el usuario';
            setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
        } finally {
            setLoading(false); // Desactiva el indicador de carga sin importar si falló o tuvo éxito
        }
    };
    return (
        <div className="m-3 w-full">
            <Form fields={forms[actualPage]} title={titles[actualPage]} onSubmit={handleSubmit} />
        </div>
    )
}
