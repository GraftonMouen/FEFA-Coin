// Import required libraries for Solana
import { Connection, Keypair, Transaction, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token";

// Your FEFA Coin mint address (from pump.fun)
const FEFA_MINT_ADDRESS = new PublicKey("83Mq5Td8xLkHiexZqdsBL2WxUB4X9LiBd2DWiF9Dpump");

// Connect to the Solana network (Mainnet)
const network = "https://api.mainnet-beta.solana.com"; // Mainnet endpoint
const connection = new Connection(network);

// Connect to Phantom Wallet
async function connectPhantomWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            // Connect Phantom wallet
            const response = await window.solana.connect();
            console.log("Connected to Phantom wallet:", response.publicKey.toString());
            document.getElementById("wallet-status").innerText = `Connected: ${response.publicKey.toString()}`;
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            document.getElementById("wallet-status").innerText = "Failed to connect.";
        }
    } else {
        alert("Please install Phantom Wallet.");
    }
}

// Handle buying FEFA token
async function buyFEFA() {
    if (!window.solana || !window.solana.isPhantom) {
        alert("Please install Phantom Wallet.");
        return;
    }

    const wallet = window.solana;

    try {
        // Get the wallet's public key
        const publicKey = wallet.publicKey;

        // Fetch the associated token address for the wallet (this is where the FEFA Coin will be sent)
        const associatedTokenAddress = await getAssociatedTokenAddress(FEFA_MINT_ADDRESS, publicKey);

        // Check if the token account exists, if not, create it
        let tokenAccountInfo = await connection.getAccountInfo(associatedTokenAddress);
        if (!tokenAccountInfo) {
            console.log("No associated token account found. Creating one...");
            // Create an associated token account (You would need to handle this step)
            // Consider using the Token Program's `createAssociatedTokenAccount` method
            // to create the account for the user if it doesn't exist.
            alert("No associated token account found. Please create one first.");
            return;
        }

        // Create the transfer instruction to send FEFA Coin (this example sends 1 FEFA)
        const amount = 1 * 10 ** 9; // Amount in smallest units (lamports), adjust as needed
        const transaction = new Transaction().add(
            createTransferInstruction(
                associatedTokenAddress, // From account (wallet's token account)
                new PublicKey("destination-wallet-public-key"), // Destination address (where you want to send the token)
                publicKey, // Wallet's public key (signer)
                amount, // Amount to send in the smallest unit
                [], // Signers
                TOKEN_PROGRAM_ID // Token Program ID
            )
        );

        // Sign the transaction
        const { signature } = await window.solana.signTransaction(transaction);
        console.log("Transaction Signature:", signature);

        // Send the transaction to the network
        const txId = await connection.sendRawTransaction(transaction.serialize());
        console.log("Transaction sent with ID:", txId);
        alert("Transaction successful!");
    } catch (error) {
        console.error("Error buying FEFA:", error);
        alert("Failed to complete the transaction.");
    }
}

// Event listeners
document.getElementById("connect-wallet").addEventListener("click", connectPhantomWallet);
document.getElementById("buyFEFA").addEventListener("click", buyFEFA);
