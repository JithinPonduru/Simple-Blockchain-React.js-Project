import { ethers } from "ethers";

const Buy = ({ state }) => {

    const buyChai = async (e) => {
        <p>Started</p>
        e.preventDefault();
        try {
            const { contract } = state;
            const name = document.querySelector("#name").value;
            const message = document.querySelector("#Message").value;
            const amount = { value: ethers.utils.parseEther("0.000001") };
            const transaction = await contract.buyChai(name, message, amount);
            await transaction.wait();
            console.log("Transaction Mined");
            console.log(transaction);
            // Optionally: Show success message to the user
        } catch (error) {
            console.error("Error buying chai:", error);
            // Optionally: Show error message to the user
        }
    };

    
    return (
        <div>
            <form onSubmit={buyChai}>
                <label style={{ margin: '10px' }}>Name</label>
                <input type="text" id="name" placeholder="Name" required />
                <label style={{ margin: '10px' }}>Message</label>
                <input type="text" id="Message" placeholder="Message" required />
                <button type="submit" style={{ margin: '10px' }} >Pay</button>
            </form>
        </div>
    );
};

export default Buy;
