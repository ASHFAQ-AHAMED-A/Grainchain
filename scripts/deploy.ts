import { ethers } from "hardhat";

async function main() {
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const contract = await SimpleStorage.deploy();
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log("SimpleStorage deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


