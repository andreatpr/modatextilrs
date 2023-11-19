import { useState, useEffect } from 'react';
import { fetchUserData } from '../get/userdt';

const UserProfileContainer = ({ userId, onDataLoaded }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData(userId);
        console.log('Fetched user data:', data);
        setUserData(data);
        onDataLoaded(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId]);

};

export default UserProfileContainer;