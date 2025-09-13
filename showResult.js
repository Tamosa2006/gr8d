function showResult() {
  const max = Math.max(...Object.values(scores));
  const topHouses = Object.entries(scores)
    .filter(([_, score]) => score === max)
    .map(([house]) => house);

  let finalHouse = topHouses.length === 1
    ? topHouses[0]
    : topHouses[Math.floor(Math.random() * topHouses.length)];

  document.getElementById("quiz").innerHTML = "";
  document.getElementById("result").innerHTML = `
    🎩 The Sorting Hat has decided!<br>
    🏰 You belong in <strong>${finalHouse}</strong>!<br>
    <small>Scores: ${JSON.stringify(scores)}</small>
  `;

  // Draw pie chart
  const ctx = document.getElementById('houseChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(scores),
      datasets: [{
        label: 'House Scores',
        data: Object.values(scores),
        backgroundColor: [
          '#d62828', // Gryffindor
          '#2a9d8f', // Slytherin
          '#264653', // Ravenclaw
          '#f4a261'  // Hufflepuff
        ],
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#fff',
            font: {
              size: 14
            }
          }
        }
      }
    }
  });
}
