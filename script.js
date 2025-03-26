// script.js

let buyers = 0;
let sellers = 0;

// Function to update the spaceship's position and visual effects
function updateSpaceshipPosition() {
  const spaceship = document.getElementById("spaceship");
  const rocketTrail = document.getElementById("rocket-trail");
  const progressBar = document.getElementById("progress");
  const totalActions = buyers + sellers;
  
  // If no actions, no movement
  if (totalActions === 0) {
    return;
  }

  // Calculate progress (buyers vs total actions)
  let progressPercentage = (buyers / totalActions) * 100;
  progress.style.width = progressPercentage + "%";

  // Animate spaceship up/down based on buyers and sellers
  let spaceshipMovement = (buyers - sellers) * 10; // Adjust multiplier for smoother animation
  spaceship.style.bottom = `${Math.max(0, spaceshipMovement)}px`;

  // If spaceship is moving, show rocket exhaust
  if (buyers > sellers) {
    rocketTrail.style.opacity = 1;
  } else {
    rocketTrail.style.opacity = 0;
  }

  // Update the counts on the page
  document.getElementById("buyers-count").innerText = buyers;
  document.getElementById("sellers-count").innerText = sellers;
}

// Simulate Buy and Sell actions (to be replaced by real blockchain data)
function simulateAction(type) {
  if (type === "buy") {
    buyers++;
  } else if (type === "sell") {
    sellers++;
  }
  updateSpaceshipPosition();
}

// Example Simulated Actions (for testing purposes)
setInterval(() => simulateAction("buy"), 2000);  // Simulate a "buy" every 2 seconds
setInterval(() => simulateAction("sell"), 4000); // Simulate a "sell" every 4 seconds
