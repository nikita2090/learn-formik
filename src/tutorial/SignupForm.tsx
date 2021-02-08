import React from 'react';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

import Input from './Input';
import Checkbox from './Checkbox';
import Radio from './Radio';
import Select from './Select';

interface IForm {
    firstName: string;
    lastName: string;
    sex: string;
    music: never[];
    jobType: string;
    email: string;
    accept: boolean;
}

const SignupForm: React.FC = () => {
    const handleNameChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        formik: FormikProps<IForm>
    ) => {
        formik.setFieldValue('firstName', e.target.value);
        console.log(e.target.value);
    };

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                sex: '',
                music: [],
                jobType: '',
                email: '',
                accept: false,
            }}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                lastName: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                accept: Yup.boolean()
                    .required('Required')
                    .oneOf([true], 'You must accept the terms and conditions.'),
                jobType: Yup.string()
                    .oneOf(
                        ['designer', 'development', 'product', 'other'],
                        'Invalid Job Type'
                    )
                    .required('Required'),
            })}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {(formik) => (
                <Form>
                    <Input
                        label="First Name"
                        fieldConfig={{
                            name: 'firstName',
                            type: 'text',
                        }}
                        onChange={(e) => handleNameChange(e, formik)}
                    />

                    <Input
                        label="Last Name"
                        fieldConfig={{
                            name: 'lastName',
                            type: 'text',
                        }}
                    />
                    <p>What is your sex?</p>
                    <Radio fieldConfig={{ name: 'sex', value: 'male' }}>
                        Male
                    </Radio>
                    <Radio fieldConfig={{ name: 'sex', value: 'female' }}>
                        Female
                    </Radio>

                    <p>What type of music do you listen?</p>
                    <Checkbox fieldConfig={{ name: 'music', value: 'Rock' }}>
                        Rock
                    </Checkbox>
                    <Checkbox fieldConfig={{ name: 'music', value: 'Classic' }}>
                        Classic
                    </Checkbox>
                    <Checkbox fieldConfig={{ name: 'music', value: 'Jazz' }}>
                        Jazz
                    </Checkbox>

                    <Select label="Job Type" fieldConfig={{ name: 'jobType' }}>
                        <option value="" disabled>
                            Select a job type
                        </option>
                        <option value="designer">Designer</option>
                        <option value="development">Developer</option>
                        <option value="product">Product Manager</option>
                        <option value="other">Other</option>
                    </Select>

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

                    <button type="submit" onClick={formik.handleReset}>
                        Reset
                    </button>
                    <button
                        disabled={!(formik.isValid && formik.dirty)}
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
