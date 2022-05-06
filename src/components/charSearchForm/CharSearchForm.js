import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import useApiRequestService from '../../services/ApiRequestService';
import { ErrorMessage } from 'formik';

import './CharSearchForm.scss';

const CharSearchForm = () => {
    const [char, setChar] = useState('');
    const [link, setCharLink] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useApiRequestService();

    const findCharacter = (name) => {
        clearError();
        getCharacterByName(name)
        .then(res => {
            console.log(res)
            const charName = res.length !== 0 ? res[0].name : null;
            const charLink = res.length !== 0 ? '/characters/' + res[0].id : null;
            setChar(charName);
            setCharLink(charLink);
        });
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const searchResult = char === '' ? null : char !== null ? 
                        <div className="char__search-wrapper">
                            <div className="char__search-success">There is! Visit {char} page?</div>
                            <Link to={link} className="button button__secondary">
                                <div className="inner">To page</div>
                            </Link>
                        </div> :
                        <div className="char__search-error">
                            The character was not found. Check the name and try again
                        </div>;
    
    return (
        <div className="char__search-form">
            <Formik
                initialValues={{name: ''}}
                validationSchema={Yup.object({
                    name: Yup.string().required('Required!').min(2, '2 symbols min')
                })}
                onSubmit={(values, {resetForm}) => {
                    findCharacter(values.name);
                    resetForm();
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter name"
                        />
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={loading}
                        >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="name"/>
                </Form>
            </Formik>
                {errorMessage}
                {searchResult}
        </div>
    )
};

export default CharSearchForm;