// Upload this to AWS S3

// Option 1: API call - do this one
// Option 2: scrape parent document
    // Need to put data into parent doc in more consistent pattern
// Option 3: interact with function somehow
    // Denied by browser due to security issues
// Option 4: Client manually updates this file
    // Possible, but not worthwhile

function formatNumber (x) {
    return Number(x).toLocaleString('en-US', { minimumFractionDigits: 0 } );
}

function setInitialGoalAmount (initialGoalAmount) {
    let formattedGoalAmount = formatNumber(initialGoalAmount);
    document.getElementById("goal").innerText = "$" + formattedGoalAmount;
}

function setCurrentAmountRaised (currentAmountRaised) {
    let amountRaised = parseInt(currentAmountRaised);
    let formattedAmountRaised = formatNumber(amountRaised);
    document.getElementById("current-amount").innerText = "$" + formattedAmountRaised;
}

function setPercentRaised (currentAmountRaised, initialGoalAmount) {
    const percentRaisedDecimal = currentAmountRaised / initialGoalAmount;
    const percentRaisedInt = parseInt(percentRaisedDecimal * 100);
    document.getElementById("goal-percent-complete").innerText = percentRaisedInt + "%";
    document.getElementById("progress").style.width = percentRaisedInt + '%';
}

function setNumSponsors (numSponsors) {
    let formattedNumSponsors = formatNumber(numSponsors);
    document.getElementById("number-sponsors").innerText = formattedNumSponsors;
}

function setDaysRemaining(numDays) {
    document.getElementById("days-remaining").innerText = numDays;
}

function calculateDaysRemaining (endDate) {
    return '12';
}

function updateThermometerData(data) {
    console.log('updating thermometer with:');
    console.log(data);
    
    const initialGoalAmount = data.initialGoalAmount;
    const currentAmountRaised = data.amountRaised;
    const numSponsors = data.numSponsors;

    setInitialGoalAmount(initialGoalAmount);
    setCurrentAmountRaised(currentAmountRaised);
    setPercentRaised(currentAmountRaised, initialGoalAmount);
    setNumSponsors(numSponsors);
    const numDaysRemaining = calculateDaysRemaining(data.endDate);
    setDaysRemaining(numDaysRemaining);
}

function getDonationData() {
    // let donationApiEndpoint = 'https://bqooixhppfybqw64lxkni7sjxi0jiyll.lambda-url.us-east-1.on.aws/';
    let donationApiEndpoint = 'https://api.frc.org/api/campaign-thermometer/';
    const campaignToUse = 'FYE_2022';

    return fetch(donationApiEndpoint)
      .then(raw => raw.json())
      .then(json => json.find(x => x.campaign_group === campaignToUse))
      .then(campaign => {
        return {
            initialGoalAmount: campaign.campaign_goal,
            amountRaised: campaign.sum_gifts,
            numSponsors: campaign.num_donors,
            campaignDescription: campaign.campaign_desc,
            numGifts: campaign.num_gifts,
            startDate: campaign.start_date,
            endDate: campaign.end_date            
        };
      })
      .catch(e => {
          console.log('There is no campaign at this time');
          console.log(e);
          document.getElementById('donation-thermometer-error').removeAttribute('hidden');
      });
}

getDonationData().then(donationData => {
    updateThermometerData(donationData);
});
