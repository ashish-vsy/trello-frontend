const api_route = "http://localhost:4000/api";
export const CreateTask = (reqbody) => {
    const url = `${api_route}/task/add`;
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(url, fetchOptions)
      .then((response) =>
        response.json().then(retured_res => {
            if (response.status === 400) {
                return { status: 0, message: retured_res.message };
            }
            return { status: 1, message: retured_res.message };
        })
      )
      .catch((error) => {
          console.error(error);
          return { status: 0, message: error.message };
      });
};

export const GetTaskDetailsByTaskid = (taskid) => {
    const url = `${api_route}/task/${taskid}`;
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    return fetch(url, fetchOptions)
    .then((response) =>
        response.json().then(retured_res => {
            if (response.status === 400) {
                return { status: 0, message: retured_res.message };
            }
            return { status: 1, message: retured_res.message };
        })
      )
        .catch((error) => {
            console.log(error);
            return { status: 0, msg: error.message };
        });
};



export const UpdateTasksbyTaskid = (taskid, reqbody) => {
    const url = `${api_route}/task/${taskid}`;
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(url, fetchOptions)
    .then((response) =>
        response.json().then(retured_res => {
            if (response.status === 400) {
                return { status: 0, message: retured_res.message };
            }
            return { status: 1, message: retured_res.message };
        })
      )
        .catch((error) => {
            console.log(error);
            return { status: 0, msg: error.message };
        });
};

export const AssignTask = (reqbody) => {
    console.log(reqbody, 'making ass casll');
    const url = `${api_route}/task/assign`;
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(url, fetchOptions)
    .then((response) =>
        response.json().then(retured_res => {
            if (response.status === 400) {
                return { status: 0, message: retured_res.message };
            }
            return { status: 1, message: retured_res.message };
        })
      )
        .catch((error) => {
            console.log(error);
            return { status: 0, msg: error.message };
        });
};

export const DeleteTask = (taskid) => {
    const url = `${api_route}/task/${taskid}`;
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    return fetch(url, fetchOptions)
    .then((response) =>
        response.json().then(retured_res => {
            if (response.status === 400) {
                return { status: 0, message: retured_res.message };
            }
            return { status: 1, message: retured_res.message };
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
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    return fetch(url, fetchOptions)
      .then((response) =>
        response.json().then(retured_res => {
            if (response.status === 400) {
                return { status: 0, message: retured_res.message };
            }
            return { status: 1, data: retured_res };
        })
      )
      .catch((error) => {
          console.error(error);
          return { status: 0, message: error.message };
      });
}


export const getAssignedUsersByTaskId = (taskid) => {
    const url = `${api_route}/task/assign/${taskid}`;
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    return fetch(url, fetchOptions)
      .then((response) =>
        response.json().then(retured_res => {
            if (response.status === 400) {
                return { status: 0, message: retured_res.message };
            }
            return { status: 1, data: retured_res };
        })
      )
      .catch((error) => {
          console.error(error);
          return { status: 0, message: error.message };
      });
}