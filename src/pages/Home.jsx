import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import Kanban from '../components/Kanban';
import { GetUserByUserid } from '../services/api.user';

function Home() {
  const navigate = useNavigate();
  const [userData, setUserdata] = useState([]);
  const userid = sessionStorage.getItem('userid');

  useEffect(() => {
    if (!userid) {

      navigate('/login-org');
      return;
    }

    if (userid) {
      GetUserByUserid(userid).then((res) => {
        if (res.status) {
          setUserdata(res.data);
        } else {
          toast.error(res.message);
        }
      }).catch((error) => {
        toast.error("Failed to fetch user data.");
        console.error(error);
      });
    } else {
      toast.error("User ID missing. Please log in again.");
      sessionStorage.clear();
      navigate('/login-org');
    }
  }, [userid, navigate]);

  return (
    <div className='bg-neutral-900'>
      <Toaster />
      <Header userDetails={userData?.[0]} />
      <Kanban />
    </div>
  );
}

export default Home;
