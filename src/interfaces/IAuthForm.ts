import type { IFormCell } from "../types/IFormCell";

export const LoginForm: Array<IFormCell> = [
    {
        name: "mind_email",
        label: "Correo electrónico",
        type: "email",
        placeholder: "Ingresa tu correo",
        required: true,
    },
    {
        name: "mind_password",
        label: "Contraseña",
        type: "password",
        placeholder: "Ingresa tu contraseña",
        required: true,
    },
];

export const RegisterForm: Array<IFormCell> = [
    {
        name: "mind_nick",
        label: "Nombre de usuario",
        type: "text",
        placeholder: "Ingresa tu nombre de usuario",
        required: true,
    },
    {
        name: "mind_email",
        label: "Correo electrónico",
        type: "email",
        placeholder: "Ingresa tu correo",
        required: true,
    },
    {
        name: "mind_password",
        label: "Contraseña",
        type: "password",
        placeholder: "Ingresa tu contraseña",
        required: true,
    },
];