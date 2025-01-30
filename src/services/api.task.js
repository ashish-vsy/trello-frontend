
const api_route = import.meta.env.VITE_API_ROUTE;

export const CreateTask = (reqbody) => {
    const JWT = sessionStorage.getItem('token');
    const url = `${api_route}/task/add`;
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(url, fetchOptions)
      .then((response) =>
        response.json().then(returned_res => {
            if (response.status === 400) {
                return { status: 0, message: returned_res.message };
            }
            return { status: 1, message: returned_res.message };
        })
      )
      .catch((error) => {
          console.error(error);
          return { status: 0, message: error.message };
      });
};

export const GetTaskDetailsByTaskid = (taskid) => {
    const JWT = sessionStorage.getItem('token');
    const url = `${api_route}/task/${taskid}`;
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
        },
    };
    return fetch(url, fetchOptions)
    .then((response) =>
        response.json().then(returned_res => {
            if (response.status === 400) {
                return { status: 0, message: returned_res.message };
            }
            return { status: 1, message: returned_res.message };
        })
      )
        .catch((error) => {
            console.log(error);
            return { status: 0, msg: error.message };
        });
};



export const UpdateTasksbyTaskid = (taskid, reqbody) => {
    const JWT = sessionStorage.getItem('token');
    const url = `${api_route}/task/${taskid}`;
    
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(url, fetchOptions)
    .then((response) =>
        response.json().then(returned_res => {
            if (response.status === 400) {
                return { status: 0, message: returned_res.message };
            }
            return { status: 1, message: returned_res.message };
        })
      )
        .catch((error) => {
            console.log(error);
            return { status: 0, msg: error.message };
        });
};

export const AssignTask = (reqbody) => {
    const JWT = sessionStorage.getItem('token');
    const url = `${api_route}/task/assign`;
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(url, fetchOptions)
    .then((response) =>
        response.json().then(returned_res => {
            if (response.status === 400) {
                return { status: 0, message: returned_res.message };
            }
            return { status: 1, message: returned_res.message };
        })
      )
        .catch((error) => {
            console.log(error);
            return { status: 0, msg: error.message };
        });
};

export const DeleteTask = (taskid) => {
    const JWT = sessionStorage.getItem('token');
    const url = `${api_route}/task/${taskid}`;
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
        },
    };
    return fetch(url, fetchOptions)
    .then((response) =>
        response.json().then(returned_res => {
            if (response.status === 400) {
                return { status: 0, message: returned_res.message };
            }
            return { status: 1, message: returned_res.message };
        })
      )
        .catch((error) => {
            console.log(error);
            return { status: 0, msg: error.message };
        });
};

export const getAllTasks = () => {
    const orgid = sessionStorage.getItem('orgid');
    const url = `${api_route}/task/org/${orgid}`;
    const JWT = sessionStorage.getItem('token');
    console.log(JWT, "JWT");
    
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
        },
    };
    return fetch(url, fetchOptions)
      .then((response) =>
        response.json().then(returned_res => {
            if (response.status === 400) {
                return { status: 0, message: returned_res.message };
            }
            return { status: 1, data: returned_res };
        })
      )
      .catch((error) => {
          console.error(error);
          return { status: 0, message: error.message };
      });
}


export const getAssignedUsersByTaskId = (taskid) => {
    const url = `${api_route}/task/assign/${taskid}`;
    const JWT = sessionStorage.getItem('token');
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
        },
    };
    return fetch(url, fetchOptions)
      .then((response) =>
        response.json().then(returned_res => {
            if (response.status === 400) {
                return { status: 0, message: returned_res.message };
            }
            return { status: 1, data: returned_res };
        })
      )
      .catch((error) => {
          console.error(error);
          return { status: 0, message: error.message };
      });
}