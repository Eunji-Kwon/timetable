// api.js
export const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5096/api/schedule/301306237');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;  // Re-throw the error to be handled in the component
    }
  };
  