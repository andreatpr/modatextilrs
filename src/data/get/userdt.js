const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`https://administrador.modatextil.store/api/users/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
};
  
  export { fetchUserData };
