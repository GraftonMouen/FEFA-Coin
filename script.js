// Solana network setup
const SOLANA_NETWORK = "mainnet-beta"; // Ensure we're using mainnet
const FEFA_WALLET = "83Mq5Td8xLkHiexZqdsBL2WxUB4X9LiBd2DWiF9Dpump";

let walletAddress = null;

async function connectPhantomWallet() {
    if (!window.solana || !window.solana.isPhantom) {
        alert("❌ Phantom Wallet not installed. Please install it.");
        return;
    }

    try {
        // Connect to Phantom Wallet
        const response = await window.solana.connect();
        walletAddress = response.publicKey.toString();

        // Update UI
        document.getElementById("wallet-status").innerText = `✅ Connected: ${walletAddress}`;
        document.getElementById("connect-wallet").innerText = "Wallet Connected";
        document.getElementById("buy-fefa").disabled = false; // Enable buy button
    } catch (error) {
        console.error("❌ Error connecting to wallet:", error);
        document.getElementById("wallet-status").innerText = "❌ Connection Failed";
    }
}

// Function to handle FEFA purchase
async function buyFEFA() {
    if (!walletAddress) {
        alert("⚠ Please connect your wallet first!");
        return;
    }

    try {
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(SOLANA_NETWORK));
        const transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: new solanaWeb3.PublicKey(walletAddress),
                toPubkey: new solanaWeb3.PublicKey(FEFA_WALLET),
                lamports: solanaWeb3.LAMPORTS_PER_SOL * 0.1, // 0.1 SOL as an example
            })
        );

        transaction.feePayer = new solanaWeb3.PublicKey(walletAddress);
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        // Sign and send transaction
        const signedTransaction = await window.solana.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());

        alert(`✅ Transaction Sent! Signature: ${signature}`);
        console.log(`✅ Transaction Success: https://solscan.io/tx/${signature}`);
    } catch (error) {
        console.error("❌ Transaction failed:", error);
        alert("❌ Transaction Failed!");
    }
}

// Event Listeners
document.getElementById("connect-wallet").addEventListener("click", connectPhantomWallet);
document.getElementById("buy-fefa").addEventListener("click", buyFEFA);
