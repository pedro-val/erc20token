// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IErc20Token
 * @dev Interface for the erc20Token contract
 */
interface IErc20Token {
    /**
     * @dev Mints new tokens
     * @param to The address that will receive the minted tokens
     * @param amount The amount of tokens to mint
     */
    function mint(address to, uint256 amount) external;
    
    /**
     * @dev Pauses all token transfers
     */
    function pause() external;
    
    /**
     * @dev Unpauses all token transfers
     */
    function unpause() external;
    
    /**
     * @dev Returns the maximum supply cap
     */
    function MAX_SUPPLY() external view returns (uint256);
}