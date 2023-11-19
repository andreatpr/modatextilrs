const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://20.81.181.186:5000/api/users/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
};
  
  export { fetchUserData };