import React, { useState, useEffect } from 'react';
import Rewards from "./Rewards"
import logo from './logo.svg';
import './App.css';

const baseUrl = "https://mock-api-f62d8fa759ff.herokuapp.com/api";

function App() {
  const [customers, setCustomers] = useState([]);
  const customersUrl = `${baseUrl}/customers`;


  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch(customersUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setCustomers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  return (
    <div className="App">
      <h1>Christmas Customer Rewards 2022</h1>

      <header className="Table-display">
      <ul>
        {customers.map((customer) => (
            <li key={customer.id}>
              <Rewards object={customer}/></li>
        ))}
      </ul>
      </header>
    </div>
  );
}

export default App;
