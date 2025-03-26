// Check if Phantom Wallet is installed
async function checkPhantomWallet() {
    if (window.solana && window.solana.isPhantom) {
        console.log("Phantom Wallet is installed!");
        return true;
    } else {
        alert("Please install Phantom Wallet.");
        return false;
    }
}

// Connect to Phantom Wallet
async function connectPhantomWallet() {
    // Check if Phantom Wallet is available
    const isPhantomAvailable = await checkPhantomWallet();
    if (!isPhantomAvailable) return;

    try {
        // Try to connect to the Phantom Wallet
        const response = await window.solana.connect();
        console.log("Connected to Phantom wallet:", response.publicKey.toString());

        // Update the UI with the wallet status
        document.getElementById("wallet-status").innerText = `Connected: ${response.publicKey.toString()}`;
        document.getElementById("connect-wallet").innerText = "Wallet Connected"; // Change button text
    } catch (error) {
        console.error("Error connecting to wallet:", error);
        document.getElementById("wallet-status").innerText = "Failed to connect.";
    }
}

// Event listener for the "Connect Wallet" button
document.getElementById("connect-wallet").addEventListener("click", connectPhantomWallet);

// This is for purchasing FEFA (you can expand this to your minting logic)
function buyFEFA() {
    alert("This is where the minting functionality will go. You can interact with the blockchain here.");
    // You can add functionality to send tokens or interact with your smart contract
}
