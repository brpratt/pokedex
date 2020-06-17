import { useEffect, useState } from "react";

type FetchResult<T> =
    | { isLoading: true }
    | { isLoading: false, isError: true }
    | { isLoading: false, isError: false, data: T }

export function useFetch<T>(url: string): FetchResult<T> {
    const [result, setResult] = useState<FetchResult<T>>({isLoading: true});

    useEffect(() => {
        async function startFetch() {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    setResult({isLoading: false, isError: true});
                    
                    return;
                }

                const data = await response.json() as T;
    
                setResult({isLoading: false, isError: false, data});
            } catch {
                setResult({isLoading: false, isError: true});

                return;
            }
        }

        startFetch();
    }, [url]);

    return result;
}
