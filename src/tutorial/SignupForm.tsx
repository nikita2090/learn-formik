import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Input from './Input';
import Checkbox from './Checkbox';

const SignupForm: React.FC = () => {
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
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
            })}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
            }}
        >
            <Form>
                <Input
                    label="First Name"
                    fieldConfig={{
                        name: 'firstName',
                        type: 'text',
                    }}
                />

                <Input
                    label="Last Name"
                    fieldConfig={{
                        name: 'lastName',
                        type: 'text',
                    }}
                />

                <Input
                    label="Email"
                    fieldConfig={{
                        name: 'email',
                        type: 'text',
                    }}
                />

                <Checkbox fieldConfig={{ name: 'accept' }}>123</Checkbox>

                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

export default SignupForm;
