
const hre = require("hardhat");

async function main() {

  const Disperse = await hre.ethers.getContractFactory("Disperse");
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
