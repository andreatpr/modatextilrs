const fetchUserPosts = async (userId, token) => {
    try {
      const response = await fetch(`http://20.81.181.186:5000/api/posts/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user posts:', error);
      throw error;
    }
  };
  
  export { fetchUserPosts };
  