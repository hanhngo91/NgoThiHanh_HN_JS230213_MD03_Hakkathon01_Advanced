const player1_name = document.querySelector("#player1");
const player2_name = document.querySelector("#player2");
const player3_name = document.querySelector("#player3");
const player4_name = document.querySelector("#player4");

//Render players:
const playerDisplay = document.querySelector(".tableHead");
fetch("http://localhost:8000/players")
  .then((res) => res.json())
  .then((data) => {
    let players = data.data;
    console.log(players);
    let playerName = `
        <th>#</th>
        <th id="player1">${players.player1}</th>
        <th id="player2">${players.player2}</th>
        <th id="player3">${players.player3}</th>
        <th id="player4">${players.player4}</th>
        `;
    playerDisplay.innerHTML = playerName;
  })
  .catch((err) => console.log(err));

//Render rounds:
const roundDisplay = document.querySelector(".rounds");
const totalRow = document.querySelector(".total-field");
fetch("http://localhost:8000/rounds")
  .then((res) => res.json())
  .then((data) => {
    let rounds = data.data;
    // console.log(rounds);
    let playerSumScore = [];
    for (let i = 0; i < 4; i++) {
      let sum = rounds.reduce((a, b) => a + b.score[i], 0);
      playerSumScore.push(sum);
    }
    // console.log(playerSumScore);

    //Caculate total score:
    let totalScore = playerSumScore.reduce((a, b) => a + b, 0);
    // console.log(totalScore);

    let roundHTML = `
    <td style="width: 13rem;background-color: rgb(0, 132, 255); color: white">Sum of scores (${totalScore})</td>
    <td style="background-color: rgb(0, 132, 255); color: white">${playerSumScore[0]}</td> 
    <td style="background-color: rgb(0, 132, 255); color: white">${playerSumScore[1]}</td>
    <td style="background-color: rgb(0, 132, 255); color: white">${playerSumScore[2]}</td>
    <td style="background-color: rgb(0, 132, 255); color: white">${playerSumScore[3]}</td>
    `;
    // console.log(roundHTML);
    totalRow.innerHTML = roundHTML;

    rounds.forEach((roundItem) => {
      roundHTML += `
            <tr>
            <td>Round ${roundItem.id}</td>
            <td><input type="number" value=${roundItem.score[0]}></td>
            <td><input type="number" value=${roundItem.score[1]}></td>
            <td><input type="number" value=${roundItem.score[2]}></td>
            <td><input type="number" value=${roundItem.score[3]}></td>
        </tr>
            `;
    });
    roundDisplay.innerHTML = roundHTML;
  })
  .catch((err) => console.log(err));

//Add more rounds:
const addRoundBtn = document.querySelector(".addRound");
addRoundBtn.onclick = () => {
  //fetch rounds:
  fetch(
    "http://localhost:8000/rounds"
    // {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: roundDisplay.rows.length + 1,
    //     score: [0, 0, 0, 0],
    //   }),
    // }
  )
    .then((res) => res.json())
    .then((data) => {
      let rounds = data.data;
      // console.log(rounds);
      let newRound = {
        id: rounds.length + 1,
        score: [0, 0, 0, 0],
      };
      rounds.push(newRound);
      //Add new row:
      let newRoundHTML = `
            <tr>
                <td>Round ${newRound.id}</td>
                <td><input type="number" value=${newRound.score[0]}></td>
                <td><input type="number" value=${newRound.score[1]}></td>
                <td><input type="number" value=${newRound.score[2]}></td>
                <td><input type="number" value=${newRound.score[3]}></td>
            </tr>
      `;
      roundDisplay.insertAdjacentHTML("beforeend", newRoundHTML);
    })
    .catch((err) => console.log(err));
};
