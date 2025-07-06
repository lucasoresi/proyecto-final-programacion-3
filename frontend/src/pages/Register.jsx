import React from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import { useForm } from '../hooks/useForm';

export default function Register({ onRegister }) {
    const navigate = useNavigate();
    const { values, handleChange, errors, setErrors } = useForm({ name: '', email: '', password: '' });

    const [error, setError] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser({ name: values.name, email: values.email, password: values.password });
            if (data.token) {
                localStorage.setItem('token', data.token);
                onRegister(data.user);
                navigate('/');
            } else {
                setError(data.message || 'Error al registrarse');
            }
        } catch (err) {
            setError('Registro inválido');
        }
    };

    return (
        <div className="page-container">
            <h2>Registrarse</h2>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit}>
                <Input label="Nombre" value={values.name} onChange={handleChange} name="name" required />
                <Input label="Email" type="email" value={values.email} onChange={handleChange} name="email" required />
                <Input label="Contraseña" type="password" value={values.password} onChange={handleChange} name="password" required />
                <Button type="submit">Crear cuenta</Button>
            </form>
        </div>
    )
}