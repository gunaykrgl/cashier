export async function isAuthenticated(): Promise<boolean> {
    const res = await fetch('http://localhost:9000/auth/validate-token', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' // Include cookies in the request
    });

    return res.status === 200 ? true : false;
}


