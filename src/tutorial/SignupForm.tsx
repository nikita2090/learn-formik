import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

import Input from './components/Input';
import Checkbox from './components/Checkbox';
import Radio from './components/Radio';
import Select from './components/Select';

import { MUSIC_TYPES, SEX } from './constants';

const validationSchema = Yup.object({
    firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    sex: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    accept: Yup.boolean()
        .required('Required')
        .oneOf([true], 'You must accept the terms and conditions.'),
    jobType: Yup.string()
        .oneOf(
            ['designer', 'development', 'product', 'other'],
            'Invalid Job Type'
        )
        .required('Required'),
});

const SignupForm: React.FC = () => {
    const handleNameChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (
            field: string,
            value: string,
            shouldValidate?: boolean | undefined
        ) => void
    ) => {
        setFieldValue('firstName', e.target.value);
        console.log(e.target.value);
    };

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                sex: 'female',
                music: [],
                jobType: '',
                pets: ['cat'],
                email: '',
                accept: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 1000);
            }}
        >
            {({
                values,
                dirty,
                isValid,
                isSubmitting,
                handleReset,
                setFieldValue,
            }) => (
                <Form>
                    <Input
                        label="First Name"
                        fieldConfig={{
                            name: 'firstName',
                            type: 'text',
                        }}
                        onChange={(e) => handleNameChange(e, setFieldValue)}
                    />
                    <Input
                        label="Last Name"
                        fieldConfig={{
                            name: 'lastName',
                            type: 'text',
                        }}
                    />

                    <p>What is your sex?</p>
                    {SEX.map(({ name, value, label, id }) => (
                        <Radio fieldConfig={{ name, value }} key={id}>
                            {label}
                        </Radio>
                    ))}

                    <p>What type of music do you listen?</p>
                    {MUSIC_TYPES.map(({ name, value, label, id }) => (
                        <Checkbox fieldConfig={{ name, value }} key={id}>
                            {label}
                        </Checkbox>
                    ))}

                    <Select label="Job Type" fieldConfig={{ name: 'jobType' }}>
                        <option value="" disabled>
                            Select a job type
                        </option>
                        <option value="designer">Designer</option>
                        <option value="development">Developer</option>
                        <option value="product">Product Manager</option>
                        <option value="other">Other</option>
                    </Select>

                    <FieldArray
                        name="pets"
                        render={(arrayHelpers) => (
                            <div>
                                {values.pets && values.pets.length > 0 ? (
                                    values.pets.map((pet, index) => (
                                        <div key={index}>
                                            <Input
                                                fieldConfig={{
                                                    name: `pets.${index}`,
                                                    type: 'text',
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    arrayHelpers.remove(index)
                                                }
                                            >
                                                -
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    arrayHelpers.insert(
                                                        index + 1,
                                                        ''
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.push('')}
                                    >
                                        Add a pet
                                    </button>
                                )}
                            </div>
                        )}
                    />

                    <Input
                        label="Email"
                        fieldConfig={{
                            name: 'email',
                            type: 'email',
                        }}
                    />

                    <Checkbox fieldConfig={{ name: 'accept' }}>
                        I accept the terms and conditions
                    </Checkbox>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button
                        disabled={!(isValid && dirty) || isSubmitting}
                        type="submit"
                    >
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default SignupForm;
