export type IFormCell = {
    name: string;
    label: string;
    type:
        | "text"
        | "email"
        | "password"
        | "number"
        | "tel"
        | "url"
        | "date"
        | "time"
        | "datetime-local"
        | "textarea"
        | "select"
        | "checkbox"
        | "radio"
        | "file";

    value?: string | number | boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;

    options?: {
        label: string;
        value: string | number;
    }[];

    min?: number | string;
    max?: number | string;
    step?: number;

    error?: string;
    description?: string;
};