async function connectPhantomWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            alert("Connected: " + response.publicKey.toString());
        } catch (error) {
            console.error(error);
            alert("Connection failed.");
        }
    } else {
        alert("Phantom Wallet not found. Please install it.");
    }
}

async function buyFEFA() {
    const contractAddress = "83Mq5Td8xLkHiexZqdsBL2WxUB4X9LiBd2DWiF9Dpump";
    const amount = prompt("Enter amount of SOL to swap for FEFA:");

    if (!amount) return;

    if (window.solana && window.solana.isPhantom) {
        const provider = window.solana;
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
        const sender = provider.publicKey;

        const transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: sender,
                toPubkey: new solanaWeb3.PublicKey(contractAddress),
                lamports: solanaWeb3.LAMPORTS_PER_SOL * parseFloat(amount),
            })
        );

        try {
            const signature = await provider.signAndSendTransaction(transaction);
            alert("Transaction sent: " + signature);
        } catch (error) {
            console.error(error);
            alert("Transaction failed.");
        }
    } else {
        alert("Phantom Wallet not detected.");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const connectButton = document.querySelector('button');
    connectButton.addEventListener('click', connectPhantomWallet);
});
