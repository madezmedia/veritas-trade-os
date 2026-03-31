# ERC-8004 Registry Deployment Script
#
# Deploy the attestation registry to Base Sepolia

# Prerequisites:
# - cast installed (brew install cast)
# - Base Sepolia ETH from faucet: https://docs.base.org/base-chain/network-information/network-faucets
# - PRIVATE_KEY environment variable set

# Contract bytecode (will be generated after compilation)
# CONTRACT_BYTECODE="0x..."

# Deploy command (update with actual bytecode)
# cast send \
#   --rpc-url https://sepolia.base.org \
#   --private-key $PRIVATE_KEY \
#   --create CONTRACT_BYTECODE

# After deployment, update config/auditor.toml with:
# registry_address = "0x..." (deployed contract address)

# Verification (optional, for Etherscan-like explorer)
# cast send 0x... \
#   --rpc-url https://sepolia.base.org \
#   --private-key $PRIVATE_KEY \
#   "attest(bytes32,address,bytes,bytes)" \
#   "0xtest..." "0x..." "0x..." "0x..."
