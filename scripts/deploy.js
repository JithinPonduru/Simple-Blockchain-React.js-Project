// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

async function consolBalances(addresses) {
  let count = 0;
  for (const address of addresses) {
    count++;
    console.log(`Address ${count} Balance of the Contract :: `, await getBalance(address));
  }
}

async function consolMemo(memos) {
  for (const memo of memos) {
    const time = memo.time;
    const name = memo.name;
    const message = memo.message;
    const from = memo.from;
    console.log(`At ${time} , Name ${name} , Address ${from} , Message ${message}`);
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners(); // Fix here
  const App = await hre.ethers.getContractFactory("DemoApp");
  const contract = await App.deploy();
  await contract.waitForDeployment();
  console.log("Contract deployed to:", contract.target);

  const addresses = [owner.address, from1.address, from2.address, from3.address];
  console.log("Before buying the chai");
  await consolBalances(addresses);

  const amount = { value: hre.ethers.parseEther("0.0001") };

  await contract.connect(from1).buyChai("Zithin1", "Nice1", amount);
  await contract.connect(from2).buyChai("Zithin2", "Nice2", amount);
  await contract.connect(from3).buyChai("Zithin3", "Nice3", amount);

  console.log("After buying the chai");
  await consolBalances(addresses);

  console.log("Memo of the chai");
  const memo = await contract.getMemo();
  await consolMemo(memo);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});




// address -> target  to find the address of the contract
// hre.ethers.utils.formatEther(balanceBigInt) -> hre.ethers.formatEther(balanceBigInt)
// value: hre.ethers.utilsparseEther("1.0") -> hre.ethers.parseEther("1.0")  
// pragma solidity >=0.5.0 <=0.9.0; needed pragma condition 
// there also a change with .waitForDeployment()