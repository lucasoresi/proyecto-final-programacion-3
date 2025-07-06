import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../services/api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import { useForm } from '../hooks/useForm';

export default function CreateProject() {
    const navigate = useNavigate();
    const { values, handleChange, errors, setErrors, resetForm } = useForm({ title: '', description: '' });

    const [error, setError] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProject({ title: values.title, description: values.description });
            resetForm();
            navigate('/');
        } catch (err) {
            setError('Error al crear proyecto');
        }
    };

    return (
        <div className="page-container">
            <h2>Crear Proyecto</h2>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit}>
                <Input label="Título" value={values.title} onChange={handleChange} name="title" required />
                <Input label="Descripción" value={values.description} onChange={handleChange} name="description" required />
                <Button type="submit">Crear</Button>
            </form>
        </div>
    );
}
