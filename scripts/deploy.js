const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Erc20Token...");
  
  const initialSupply = ethers.parseEther("100000000");
  
  const Token = await ethers.getContractFactory("Erc20Token");
  const token = await Token.deploy(initialSupply);
  
  await token.waitForDeployment();
  
  const address = await token.getAddress();
  console.log(`Erc20Token deployed to: ${address}`);
  
  console.log("Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });