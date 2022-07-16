// Upload this to AWS S3
console.log('in donation-thermometer.js');

function getDonationData() {
    // Put code here to get the goal amount
    // Option 1: API call - do this one
    // Option 2: scrape parent document
        // Need to put data into parent doc in more consistent pattern
    // Option 3: interact with function somehow
        // Denied by browser due to security issues
    // Option 4: Client manually updates this file
        // Possible, but not worthwhile

    console.log('running getDonationData');
    let donationApiEndpoint = 'https://bqooixhppfybqw64lxkni7sjxi0jiyll.lambda-url.us-east-1.on.aws/';
    return fetch(donationApiEndpoint)
      .then(r => r.json())
      .then(jsonData => {
        return {
            initialGoalAmount: jsonData.initialGoalAmount,
            amountRaised: '5000'
        };
      });
}

getDonationData().then(donationData => {
    const data = {
        goal: donationData.initialGoalAmount,
        currentAmount: donationData.amountRaised
    };
    console.log('posting message');
    window.postMessage(data, '*')
})
