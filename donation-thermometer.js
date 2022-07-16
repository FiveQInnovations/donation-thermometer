// Upload this to AWS S3
console.log('in donation-thermometer.js');

function getGoalAmount() {
    // Put code here to get the goal amount
    // Option 1: API call
    // Option 2: scrape parent document
    // Option 3: interact with function somehow
    // Option 4: Client manually updates this file

    console.log('running getGoalAmount');
    return 10**6;
}

function getCurrentAmount() {
    // Put code here to get the current amount
    console.log('running getCurrentAmount');
    return 250000;
}

var data = { 
    goal: getGoalAmount(),
    currentAmount: getCurrentAmount()
};
console.log('posting message');
window.parent.postMessage(data, '*')
window.postMessage(data, '*')
