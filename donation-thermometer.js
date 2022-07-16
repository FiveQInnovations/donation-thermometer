// Upload this to AWS S3
console.log('in donation-thermometer.js');

function getGoalAmount() {
    // Put code here to get the goal amount
    // Option 1: API call - do this one
    // Option 2: scrape parent document
        // Need to put data into parent doc in more consistent pattern
    // Option 3: interact with function somehow
        // Denied by browser due to security issues
    // Option 4: Client manually updates this file
        // Possible, but not worthwhile

    console.log('running getGoalAmount');
    return fetch('https://www.example.com')
      .then(r => {
          console.log('received API response');
          console.log(r);
          return 10**3;
      });
}

function getCurrentAmount() {
    // Put code here to get the current amount
    console.log('running getCurrentAmount');
    return 250000;
}

getGoalAmount().then(goalAmount => {
    const data = {
        goal: goalAmount,
        currentAmount: getCurrentAmount()
    };
    console.log('posting message');
    window.postMessage(data, '*')
})

// window.parent.postMessage(data, '*')
