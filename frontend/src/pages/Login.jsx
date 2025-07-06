import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import { useForm } from '../hooks/useForm';

export default function Login({ onLogin }) {
    const navigate = useNavigate();
    const { values, handleChange, errors, setErrors } = useForm({ email: '', password: '' });

    const [error, setError] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({ email: values.email, password: values.password });
            if (data.token) {
                localStorage.setItem('token', data.token);
                onLogin(data.user);
                navigate('/');
            } else {
                setError(data.message || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Credenciales inválidas');
        }
    };

    return (
        <div className="page-container">
            <h2>Iniciar Sesión</h2>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit}>
                <Input label="Email" type="email" value={values.email} onChange={handleChange} name="email" required />
                <Input label="Contraseña" type="password" value={values.password} onChange={handleChange} name="password" required />
                <Button type="submit">Entrar</Button>
            </form>
        </div>
    );
}
