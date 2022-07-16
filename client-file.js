function updateGoalAmount(newGoalAmount) {
  var oldGoalAmount = document.getElementById('goal');
  console.log("oldGoalAmount from Kirby Panel: " + oldGoalAmount);
}

window.addEventListener("message", (event) => {
  if (event.origin !== "https://journity-scripts.s3.amazonaws.com") {
    return;
  }

  console.log('received message!');
  console.log(event);
  var goalAmount = event.data.goal;
  var currentAmount = event.data.currentAmount;
  console.log("Goal amount: $" + goalAmount);
  updateGoalAmount(goalAmount);
  console.log("Current amount: $" + currentAmount);
}, false);