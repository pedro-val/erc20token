// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title Erc20Token
 * @dev Implementation of the ERC-20 token standard with additional security features
 * including access control, pausability, and reentrancy protection.
 */
contract Erc20Token is ERC20, ERC20Burnable, ERC20Pausable, AccessControl, ReentrancyGuard {
    // Create roles for access control
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    
    // Maximum supply cap
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    
    /**
     * @dev Constructor that sets up roles and mints initial supply
     * @param initialSupply The amount to mint to the contract creator
     */
    constructor(uint256 initialSupply) ERC20("Erc20 Token", "CLINK") {
        require(initialSupply <= MAX_SUPPLY, "Initial supply exceeds maximum cap");
        
        // Setup default admin role
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        
        // Mint initial supply to the deployer
        _mint(msg.sender, initialSupply);
    }
    
    /**
     * @dev Mints new tokens, respecting the maximum supply cap
     * @param to The address that will receive the minted tokens
     * @param amount The amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) nonReentrant {
        require(totalSupply() + amount <= MAX_SUPPLY, "Mint would exceed maximum supply cap");
        _mint(to, amount);
    }
    
    /**
     * @dev Pauses all token transfers
     */
    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }
    
    /**
     * @dev Unpauses all token transfers
     */
    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }
    
    /**
     * @dev Hook that is called before any transfer of tokens
     */
    function _update(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, amount);
    }
}