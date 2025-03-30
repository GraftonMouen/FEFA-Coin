// Solana Mainnet Connection
const SOLANA_NETWORK = "https://api.mainnet-beta.solana.com"; // Mainnet endpoint
const connection = new solanaWeb3.Connection(SOLANA_NETWORK);
const FEFA_COIN_ADDRESS = "83Mq5Td8xLkHiexZqdsBL2WxUB4X9LiBd2DWiF9Dpump";

// Check if Phantom Wallet is installed
async function checkPhantomWallet() {
    if (window.solana && window.solana.isPhantom) {
        console.log("✅ Phantom Wallet is installed!");
        return true;
    } else {
        alert("❌ Please install Phantom Wallet.");
        return false;
    }
}

// Connect to Phantom Wallet
async function connectPhantomWallet() {
    const isPhantomAvailable = await checkPhantomWallet();
    if (!isPhantomAvailable) return;

    try {
        const response = await window.solana.connect();
        console.log("✅ Connected to Phantom wallet:", response.publicKey.toString());

        // Update UI
        document.getElementById("wallet-status").innerText = `Connected: ${response.publicKey.toString()}`;
        document.getElementById("connect-wallet").innerText = "Wallet Connected";
    } catch (error) {
        console.error("❌ Error connecting to wallet:", error);
        document.getElementById("wallet-status").innerText = "Failed to connect.";
    }
}

// Function to simulate buying FEFA
async function buyFEFA() {
    const isPhantomAvailable = await checkPhantomWallet();
    if (!isPhantomAvailable) return;

    const provider = window.solana;
    if (!provider.isConnected) {
        alert("❌ Connect your Phantom Wallet first.");
        return;
    }

    try {
        // Create a transaction
        const transaction = new solanaWeb3.Transaction();
        const recipient = new solanaWeb3.PublicKey(FEFA_COIN_ADDRESS);

        // Add instruction to send 0.01 SOL to FEFA contract
        transaction.add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: provider.publicKey,
                toPubkey: recipient,
                lamports: 10000000, // 0.01 SOL
            })
        );

        // Request Signature from Wallet
        const { signature } = await provider.signAndSendTransaction(transaction);
        console.log("✅ Transaction sent! Signature:", signature);
        alert(`✅ Transaction sent!\nSignature: ${signature}`);
    } catch (error) {
        console.error("❌ Transaction failed:", error);
        alert("❌ Transaction failed. Check console for details.");
    }
}

// Event listener for "Connect Wallet" button
document.getElementById("connect-wallet").addEventListener("click", connectPhantomWallet);
