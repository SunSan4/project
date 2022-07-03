
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigner();
  console.log ("Deployer contract = ",deployer.address);

  const Token = await hre.ethers.getContractFactory("TestToken");
  const token = await Token.deploy();
 

  await token.deployed();

  console.log("Disperse deployed to:", token.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
