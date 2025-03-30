// Solana Mainnet Configuration
const SOLANA_NETWORK = "mainnet-beta"; // Change to 'devnet' for testing

// FEFA Coin Receiver Address (Your Wallet)
const FEFA_COIN_ADDRESS = "83Mq5Td8xLkHiexZqdsBL2WxUB4X9LiBd2DWiF9Dpump";

// Check if Phantom Wallet is installed
async function checkPhantomWallet() {
    if (window.solana && window.solana.isPhantom) {
        console.log("✅ Phantom Wallet detected");
        return true;
    } else {
        alert("❌ Phantom Wallet not installed. Please install it from https://phantom.app/");
        return false;
    }
}

// Connect to Phantom Wallet
async function connectPhantomWallet() {
    const isPhantomAvailable = await checkPhantomWallet();
    if (!isPhantomAvailable) return;

    try {
        const provider = window.solana;

        // Request connection with Phantom Wallet
        const response = await provider.connect({ onlyIfTrusted: false });
        console.log("✅ Connected to Phantom wallet:", response.publicKey.toString());

        // Update UI with wallet info
        document.getElementById("wallet-status").innerText = `Connected: ${response.publicKey.toString()}`;
        document.getElementById("connect-wallet").innerText = "Wallet Connected";

        return response.publicKey;
    } catch (error) {
        console.error("❌ Error connecting to wallet:", error);
        document.getElementById("wallet-status").innerText = "Failed to connect.";
    }
}

// Buy FEFA Function (Sends SOL to your wallet)
async function buyFEFA() {
    const isPhantomAvailable = await checkPhantomWallet();
    if (!isPhantomAvailable) return;

    const provider = window.solana;
    if (!provider.isConnected) {
        alert("Please connect your Phantom Wallet first!");
        return;
    }

    try {
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(SOLANA_NETWORK));
        const sender = provider.publicKey;
        const recipient = new solanaWeb3.PublicKey(FEFA_COIN_ADDRESS);

        // Transaction Details
        const transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: sender,
                toPubkey: recipient,
                lamports: solanaWeb3.LAMPORTS_PER_SOL * 0.1, // 0.1 SOL Example
            })
        );

        transaction.feePayer = sender;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        // Request User Signature
        const signedTransaction = await provider.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());

        console.log("✅ Transaction sent! Signature:", signature);
        alert(`✅ Transaction Successful! Signature: ${signature}`);
    } catch (error) {
        console.error("❌ Transaction Failed:", error);
        alert("Transaction failed! Please try again.");
    }
}

// Event Listeners
document.getElementById("connect-wallet").addEventListener("click", connectPhantomWallet);
document.getElementById("buy-feefa").addEventListener("click", buyFEFA);
