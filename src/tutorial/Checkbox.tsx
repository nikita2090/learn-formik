import React from 'react';
import { FieldHookConfig, useField } from 'formik';

interface Props {
    children: React.ReactNode;
    fieldConfig: FieldHookConfig<string>;
    className?: string;
}

const Checkbox: React.FC<Props> = ({ children, fieldConfig, className }) => {
    const [field, meta] = useField({ ...fieldConfig, type: 'checkbox' });
    return (
        <div>
            <label>
                <input className={className} type="checkbox" {...field} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default Checkbox;
