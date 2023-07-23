import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const successNotification = () => {
  const handleNotification = () => {
    toast.success('This is a success notification!', {
      position: "top-right",
      autoClose: 3000, // Notification will close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      <button onClick={handleNotification}>Show Notification</button>
    </div>
  );
};

export default successNotification ;
