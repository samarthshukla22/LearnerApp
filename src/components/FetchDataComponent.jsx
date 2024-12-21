import React, { useState, useEffect } from 'react';

function FetchData() {
  const [data, setData] = useState(null);      
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null);    // State to handle errors

  // URL from where the JSON data is fetched
  const url = 'https://api.sheetbest.com/sheets/294a20db-a558-4a87-bf32-70b91600c663'; // Replace with your actual JSON URL

  useEffect(() => {
    // Fetch data when the component mounts
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON data
      })
      .then((fetchedData) => {
        setData(fetchedData);  // Store the fetched data in state
        setLoading(false);      // Set loading state to false
      })
      .catch((err) => {
        setError(err);          // Handle any errors
        setLoading(false);      // Set loading state to false
      });
  }, []); // Empty dependency array to fetch data only once (on mount)

  if (loading) {
    return <div>Loading...</div>;  // Show loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error.message}</div>;  // Show error message if something goes wrong
  }


  const updateddata =JSON.stringify(data, null, 2);
  

  // Render the fetched data
  return (
    <div>
      <h1>Fetched JSON Data</h1>
      <pre>{updateddata}</pre>  {/* Format the JSON for easy viewing */}
    </div>
  );
}

export default FetchData;
