document.addEventListener("DOMContentLoaded", function () {
  const url = "https://mocki.io/v1/a195cdee-7220-4d12-b97d-c373a08b8300"; // Replace with your actual mock API URL
  let data = [];

  fetch(url)
    .then((res) => res.json())
    .then((fetchedData) => {
      data = fetchedData;
      displayBreakdownList(data);
    })
    .catch((err) => console.error("Error fetching data:", err));

  function displayBreakdownList(dataToDisplay) {
    const list = document.getElementById("breakdown-list");
    list.innerHTML = "";

    dataToDisplay.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = item.breakdown;
      li.dataset.index = data.indexOf(item); // Keep original index for detail reference
      list.appendChild(li);
    });
  }

  // Event listener for showing details on click
  document.getElementById("breakdown-list").addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      const index = e.target.dataset.index;
      const item = data[index];

      const existingCard = document.querySelector(".details-card");
      if (existingCard) existingCard.remove();

      const card = document.createElement("div");
      card.className = "details-card";

      card.innerHTML = `
        <h3><strong>Breakdown:</strong> ${item.breakdown}</h3>
        <p><strong>Date:</strong> ${item.Name}</p>
        <p><strong>SHIFT:</strong> ${item.SHIFT}</p>
        <p><strong>Area:</strong> ${item.Area}</p>
        <p><strong>Action taken:</strong> ${item["Action taken"]}</p>
        <p><strong>Pending jobs:</strong> ${item["pending jobs"]}</p>
        <p><strong>Spare consumed:</strong> ${item["spare consumed"]}</p>
        <p><strong>Time taken:</strong> ${item["time taken"]}</p>
      `;

      e.target.insertAdjacentElement("afterend", card);
    }
  });

  // Search functionality with deduplication
  document.getElementById("search-button").addEventListener("click", function (event) {
    event.preventDefault();
    const searchText = document.getElementById("search-input").value.toLowerCase();

    const filtered = data.filter((item) =>
      item.breakdown.toLowerCase().includes(searchText)
    );

    // Remove duplicates by breakdown name
    const uniqueByBreakdown = Array.from(
      new Map(filtered.map(item => [item.breakdown.toLowerCase(), item])).values()
    );

    displayBreakdownList(uniqueByBreakdown);

    // Clear old detail card
    const existingCard = document.querySelector(".details-card");
    if (existingCard) existingCard.remove();
  });
});
