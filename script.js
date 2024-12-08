// Load existing donations
let donations = JSON.parse(localStorage.getItem("donations")) || [];

// Handle form submission for donations
document.getElementById("donateFoodForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const mealType = document.getElementById("mealType").value;
  const mealTime = document.getElementById("mealTime").value;
  const quantity = document.getElementById("quantity").value;

  const donation = `${quantity} ${mealType} meals for ${mealTime}`;
  donations.push(donation);
  localStorage.setItem("donations", JSON.stringify(donations));

  updateDonationList();
  updateStats();
});

// Update donation list in Donate and Receive interfaces
function updateDonationList() {
  const donatedItems = document.getElementById("donatedItems");
  if (donatedItems) {
    donatedItems.innerHTML = "";
    donations.forEach((donation, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${donation} <button onclick="removeDonation(${index})">Remove</button>`;
      donatedItems.appendChild(li);
    });
  }
}

// Update stats (Home Page)
function updateStats() {
  const donationsCount = document.getElementById("donationsCount");
  if (donationsCount) {
    donationsCount.textContent = donations.length;
  }
}

// Remove a donation
function removeDonation(index) {
  donations.splice(index, 1);
  localStorage.setItem("donations", JSON.stringify(donations));
  updateDonationList();
  updateStats();
}

// Populate Receive Page
document.addEventListener("DOMContentLoaded", function () {
  updateDonationList();
  updateStats();
});
