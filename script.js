// Solana web3.js functions
const { Connection, PublicKey, clusterApiUrl, Transaction, SystemProgram } = solanaWeb3;

let walletAddress = null; // Store connected wallet address
const network = "devnet"; // Change to 'mainnet-beta' for production

// FEFA Coin Wallet Address (Replace this with the actual wallet address)
const FEFA_WALLET_ADDRESS = "YOUR_FEFA_WALLET_ADDRESS_HERE"; 

// Check if Phantom Wallet is installed
async function checkPhantomWallet() {
    if (window.solana && window.solana.isPhantom) {
        console.log("✅ Phantom Wallet detected");
        return true;
    } else {
        alert("❌ Phantom Wallet not installed. Please install it.");
        return false;
    }
}

// Connect to Phantom Wallet
async function connectPhantomWallet() {
    const isPhantomAvailable = await checkPhantomWallet();
    if (!isPhantomAvailable) return;

    try {
        const response = await window.solana.connect();
        walletAddress = response.publicKey.toString();
        console.log("✅ Connected to Phantom Wallet:", walletAddress);

        // Update UI
        document.getElementById("wallet-status").innerText = `Connected: ${walletAddress}`;
        document.getElementById("connect-wallet").innerText = "Wallet Connected";

    } catch (error) {
        console.error("❌ Error connecting to wallet:", error);
        document.getElementById("wallet-status").innerText = "Failed to connect.";
    }
}

// Function to Buy FEFA Coin (Send SOL to the FEFA wallet)
async function buyFEFA() {
    if (!walletAddress) {
        alert("❌ Please connect your wallet first.");
        return;
    }

    try {
        const connection = new Connection(clusterApiUrl(network), "confirmed");
        const recipient = new PublicKey(FEFA_WALLET_ADDRESS);

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: new PublicKey(walletAddress),
                toPubkey: recipient,
                lamports: 10000000, // Example: 0.01 SOL (Change to FEFA's price)
            })
        );

        const { signature } = await window.solana.signAndSendTransaction(transaction);
        console.log("✅ Transaction successful:", signature);
        alert(`✅ Transaction Successful! TX ID: ${signature}`);

    } catch (error) {
        console.error("❌ Transaction Failed:", error);
        alert("❌ Transaction Failed. Check console for details.");
    }
}

// Attach event listeners
document.getElementById("connect-wallet").addEventListener("click", connectPhantomWallet);
document.getElementById("buy-fefa").addEventListener("click", buyFEFA);
