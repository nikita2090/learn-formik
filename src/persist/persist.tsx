import * as React from 'react';
import { FormikProps, connect } from 'formik';
import debounce from 'lodash.debounce';
import isEqual from 'react-fast-compare';

export interface PersistProps {
    name: string;
    debounce?: number;
    isSessionStorage?: boolean;
}

class PersistImpl extends React.Component<
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    PersistProps & { formik: FormikProps<any> },
    // eslint-disable-next-line @typescript-eslint/ban-types
    {}
> {
    static defaultProps = {
        debounce: 300,
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    saveForm = debounce((data: FormikProps<{}>) => {
        if (this.props.isSessionStorage) {
            window.sessionStorage.setItem(
                this.props.name,
                JSON.stringify(data)
            );
        } else {
            window.localStorage.setItem(this.props.name, JSON.stringify(data));
        }
    }, this.props.debounce);

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    componentDidUpdate(prevProps: PersistProps & { formik: FormikProps<any> }) {
        if (!isEqual(prevProps.formik, this.props.formik)) {
            this.saveForm(this.props.formik);
        }
    }

    componentDidMount() {
        const maybeState = this.props.isSessionStorage
            ? window.sessionStorage.getItem(this.props.name)
            : window.localStorage.getItem(this.props.name);
        if (maybeState) {
            this.props.formik.setFormikState(JSON.parse(maybeState));
        }
    }

    render() {
        return null;
    }
}

export const Persist = connect<PersistProps, any>(PersistImpl);
