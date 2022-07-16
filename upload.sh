#! /bin/bash
aws s3 cp donation-thermometer.js s3://journity-scripts/anthony-test/ --acl public-read
aws s3 cp iframe.html s3://journity-scripts/anthony-test/ --acl public-read
