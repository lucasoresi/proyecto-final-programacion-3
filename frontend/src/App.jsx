import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import './assets/button.css';
import './assets/navbar-footer.css';
import './assets/styles.css';
import { getMe, logoutUser } from './services/api';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import CreateProject from './pages/CreateProject.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }
    fetchUser();
  }, []);

  function handleLogout() {
    logoutUser();
    localStorage.removeItem('token');
    setUser(null);
  }

  if (loadingUser) return <p>Cargando...</p>;

  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', backgroundColor: '#20232a', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
        {user ? (
          <>
            <span>Hola, {user.name}</span>
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', marginRight: '1rem', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route
          path="/create"
          element={user ? <CreateProject /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login onLogin={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register onRegister={setUser} /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
