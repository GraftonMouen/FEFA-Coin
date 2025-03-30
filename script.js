// Solana Mainnet RPC URL
const SOLANA_NETWORK = "https://api.mainnet-beta.solana.com";

// Set up connection to Solana
const connection = new solanaWeb3.Connection(SOLANA_NETWORK);

// Phantom Wallet Connection Function
async function connectPhantomWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            // Request connection
            const response = await window.solana.connect();
            console.log("✅ Connected to Phantom Wallet:", response.publicKey.toString());

            // Update UI
            document.getElementById("wallet-status").innerText = `Connected: ${response.publicKey.toString()}`;
            document.getElementById("connect-wallet").innerText = "Wallet Connected";

        } catch (error) {
            console.error("❌ Error connecting to Phantom Wallet:", error);
            document.getElementById("wallet-status").innerText = "Failed to connect.";
        }
    } else {
        alert("❌ Phantom Wallet not installed. Please install it.");
    }
}

// Function to Buy FEFA
async function buyFEFA() {
    if (!window.solana || !window.solana.isPhantom) {
        alert("❌ Please connect your Phantom Wallet first.");
        return;
    }

    try {
        const provider = window.solana;
        const walletPublicKey = provider.publicKey;

        if (!walletPublicKey) {
            alert("❌ Wallet not connected.");
            return;
        }

        const transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: walletPublicKey,
                toPubkey: new solanaWeb3.PublicKey("83Mq5Td8xLkHiexZqdsBL2WxUB4X9LiBd2DWiF9Dpump"), // Your FEFA Coin Address
                lamports: solanaWeb3.LAMPORTS_PER_SOL * 0.01, // Example: 0.01 SOL
            })
        );

        // Request Signature
        const signature = await provider.signAndSendTransaction(transaction);
        console.log("✅ Transaction Signature:", signature);
        alert(`✅ Transaction Sent! Signature: ${signature}`);
    } catch (error) {
        console.error("❌ Error processing transaction:", error);
        alert("❌ Transaction failed.");
    }
}

// Event Listeners
document.getElementById("connect-wallet").addEventListener("click", connectPhantomWallet);
document.getElementById("buy-fefa").addEventListener("click", buyFEFA);
