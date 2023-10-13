import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WaiterProfile = () => {
  const baseURL = 'http://127.0.0.1:8000';
  const [waiter, setWaiter] = useState(null);

  useEffect(() => {
    const fetchWaiterProfile = async () => {
      try {
        const response = await axios.get(`${baseURL}/waiter/profile`);
        setWaiter(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWaiterProfile();
  }, []);

  return (
    <div>
      {waiter ? (
        <div>
          <h2>{waiter.name}</h2>
          <p>{waiter.email}</p>
          <p>{waiter.phone}</p>
        </div>
      ) : (
        <p>Loading waiter profile...</p>
      )}
    </div>
  );
};

export default WaiterProfile;
