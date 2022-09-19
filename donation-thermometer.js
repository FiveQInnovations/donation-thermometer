// Upload this to AWS S3

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
    document.getElementById("progress").style.width = percentRaisedInt + '%';
}

function setNumSponsors (numSponsors) {
    document.getElementById("number-sponsors").innerText = numSponsors;
}

function updateThermometerData(data) {
    const initialGoalAmount = data.initialGoalAmount;
    const currentAmountRaised = data.amountRaised;
    const numSponsors = data.numSponsors;

    setInitialGoalAmount(initialGoalAmount);
    setCurrentAmountRaised(currentAmountRaised);
    setPercentRaised(currentAmountRaised, initialGoalAmount);
    setNumSponsors(numSponsors);
}

function getDonationData() {
    // let donationApiEndpoint = 'https://bqooixhppfybqw64lxkni7sjxi0jiyll.lambda-url.us-east-1.on.aws/';
    let donationApiEndpoint = 'https://api.frc.org/api/campaign-thermometer/';
    console.log('fetching donation data from ' + donationApiEndpoint);
    return fetch(donationApiEndpoint)
      .then(r => r.json())
      .then(r => r.find(x => x.campaign_group === 'FYE_2022'))
      .then(jsonData => {
        console.log('picked campaign: ');
        console.log(jsonData);
        return {
            initialGoalAmount: jsonData.campaign_goal,
            amountRaised: jsonData.sum_gifts,
            numSponsors: jsonData.num_donors
        };
      });
}

getDonationData().then(donationData => {
    updateThermometerData(donationData);
});
