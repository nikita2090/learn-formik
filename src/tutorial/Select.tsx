import React from 'react';
import { FieldHookConfig, useField } from 'formik';

interface Props {
    label?: string;
    className?: string;
    fieldConfig: FieldHookConfig<string>;
    children: React.ReactNode;
}

const Select: React.FC<Props> = ({
    label,
    className,
    fieldConfig,
    children,
}) => {
    const [field, meta] = useField(fieldConfig);
    return (
        <div>
            {label && (
                <label htmlFor={fieldConfig.id || fieldConfig.name}>
                    {label}
                </label>
            )}
            <select {...field}>{children}</select>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default Select;
