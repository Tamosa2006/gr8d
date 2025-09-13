const questions = [
  {
    q: "Do you value bravery or cunning more?",
    options: {
      "Bravery": "Gryffindor",
      "Cunning": "Slytherin"
    }
  },
  {
    q: "You see your best friend cheating in an exam. What do you do?",
    options: {
      "Confront but don’t report (loyalty)": "Hufflepuff",
      "Report them (justice)": "Gryffindor",
      "Ignore — not your problem (practicality)": "Slytherin",
      "Help them succeed (ambition/loyalty)": "Slytherin"
    }
  },
  {
    q: "Which element appeals to you most?",
    options: {
      "Fire": "Gryffindor",
      "Water": "Slytherin",
      "Air": "Ravenclaw",
      "Earth": "Hufflepuff"
    }
  },
  {
    q: "What do you fear the most?",
    options: {
      "Betrayal": "Hufflepuff",
      "Powerlessness": "Slytherin",
      "Ignorance": "Ravenclaw",
      "Being seen as a coward": "Gryffindor"
    }
  },
  {
    q: "What motivates you most?",
    options: {
      "Knowledge": "Ravenclaw",
      "Power": "Slytherin",
      "Friendship": "Hufflepuff",
      "Courage": "Gryffindor"
    }
  },
  {
    q: "In a conflict, you would...",
    options: {
      "Seek compromise": "Hufflepuff",
      "Outwit your opponent": "Slytherin",
      "Use logic": "Ravenclaw",
      "Stand boldly": "Gryffindor"
    }
  },
  {
    q: "As a leader, what matters most?",
    options: {
      "Protecting your people": "Hufflepuff",
      "Winning at all costs": "Slytherin",
      "Making the smartest choices": "Ravenclaw",
      "Doing what is right": "Gryffindor"
    }
  },
  {
    q: "What legacy do you want to leave?",
    options: {
      "Loyalty and kindness": "Hufflepuff",
      "Achievements and greatness": "Slytherin",
      "Wisdom and knowledge": "Ravenclaw",
      "Bravery and justice": "Gryffindor"
    }
  },
  {
    q: "Which describes you best?",
    options: {
      "Loyal and dependable": "Hufflepuff",
      "Ambitious and driven": "Slytherin",
      "Curious and analytical": "Ravenclaw",
      "Bold and adventurous": "Gryffindor"
    }
  },
  {
    q: "You are offered unlimited power, but it could corrupt you. Do you...",
    options: {
      "Reject it": "Gryffindor",
      "Accept it": "Slytherin",
      "Study it": "Ravenclaw",
      "Share it": "Hufflepuff"
    }
  }
];

let current = 0;
const scores = { Gryffindor: 0, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 0 };

function showQuestion() {
  const q = questions[current];
  const container = document.getElementById("quiz");
  container.innerHTML = `
    <div class="question">
      <p>${q.q}</p>
      <div class="options">
        ${Object.entries(q.options).map(([text, house]) =>
          `<button onclick="select('${house}')">${text}</button>`
        ).join("")}
      </div>
    </div>
  `;
}

function select(house) {
  scores[house]++;
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

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
}

showQuestion();
