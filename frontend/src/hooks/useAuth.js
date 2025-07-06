
import { useState, useEffect } from 'react';
import { getMe, logoutUser } from '../services/api';

export function useAuth() {
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

    const logout = () => {
        logoutUser();
        localStorage.removeItem('token');
        setUser(null);
    };

    return { user, setUser, loadingUser, logout };
}
