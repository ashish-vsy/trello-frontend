import React, { useState } from "react";
import { addOrganization } from "../services/api.organization";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterOrg = () => {
  const navigate = useNavigate();
  const [orgName, setOrgName] = useState("");

  const handleRegister = () => {
    const reqbody = {
      orgname: orgName,
    };
    addOrganization(reqbody).then((res) => {
      if (res.status) {
        console.log(res.data);
        toast.success("Successfully registered!");
        sessionStorage.setItem("orgid", res.data?.id);
        navigate("/register");
      } else {
        toast.error(res.message);
        console.log("message");
      }
    });
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{
        background: "linear-gradient(to bottom, #2985ed, #A592E6, #F5A9E1, #FC85C5)",
      }}
    >
      <Toaster />
      <div className="p-10 w-3/5 max-w-lg bg-white rounded-xl shadow-xl">
        <h1 className="font-bold text-3xl text-center text-pink-600 mb-6">
          Register Organization
        </h1>
        <p className="text-center text-gray-600 mb-8">
         Register your organization to get started!
        </p>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Organization Name
          </label>
          <input
            type="text"
            placeholder="Enter your organization name"
            className="w-full px-4 py-3 rounded-lg text-gray-900 border focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleRegister}
            className="w-full py-3 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition"
          >
            Register Organization
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterOrg;
