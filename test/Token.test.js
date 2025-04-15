const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Erc20 Token", function () {
  let token;
  let owner;
  let minter;
  let pauser;
  let user;
  
  const initialSupply = ethers.parseEther("100000000");
  const MINTER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("MINTER_ROLE"));
  const PAUSER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("PAUSER_ROLE"));
  
  beforeEach(async function () {
    [owner, minter, pauser, user] = await ethers.getSigners();
    
    const Token = await ethers.getContractFactory("Erc20 Token");
    token = await Token.deploy(initialSupply);
    
    // Grant roles to test accounts
    await token.grantRole(MINTER_ROLE, minter.address);
    await token.grantRole(PAUSER_ROLE, pauser.address);
  });
  
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await token.hasRole(ethers.ZeroHash, owner.address)).to.equal(true);
    });
    
    it("Should assign the initial supply to the owner", async function () {
      expect(await token.balanceOf(owner.address)).to.equal(initialSupply);
    });
    
    it("Should set the correct token name and symbol", async function () {
      expect(await token.name()).to.equal("Erc20 Token");
      expect(await token.symbol()).to.equal("CLINK");
    });
  });
  
  describe("Minting", function () {
    it("Should allow minter to mint tokens", async function () {
      const mintAmount = ethers.parseEther("1000");
      await token.connect(minter).mint(user.address, mintAmount);
      expect(await token.balanceOf(user.address)).to.equal(mintAmount);
    });
    
    it("Should fail if non-minter tries to mint tokens", async function () {
      const mintAmount = ethers.parseEther("1000");
      await expect(
        token.connect(user).mint(user.address, mintAmount)
      ).to.be.reverted;
    });
    
    it("Should fail if minting would exceed max supply", async function () {
      const maxSupply = await token.MAX_SUPPLY();
      const currentSupply = await token.totalSupply();
      const excessAmount = maxSupply - currentSupply + ethers.parseEther("1");
      
      await expect(
        token.connect(minter).mint(user.address, excessAmount)
      ).to.be.revertedWith("Mint would exceed maximum supply cap");
    });
  });
  
  describe("Burning", function () {
    it("Should allow users to burn their tokens", async function () {
      const transferAmount = ethers.parseEther("1000");
      const burnAmount = ethers.parseEther("500");
      
      await token.transfer(user.address, transferAmount);
      
      await token.connect(user).burn(burnAmount);
      
      expect(await token.balanceOf(user.address)).to.equal(transferAmount - burnAmount);
    });
  });
  
  describe("Pausing", function () {
    it("Should allow pauser to pause and unpause", async function () {
      // Pause
      await token.connect(pauser).pause();
      expect(await token.paused()).to.equal(true);
      
      await expect(
        token.transfer(user.address, ethers.parseEther("100"))
      ).to.be.reverted;
      
      await token.connect(pauser).unpause();
      expect(await token.paused()).to.equal(false);
      
      await token.transfer(user.address, ethers.parseEther("100"));
      expect(await token.balanceOf(user.address)).to.equal(ethers.parseEther("100"));
    });
    
    it("Should fail if non-pauser tries to pause", async function () {
      await expect(token.connect(user).pause()).to.be.reverted;
    });
  });
  
  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseEther("1000");
      
      await token.transfer(user.address, transferAmount);
      expect(await token.balanceOf(user.address)).to.equal(transferAmount);
      
      await token.connect(user).transfer(minter.address, transferAmount);
      expect(await token.balanceOf(user.address)).to.equal(0);
      expect(await token.balanceOf(minter.address)).to.equal(transferAmount);
    });
  });
  
  describe("Allowances", function () {
    it("Should update allowance correctly", async function () {
      const allowanceAmount = ethers.parseEther("1000");
      
      await token.approve(user.address, allowanceAmount);
      expect(await token.allowance(owner.address, user.address)).to.equal(allowanceAmount);
    });
    
    it("Should allow transferFrom with allowance", async function () {
      const allowanceAmount = ethers.parseEther("1000");
      const transferAmount = ethers.parseEther("500");
      
      await token.approve(user.address, allowanceAmount);
      await token.connect(user).transferFrom(owner.address, minter.address, transferAmount);
      
      expect(await token.balanceOf(minter.address)).to.equal(transferAmount);
      expect(await token.allowance(owner.address, user.address)).to.equal(allowanceAmount - transferAmount);
    });
  });
});