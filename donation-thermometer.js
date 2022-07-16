console.log('in donation-thermometer.js');

function getGoalAmount() {
    // Put code here to get the goal amount
    return 100;
}

function getCurrentAmount() {
    // Put code here to get the current amount
    return 5;
}

var data = { 
    goal: getGoalAmount(),
    currentAmount: getCurrentAmount()
};
console.log('posting message');
window.parent.postMessage(data, '*')

export function setCurrentAmount(newCurrentAmount) {
    // do stuff
}