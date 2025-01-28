const api_route = "http://localhost:5000/api";
export const CreateTask = (reqbody) => {
    const JWT = sessionStorage.getItem('token');
    const url = `${api_route}/task/add`;
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JWT}`
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(url, fetchOptions)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error);
            return { status: 0, msg: error.message };
        });
};

export const GetTaskDetailsByTaskid = (taskid) => {
    const JWT = sessionStorage.getItem('token');
    const url = `${api_route}/task/${taskid}`;
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JWT}`
        },
    };
    return fetch(url, fetchOptions)
        .then((response) => {
            if (response.status === 401) {
                sessionStorage.clear();
                return { status: 0, msg: "Session Expired! Login again" };
            }
            return response.json();
        })
        .catch((error) => {
            console.log(error);
            return { status: 0, msg: error.message };
        });
};

export const SearchTasks = (query = '') => {
    // const JWT = sessionStorage.getItem('token');
    // const url = `${api_route}/task/search/query?${query}`;
    // const fetchOptions = {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${JWT}`
    //     },
    // };
    // return fetch(url, fetchOptions)
    //     .then((response) => {
    //         if (response.status === 401) {
    //             sessionStorage.clear();
    //             return { status: 0, msg: "Session Expired! Login again" };
    //         }
    //         return response.json();
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         return { status: 0, msg: error.message };
    //     });
};

export const UpdateTasksbyTaskid = (taskid, reqbody) => {
    const JWT = sessionStorage.getItem('token');
    const url = `${api_route}/task/${taskid}`;
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JWT}`
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(url, fetchOptions)
        .then((response) => {
            if (response.status === 401) {
                sessionStorage.clear();
                return { status: 0, msg: "Session Expired! Login again" };
            }
            return response.json();
        })
        .catch((error) => {
            console.log(error);
            return { status: 0, msg: error.message };
        });
};

export const AssignTask = (taskid, reqbody) => {
    // const JWT = sessionStorage.getItem('token');
    // const url = `${api_route}/task/assign/${taskid}`;
    // const fetchOptions = {
    //     method: "PATCH",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${JWT}`
    //     },
    //     body: JSON.stringify(reqbody)
    // };
    // return fetch(url, fetchOptions)
    //     .then((response) => {
    //         if (response.status === 401) {
    //             sessionStorage.clear();
    //             return { status: 0, msg: "Session Expired! Login again" };
    //         }
    //         return response.json();
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         return { status: 0, msg: error.message };
    //     });
};

export const DeleteTask = (taskid) => {
    const JWT = sessionStorage.getItem('token');
    const url = `${api_route}/task/${taskid}`;
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JWT}`
        },
    };
    return fetch(url, fetchOptions)
        .then((response) => {
            if (response.status === 401) {
                sessionStorage.clear();
                return { status: 0, msg: "Session Expired! Login again" };
            }
            return response.json();
        })
        .catch((error) => {
            console.log(error);
            return { status: 0, msg: error.message };
        });
};
