
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
    if (initialGoalAmount === 0) {
        document.getElementById("goal-percent-complete").innerText = '0%'
        return;
    }
    const percentRaisedDecimal = currentAmountRaised / initialGoalAmount;
    const percentRaisedInt = parseInt(percentRaisedDecimal * 100);
    document.getElementById("goal-percent-complete").innerText = percentRaisedInt + "%";

    const limitedPercentRaised = percentRaisedInt > 100 ? 100 : percentRaisedInt;
    document.getElementById("progress").style.width = limitedPercentRaised + '%';
}

function setNumSponsors (numSponsors) {
    let formattedNumSponsors = formatNumber(numSponsors);
    document.getElementById("number-sponsors").innerText = formattedNumSponsors;
}

function setDaysRemaining(numDays) {
    document.getElementById("days-remaining").innerText = numDays;
}

function calculateDaysRemaining (endDateStr) {
    const endDate = new Date(endDateStr);
    const today = new Date();

    const millisPerDay = 1000 * 60 * 60 * 24;
    const diffInMs = endDate - today;
    const diffInDays = diffInMs / millisPerDay;
    console.log('days: ' + diffInDays);
    let rounded = Math.round(diffInDays);
    if (rounded < 0) {
        return 0;
    }
    return rounded;
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
    const donationApiEndpoint = 'https://api.frc.org/api/campaign-thermometer/';
    const campaignToUse = 'NOV_2022';

    return fetch(donationApiEndpoint)
      .then(raw => raw.json())
      .then(json => json.find(x => x.campaign_group === campaignToUse))
      .then(campaign => {
        return {
            initialGoalAmount: Number(campaign.campaign_goal),
            amountRaised: Number(campaign.sum_gifts),
            numSponsors: Number(campaign.num_donors),
            campaignDescription: campaign.campaign_desc,
            numGifts: Number(campaign.num_gifts),
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
