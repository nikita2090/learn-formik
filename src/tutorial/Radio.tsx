import React from 'react';
import { FieldHookConfig, useField } from 'formik';

interface Props {
    className?: string;
    children: React.ReactNode;
    fieldConfig: FieldHookConfig<string>;
}

const Radio: React.FC<Props> = ({ className, children, fieldConfig }) => {
    const [field, meta] = useField({ ...fieldConfig, type: 'radio' });
    return (
        <div>
            <label>
                <input className={className} type="radio" {...field} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default Radio;
