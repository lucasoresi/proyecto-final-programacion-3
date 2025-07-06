import React from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/ui/Spinner.jsx';
import { useFetch } from '../hooks/useFetch';

export default function ProjectDetail() {
    const { slug } = useParams();
    const { data: project, loading, error } = useFetch(`/api/projects/${slug}`);

    if (loading) return <Spinner />;
    if (error) return <p>Error cargando detalle</p>;
    if (!project) return <p>Proyecto no encontrado</p>;

    return (
        <div className="page-container">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            {project.technologies && (
                <p><strong>Tecnologías:</strong> {project.technologies.join(', ')}</p>
            )}
        </div>
    );
}