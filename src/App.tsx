import React from 'react';
import SignupForm from './tutorial/SignupForm';

import styles from './App.module.scss';

const App: React.FC = () => (
    <div className={styles.wrap}>
        <h1>Hello formik!</h1>
        <SignupForm />
    </div>
);

export default App;
