const api_route = "http://localhost:5000/api";
export const getOrganizationById = (orgId) => {
    // const JWT = sessionStorage.getItem('token');
    const url = `${api_route}/organization/${orgId}`;
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JWT}`,
        },
    };
    return fetch(url, fetchOptions)
        .then((response) => 
            response.json().then(retured_res => {
                if (response.status === 400) {
                    return { status: 0, message: retured_res.message };
                }
                return { status: 1, data: retured_res.data };
            })
        )
        .catch((error) => {
            console.error(error);
            return { status: 0, message: error.message };
        });
};

export const addOrganization = (reqBody) => {
    const url = `${api_route}/organization/add`;
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
    };
    return fetch(url, fetchOptions)
        .then((response) => 
            response.json().then(retured_res => {
                if (response.status === 400) {
                    return { status: 0, message: retured_res.message };
                }
                return { status: 1, data: retured_res.data };
            })
        )
        .catch((error) => {
            console.error(error);
            return { status: 0, message: error.message };
        });
};

export const updateOrganization = (orgId, reqBody) => {
    // const JWT = sessionStorage.getItem('token');
    const url = `${api_route}/organization/${orgId}`;
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JWT}`,
        },
        body: JSON.stringify(reqBody),
    };
    return fetch(url, fetchOptions)
        .then((response) => 
            response.json().then(retured_res => {
                if (response.status === 400) {
                    return { status: 0, message: retured_res.message };
                }
                return { status: 1, data: retured_res.data };
            })
        )
        .catch((error) => {
            console.error(error);
            return { status: 0, message: error.message };
        });
};

export const verifyOrganization = (reqBody) =>{
    const url = `${api_route}/organization/verify`;
    
}
