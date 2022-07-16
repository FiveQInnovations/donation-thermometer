#! /bin/bash
echo 'Uploading to S3'
aws s3 cp donation-thermometer.js s3://journity-scripts/anthony-test/
aws s3 cp iframe.html s3://journity-scripts/anthony-test/
echo 'Done'
