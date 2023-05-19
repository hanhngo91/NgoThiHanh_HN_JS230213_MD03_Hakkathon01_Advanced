//Create new game:
const createGameBtn = document.querySelector(".create-btn");

createGameBtn.onclick = async () => {
  const player1 = document.querySelector("#input-player1").value;
  const player2 = document.querySelector("#input-player2").value;
  const player3 = document.querySelector("#input-player3").value;
  const player4 = document.querySelector("#input-player4").value;

  const data = {
    player1: player1,
    player2: player2,
    player3: player3,
    player4: player4,
  };

  const response = await fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log(result);
  if (result.status === "success") {
    window.location.href = "/score";
  }
};
