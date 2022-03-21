import { useCallback, useState } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = "GET", body = null, headers = {'Content-Type' : 'application/json'}) => {
        setLoading(true);

        try {
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            const data = await response.json();
            console.log('1')
            setLoading(false);
            return data;
        } catch (err) {
            console.log('2')
            setLoading(false);
            setError(true);
            throw err;
        }
    }, [])

    const clearError = useCallback(() => setError(null), []);

    return {loading, error, request, clearError}
}