
import { useState, useEffect } from 'react';

export function useFetch(url, options) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            try {
                const res = await fetch(url, options);
                if (!res.ok) throw new Error('Error en la petición');
                const json = await res.json();
                if (isMounted) setData(json);
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url]);

    return { data, loading, error };
}
