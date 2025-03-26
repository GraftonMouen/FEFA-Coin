async function connectWallet() {
    try {
        if (!window.solana || !window.solana.isPhantom) {
            alert("Phantom Wallet not found. Please install it.");
            return;
        }
        
        const response = await window.solana.connect();
        console.log("Connected to wallet:", response.publicKey.toString());

        document.getElementById("wallet-status").innerText = 
            `Connected: ${response.publicKey.toString()}`;
    } catch (error) {
        console.error("Wallet connection error:", error);
    }
}

// Attach event listener to button
document.getElementById("connect-wallet").addEventListener("click", connectWallet);
