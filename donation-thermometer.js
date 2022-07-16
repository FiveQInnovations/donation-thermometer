// Upload this to AWS S3
console.log('in donation-thermometer.js');

// Option 1: API call - do this one
// Option 2: scrape parent document
    // Need to put data into parent doc in more consistent pattern
// Option 3: interact with function somehow
    // Denied by browser due to security issues
// Option 4: Client manually updates this file
    // Possible, but not worthwhile

function setInitialGoalAmount (initialGoalAmount) {
    document.getElementById("goal").innerText = "$" + initialGoalAmount;
}

function setCurrentAmountRaised (currentAmountRaised) {
    document.getElementById("current-amount").innerText = "$" + parseInt(currentAmountRaised);
}

function setPercentRaised (currentAmountRaised, initialGoalAmount) {
    const percentRaisedDecimal = currentAmountRaised / initialGoalAmount;
    const percentRaisedInt = parseInt(percentRaisedDecimal * 100);
    document.getElementById("goal-percent-complete").innerText = percentRaisedInt + "%";
}

function setNumSponsors (numSponsors) {
    document.getElementById("number-sponsors").innerText = numSponsors;
}

function updateThermometerData(data) {
    console.log('updating thermometer data');
    const initialGoalAmount = data.initialGoalAmount;
    const currentAmountRaised = data.amountRaised;
    const numSponsors = data.numSponsors;

    setInitialGoalAmount(initialGoalAmount);
    setCurrentAmountRaised(currentAmountRaised);
    setPercentRaised(currentAmountRaised, initialGoalAmount);
    setNumSponsors(numSponsors);
}

function getDonationData() {
    console.log('getting thermometer data from server');
    let donationApiEndpoint = 'https://bqooixhppfybqw64lxkni7sjxi0jiyll.lambda-url.us-east-1.on.aws/';
    return fetch(donationApiEndpoint)
      .then(r => r.json())
      .then(jsonData => {
        return {
            initialGoalAmount: jsonData.initialGoalAmount,
            amountRaised: jsonData.amountRaised,
            numSponsors: jsonData.numSponsors
        };
      });
}

getDonationData().then(donationData => {
    updateThermometerData(donationData);
});
