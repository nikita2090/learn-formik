import React from 'react';
import { FieldHookConfig, useField } from 'formik';

interface Props {
    label: string;
    fieldConfig: FieldHookConfig<string>;
    className?: string;
}

const Field: React.FC<Props> = ({ label, fieldConfig, className }) => {
    const [field, meta] = useField(fieldConfig);
    return (
        <div>
            <label htmlFor={fieldConfig.id || fieldConfig.name}>{label}</label>
            <input
                className={className}
                {...field}
                type={fieldConfig.type}
                placeholder={fieldConfig.placeholder}
            />
            {meta.touched && meta.error ? (
                <span className="error">{meta.error}</span>
            ) : null}
        </div>
    );
};

export default Field;
