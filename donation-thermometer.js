// Upload this to AWS S3
console.log('in donation-thermometer.js');

function getGoalAmount() {
    // Put code here to get the goal amount
    console.log('running getGoalAmount');
    return 100;
}

function getCurrentAmount() {
    // Put code here to get the current amount
    console.log('running getCurrentAmount');
    return 5;
}

var data = { 
    goal: getGoalAmount(),
    currentAmount: getCurrentAmount()
};
console.log('posting message');
window.parent.postMessage(data, '*')
