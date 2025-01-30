
const api_route = import.meta.env.VITE_API_ROUTE;

export const LoginAPI = (reqbody) => {
    const url = `${api_route}/user/login`;
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqbody),
    };
    return fetch(url, fetchOptions)
        .then((response) => 
            response.json().then(retured_res => {
              console.log(response, 'retured_res');
                if (response.status !== 200) {
                  console.log('im here', response.status);
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

export const SignUp = (reqbody) => {
    const url = `${api_route}/user/signup`;
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqbody),
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



export const GetUserByUserid = (userid) => {
    const url = `${api_route}/user/${userid}`;
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
            return { status: 1, data: retured_res.data };
        })
    )
    .catch((error) => {
        console.error(error);
        return { status: 0, message: error.message };
    });
};

export const getAllUsers = () => {
   const orgid = sessionStorage.getItem('orgid');
    const url = `${api_route}/user?orgid=${orgid}`;
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
                return { status: 1, data: retured_res.data };
            })
        )
        .catch((error) => {
            console.error(error);
            return { status: 0, message: error.message };
        });
};

export const UpdateUserByUserid = (userid, reqbody) => {
    const url = `${api_route}/user/${userid}`;
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqbody),
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

export const ChangePassword = (userid, reqbody) => {
    const url = `${api_route}/user/password/${userid}`;
    const fetchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqbody),
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

export const DeleteUser = (userid) => {
    const url = `${api_route}/user/${userid}`;
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
                return { status: 1, data: retured_res.data };
            })
        )
        .catch((error) => {
            console.error(error);
            return { status: 0, message: error.message };
        });
};



