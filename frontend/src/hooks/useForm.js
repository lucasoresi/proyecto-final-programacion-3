import { useState } from 'react';

export function useForm(initialValues, validateOnChange = false, validate) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });

        if (validateOnChange && validate) {
            validate({ [name]: value });
        }
    };


    const validateForm = () => {
        if (!validate) return true;
        const validationErrors = validate(values);
        setErrors(validationErrors);
        // Retorna true si no hay errores
        return Object.keys(validationErrors).length === 0;
    };


    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleChange,
        validateForm,
        resetForm,
    };
}
