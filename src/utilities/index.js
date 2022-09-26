const baseURL = "https://strangers-things.herokuapp.com/api/2206-pt-ftb-pt";

export const callApi = async ({ method, path, token, body }) => {
    const options = {
        method: method ? method : "GET",
        headers: {
            'Content-Type': "application/json",
        },
    };

    if(token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    if(body) {
        options.body = JSON.stringify(body)
    }

    const result = await fetch(baseURL + path, options);
    const data = await result.json();
    if (data.error) {
        throw data.error.message;
    } 
    return data.data
};

export const register = async (username, password) => {
    const result = await fetch(baseURL + "/users/register", {
    method: "POST",
    headers: { 
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user: {
        username,
        password,
        },
    }),
    })

    const { data } = await result.json()
    console.log('data :>> ', data);
    if (data.error) {
        throw data.error.message;
    }
    return data;
};

export const login = async (username, password) => {
    const result = await fetch(baseURL + "/users/login", {
    method: "POST",
    headers: { 
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user: {
        username,
        password,
        },
    }),
    })

    const { data } = await result.json()
    console.log('data :>> ', data);
    if (data.error) {
        throw data.error.message;
    }
    return data
};

export const fetchUser = async (token) => {
    const result = await fetch(baseURL + "/users/me", {
        headers: { 
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        },
        })
    
        const { data } = await result.json()
        console.log('data >>:', data)
        return data
}