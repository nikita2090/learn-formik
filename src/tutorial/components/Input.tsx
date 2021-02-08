import React from 'react';
import { FieldHookConfig, useField } from 'formik';

interface Props {
    label?: string;
    fieldConfig: FieldHookConfig<string>;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<Props> = ({
    label,
    fieldConfig,
    className,
    onChange,
}) => {
    const [field, meta] = useField(fieldConfig);
    return (
        <div>
            {label && (
                <label htmlFor={fieldConfig.id || fieldConfig.name}>
                    {label}
                </label>
            )}
            <input
                className={className}
                {...field}
                type={fieldConfig.type}
                placeholder={fieldConfig.placeholder}
                onChange={onChange ? onChange : field.onChange}
            />
            {meta.touched && meta.error ? (
                <span className="error">{meta.error}</span>
            ) : null}
        </div>
    );
};

export default Field;
