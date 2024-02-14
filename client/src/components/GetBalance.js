import React, { useState } from "react";

const GetBalance = ({ state }) => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  
  const getBalance = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    try {
      const { contract } = state;
      const balance = await contract.showBalance(); // Call the showBalance function
      setBalance(balance); // Update the balance state
      setError(null); // Reset error state if successful
    } catch (error) {
      console.error("Error getting balance:", error);
      setError(error.message); // Set error message
      setBalance(null); // Reset balance if error occurs
    }
  };

  return (
    <div>
      <form onSubmit={getBalance}>
        <button type="submit" style={{ margin: '10px' }}>Get Balance</button>
      </form>
      {balance !== null && <p>Balance: {balance.toString()}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default GetBalance;
