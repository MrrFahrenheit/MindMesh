import React from "react";
import type { IFormCell } from "../../types/IFormCell";

type FormProps = {
    fields: IFormCell[];
    title?: string;
    submitText?: string;
    onSubmit?: (data: Record<string, string | number | boolean>) => void;
    disabled:boolean
};

export default function Form({
    fields,
    title,
    submitText = "Enviar",
    onSubmit,
    disabled
}: FormProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: Record<string, string | number | boolean> = {};

        fields.forEach((field) => {
            const value = formData.get(field.name);

            if (field.type === "checkbox") {
                data[field.name] = formData.has(field.name);
            } else if (field.type === "number") {
                data[field.name] = value ? Number(value) : 0;
            } else {
                data[field.name] = value?.toString() ?? "";
            }
        });

        onSubmit?.(data);
        
    };

    const renderField = (field: IFormCell) => {
        const commonProps = {
            id: field.name,
            name: field.name,
            required: field.required,
            disabled: field.disabled,
            readOnly: field.readOnly,
            placeholder: field.placeholder,
            className:
                "w-full px-4 py-3 rounded-xl " +
                "bg-background/80 border border-border " +
                "text-foreground placeholder:text-muted-foreground/50 " +
                "outline-none transition-all duration-300 " +
                "focus:border-primary focus:ring-2 focus:ring-primary/20 " +
                "disabled:opacity-50 disabled:cursor-not-allowed",
        };

        switch (field.type) {
            case "textarea":
                return (
                    <textarea
                        {...commonProps}
                        defaultValue={field.value?.toString() ?? ""}
                        className={`${commonProps.className} min-h-32 resize-none`}
                    />
                );

            case "select":
                return (
                    <select
                        {...commonProps}
                        defaultValue={field.value?.toString() ?? ""}
                    >
                        <option value="">
                            Selecciona una opción
                        </option>

                        {field.options?.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case "checkbox":
                return (
                    <div className="flex items-center gap-3">
                        <input
                            id={field.name}
                            name={field.name}
                            type="checkbox"
                            required={field.required}
                            disabled={field.disabled}
                            defaultChecked={Boolean(field.value)}
                            className="
                                w-5 h-5
                                accent-primary
                                cursor-pointer
                                rounded
                            "
                        />

                        <label
                            htmlFor={field.name}
                            className="text-sm text-muted-foreground cursor-pointer"
                        >
                            {field.label}
                        </label>
                    </div>
                );

            case "radio":
                return (
                    <div className="flex flex-col gap-3">
                        {field.options?.map((option) => (
                            <label
                                key={option.value}
                                className="
                                    flex items-center gap-3
                                    text-sm text-muted-foreground
                                    cursor-pointer
                                    hover:text-foreground
                                    transition-colors
                                "
                            >
                                <input
                                    type="radio"
                                    name={field.name}
                                    value={option.value}
                                    required={field.required}
                                    disabled={field.disabled}
                                    className="accent-primary"
                                />

                                {option.label}
                            </label>
                        ))}
                    </div>
                );

            default:
                return (
                    <input
                        {...commonProps}
                        type={field.type}
                        defaultValue={field.value?.toString() ?? ""}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                    />
                );
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
                relative
                w-full
                max-w-md
                overflow-hidden
                rounded-3xl
                border
                border-border
                bg-background/80
                backdrop-blur-xl
                shadow-2xl
                shadow-primary/10
                transition-all
                duration-500
            "
        >
            {/* Mesh */}
            <div
                className="
                    absolute inset-0
                    z-0
                    opacity-[0.08]
                    dark:opacity-[0.03]
                    pointer-events-none
                "
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Glow */}
            <div
                className="
                    absolute
                    top-0
                    left-1/2
                    -translate-x-1/2
                    w-64
                    h-64
                    bg-primary/15
                    dark:bg-primary/10
                    blur-[100px]
                    rounded-full
                    pointer-events-none
                "
            />

            {/* Content */}
            <div className="relative z-10 p-8 sm:p-10">
                {title && (
                    <div className="text-center mb-8">
                        <h2 className="
                            text-2xl
                            sm:text-3xl
                            font-bold
                            tracking-tight
                            text-foreground
                        ">
                            {title}
                        </h2>

                        <div className="mx-auto mt-3 w-12 h-1 rounded-full bg-primary" />
                    </div>
                )}

                <div className="flex flex-col gap-5">
                    {fields.map((field) => (
                        <div
                            key={field.name}
                            className="flex flex-col gap-2"
                        >
                            {field.type !== "checkbox" && (
                                <label
                                    htmlFor={field.name}
                                    className="
                                        text-sm
                                        font-semibold
                                        text-foreground
                                    "
                                >
                                    {field.label}

                                    {field.required && (
                                        <span className="ml-1 text-primary">
                                            *
                                        </span>
                                    )}
                                </label>
                            )}

                            {renderField(field)}

                            {field.description && (
                                <small className="
                                    text-xs
                                    text-muted-foreground
                                ">
                                    {field.description}
                                </small>
                            )}

                            {field.error && (
                                <span className="
                                    text-xs
                                    text-destructive
                                ">
                                    {field.error}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="
                        group
                        relative
                        w-full
                        mt-8
                        px-6
                        py-3.5
                        overflow-hidden
                        rounded-2xl
                        bg-primary
                        text-primary-foreground
                        font-bold
                        border
                        border-border
                        shadow-xl
                        shadow-primary/25
                        dark:shadow-primary/10
                        hover:scale-[1.02]
                        active:scale-[0.98]
                        transition-all
                        duration-300
                        cursor-pointer
                    "
                    disabled={disabled}
                >
                    <span className="relative z-10">
                        {submitText}
                    </span>

                    {/* Hover shine */}
                    <span className="
                        absolute
                        inset-0
                        rounded-2xl
                        bg-white/10
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-300
                    " />
                </button>
            </div>
        </form>
    );
}