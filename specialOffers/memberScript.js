// Function to update pricing
function updatePricing(plan) {
  const basicPrice = document.getElementById("basic-price");
  const premiumPrice = document.getElementById("premium-price");
  const basicPeriod = document.getElementById("basic-period");
  const premiumPeriod = document.getElementById("premium-period");

  if (plan === "monthly") {
    basicPrice.textContent = "₹199";
    premiumPrice.textContent = "₹499";
    basicPeriod.textContent = "per month";
    premiumPeriod.textContent = "per month";
  } else if (plan === "yearly") {
    basicPrice.textContent = "₹1999";
    premiumPrice.textContent = "₹5499";
    basicPeriod.textContent = "per year";
    premiumPeriod.textContent = "per year";
  }
}

// Set up event listeners
document.getElementById("monthly").addEventListener("click", function () {
  updatePricing("monthly");
});

document.getElementById("yearly").addEventListener("click", function () {
  updatePricing("yearly");
});
