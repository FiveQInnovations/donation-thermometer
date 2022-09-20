FRC Donation Thermometer
===

This is a donation thermometer to display progress of a specific fundraising campaign from Family Research Council.

# Running Locally
I edited `iframe.html` to comment out the files from `[https://journity-scripts](https://journity-scripts)` and instead put in the relative path to the local file. 
Then serve the files locally and open the index file in a browser.

I used [http-server from npm](https://www.npmjs.com/package/http-server) to serve my local files: `npx http-server`

# Publish
These source files need to be published in order to be used outside of local environment.
Anthony can publish by running the `upload` script.
I guess that can't easily be done by anyone else...
