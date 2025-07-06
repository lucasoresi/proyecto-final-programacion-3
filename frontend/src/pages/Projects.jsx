import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/ui/Spinner.jsx';
import { useFetch } from '../hooks/useFetch';

export default function Projects() {
    const { data: projects, loading, error } = useFetch('/api/projects');

    if (loading) return <Spinner />;
    if (error) return <p>Error cargando proyectos</p>;

    return (
        <div className="page-container">
            <h2>Proyectos</h2>
            {(!projects || projects.length === 0) ? (
                <p>No hay proyectos disponibles.</p>
            ) : (
                <ul>
                    {projects.map((project) => (
                        <li key={project.id}>
                            <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
