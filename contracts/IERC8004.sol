# ERC-8004 Registry Interface
#
# This is the interface for the ERC-8004 Attestation Registry on Base Sepolia.
# We'll deploy our own instance or use an existing one for the hackathon.

# SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC8004 {
    /// @dev Emitted when a new attestation is created
    event AttestationCreated(
        bytes32 indexed attestationId,
        address indexed agent,
        bytes data,
        bytes signature,
        uint256 timestamp
    );

    /// @dev Create a new attestation
    /// @param attestationId Unique identifier for the attestation
    /// @param agent Address of the agent making the attestation
    /// @param data Attestation data (EIP-712 message)
    /// @param signature EIP-712 signature
    function attest(
        bytes32 attestationId,
        address agent,
        bytes calldata data,
        bytes calldata signature
    ) external;

    /// @dev Retrieve an attestation
    /// @param attestationId Unique identifier for the attestation
    /// @return agent Address of the agent
    /// @return data Attestation data
    /// @return signature EIP-712 signature
    /// @return timestamp Block timestamp of attestation
    function getAttestation(bytes32 attestationId)
        external view returns (
            address agent,
            bytes memory data,
            bytes memory signature,
            uint256 timestamp
        );

    /// @dev Check if an attestation exists
    /// @param attestationId Unique identifier for the attestation
    /// @return True if attestation exists
    function attestationExists(bytes32 attestationId)
        external view returns (bool);
}
