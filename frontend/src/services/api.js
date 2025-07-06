const API_URL = 'http://localhost:4000/api'; // Ajustar el puerto y base URL según backend

async function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem('token');
    const headers = options.headers || {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch(API_URL + url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error en la API');
    }
    return res.json();
}

// Proyectos
export async function getProjects() {
    return fetchWithToken('/projects');
}

export async function getProjectBySlug(slug) {
    return fetchWithToken(`/projects/${slug}`);
}

export async function createProject(data) {
    return fetchWithToken('/projects', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updateProject(id, data) {
    return fetchWithToken(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deleteProject(id) {
    return fetchWithToken(`/projects/${id}`, {
        method: 'DELETE',
    });
}

// Auth
export async function registerUser(data) {
    const res = await fetch(API_URL + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error en el registro');
    }
    return res.json();
}

export async function loginUser(data) {
    const res = await fetch(API_URL + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error en el login');
    }
    return res.json();
}

export async function getMe() {
    return fetchWithToken('/auth/me');
}

export async function logoutUser() {
    return fetchWithToken('/auth/logout', {
        method: 'POST',
    });
}
