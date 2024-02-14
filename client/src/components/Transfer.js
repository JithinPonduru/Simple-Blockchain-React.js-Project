import React, { useState } from "react";

const Transfer = ({ state }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const transferToZithin = async (e) => {
    e.preventDefault();
    try {
      const { contract } = state;
      const transaction = await contract.transferToZithin(); // Correct invocation
      await transaction.wait();
      setSuccessMessage("Transaction successful!");
      setErrorMessage(null); // Reset error message if there was any
    } catch (error) {
      setErrorMessage("Error transferring to Zithin: " + error.message);
      setSuccessMessage(null); // Reset success message if there was any
    }
  };
  

  return (
    <div>
      <form onSubmit={transferToZithin}>
        <button type="submit" style={{ margin: '10px' }} >Trasnsfer To Zithin original</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Transfer;
