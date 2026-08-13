import { LoginForm, RegisterForm } from "../../../interfaces/IAuthForm"
import type { IFormCell } from "../../../types/IFormCell"
import Form from "../../shared/Form";

export default function Auth({actualPage} : {actualPage:number}) {

    const forms:Array<Array<IFormCell>> = [RegisterForm, LoginForm];
    const titles:Array<string> = ["Registrarse", "Iniciar Sesion"];

    return (
        <div className="m-3 w-full">
            <Form fields={forms[actualPage]} title={titles[actualPage]} />
        </div>
    )
}
