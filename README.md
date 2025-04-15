# ERC-20 Token Study Project

## Overview

This project is an educational implementation of the ERC-20 token standard using Solidity. It demonstrates best practices for token creation, security, and deployment on Ethereum-compatible blockchains.

## Features

- Standard ERC-20 implementation with all required functions
- Enhanced security features including access control and reentrancy protection
- Minting and burning capabilities
- Pausable functionality for emergency situations
- Role-based access control
- Comprehensive test suite

## Prerequisites

- Node.js (v14.x or later)
- npm or yarn
- Hardhat
- MetaMask or another Ethereum wallet for testing

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/erc20-token.git
cd erc20-token
```

2. Install dependencies:
```bash
npm install

3. Compile the contracts:
```bash
npx hardhat compile

## Project Structure
```plaintext
Erc20Token/
├── contracts/             # Smart contracts
│   ├── Token.sol          # Main ERC-20 implementation
│   ├── interfaces/        # Contract interfaces
│   └── libraries/         # Utility libraries
├── scripts/               # Deployment and interaction scripts
│   └── deploy.js          # Main deployment script
├── test/                  # Test files
│   └── Token.test.js      # Tests for the token contract
├── .github/               # GitHub specific files
├── hardhat.config.js      # Hardhat configuration
└── README.md              # Project documentation
```

## Usage
### Deploying the Token
To deploy the token to a local Hardhat network:

```bash
npx hardhat run scripts/deploy.js

To deploy to a testnet (e.g., Goerli):

```bash
npx hardhat run scripts/deploy.js --network goerli

### Running Tests
```bash
npx hardhat test

To generate a test coverage report:

```bash
npx hardhat coverage

## Token Functionality
The token implements the following standard ERC-20 functions:

- totalSupply() : Returns the total token supply
- balanceOf(account) : Returns the token balance of the account
- transfer(recipient, amount) : Transfers tokens to a specified address
- allowance(owner, spender) : Returns the remaining allowance for a spender
- approve(spender, amount) : Approves a spender to transfer tokens
- transferFrom(sender, recipient, amount) : Transfers tokens from one address to another
Additional functionality includes:

- mint(account, amount) : Creates new tokens (restricted to authorized roles)
- burn(amount) : Destroys tokens from the caller's account
- pause() : Pauses all token transfers (restricted to authorized roles)
- unpause() : Unpauses token transfers (restricted to authorized roles)
## Security Considerations
This implementation follows security best practices:

- Uses OpenZeppelin's audited contracts as a base
- Implements proper access control mechanisms
- Follows the checks-effects-interactions pattern
- Includes comprehensive input validation
- Emits events for all state changes
- Implements reentrancy protection
## Development
### Local Development
Start a local Hardhat node:

```bash
npx hardhat node

In a separate terminal, deploy the contracts to the local network:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Contract Verification
After deployment to Sepolia, verify your contract:

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS "INITIAL_SUPPLY_IN_WEI"
```

## Troubleshooting
Common issues and their solutions:

- Gas estimation errors : May occur if contract functions revert. Check your input parameters.
- Nonce too high : Reset your MetaMask account or use the --reset flag with Hardhat.
- Contract size too large : Consider optimizing your contract or splitting functionality across multiple contracts.
## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch ( git checkout -b feature/amazing-feature )
3. Commit your changes ( git commit -m 'Add some amazing feature' )
4. Push to the branch ( git push origin feature/amazing-feature )
5. Open a Pull Request
## Acknowledgements
- OpenZeppelin for their secure contract implementations
- Ethereum for the ERC-20 standard
- Hardhat for the development environment
- Erc20Token for oracle solutions (if used in the project)

## Deployment Instructions

### Deploying to Sepolia Testnet

1. Configure your environment:
   - Create a `.env` file based on `.env.example`
   - Add your Alchemy Sepolia URL (SEPOLIA_URL)
   - Add your wallet's private key (PRIVATE_KEY)
   - Add your Etherscan API key (ETHERSCAN_API_KEY)

2. Get Sepolia ETH:
   - Visit Alchemy Sepolia Faucet: https://sepoliafaucet.com/
   - Visit Infura Sepolia Faucet: https://www.infura.io/faucet/sepolia
   - Visit PoW Faucet: https://sepolia-faucet.pk910.de/

3. Deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```