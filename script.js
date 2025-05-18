document.addEventListener("DOMContentLoaded", function () {
  const url = "https://mocki.io/v1/8a6e6561-74a1-4b1d-821b-1542e72d72f0"; // Replace with your actual mock API URL

  let data = [];

  fetch(url)
    .then((response) => response.json())
    .then((fetchedData) => {
      data = fetchedData;
      displayCards(data);
    })
    .catch((error) => console.error("Error fetching data:", error));

  function displayCards(dataToDisplay) {
    const cardGrid = document.getElementById("card-grid");
    cardGrid.innerHTML = "";

    dataToDisplay.forEach((item) => {
      if (item?.breakdown?.length > 0) {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h3><strong>Breakdown:</strong> ${item.breakdown}</h3>
          <h3><strong>Date:</strong> ${item.Name}</h3>
          <p><strong>SHIFT:</strong> ${item.SHIFT}</p>
          <p><strong>Area:</strong> ${item.Area}</p>
          <p><strong>Action taken:</strong> ${item["Action taken"]}</p>
          <p><strong>Pending jobs:</strong> ${item["pending jobs"]}</p>
          <p><strong>Spare consumed:</strong> ${item["spare consumed"]}</p>
          <p><strong>Time taken:</strong> ${item["time taken"]}</p>
        `;

        cardGrid.appendChild(card);
      }
    });
  }

  document
    .getElementById("search-button")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const searchText = document
        .getElementById("search-input")
        .value.toLowerCase();

      const filteredData = data.filter((item) =>
        item.breakdown.toLowerCase().includes(searchText)
      );

      displayCards(filteredData);
    });
});
