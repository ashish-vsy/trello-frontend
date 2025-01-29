import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import Kanban from '../components/Kanban';
import { GetUserByUserid } from '../services/api.user';

function Home() {
  const navigate = useNavigate();
  const [userData, setUserdata] = useState({});
  const userid = sessionStorage.getItem('userid');
  const orgid = sessionStorage.getItem('orgid');

  useEffect(() => {
    if (!userid || !orgid || userid === 'undefined' || orgid === 'undefined') {
      navigate('/login');
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
      navigate('/login');
    }
  }, [userid, navigate]);

  return (
    <div className='bg-neutral-900'>
      <Toaster />
      <Navbar userDetails={userData} />
      <Kanban />
    </div>
  );
}

export default Home;
