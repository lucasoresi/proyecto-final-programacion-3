import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
    return (
        <nav>
            <Link to="/">Inicio</Link>
            {user ? (
                <>
                    <Link to="/create">Crear Proyecto</Link>
                    <span>Hola, {user.name}</span>
                    <button onClick={onLogout}>Cerrar sesión</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
}
