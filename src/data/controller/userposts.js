import { useState, useEffect } from 'react';
import { fetchUserPosts } from '../get/userpost';

const UserProfilePosts = ({userId, token, onDataLoaded }) => {
    const [userPost, setUserPostData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchUserPosts(userId, token);
          console.log('Fetched user data:', data);
          setUserPostData(data);
          onDataLoaded(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchData();
    }, [userId, token]);
  
  };
export default UserProfilePosts;
