
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigner();
  console.log ("Deployer contract = ",deployer.address);

  const Disperse = await ethers.getContractFactory("Disperse");
  const disperse = await Disperse.deploy();

  await disperse.deployed();

  console.log("Disperse deployed to:", disperse.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
