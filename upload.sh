#! /bin/bash
aws s3 cp donation-thermometer.js s3://journity-scripts/thermometer/ --acl public-read
aws s3 cp iframe.html s3://journity-scripts/thermometer/ --acl public-read
aws s3 cp donation-thermometer.css s3://journity-scripts/thermometer/ --acl public-read
aws s3 cp --recursive assets/ s3://journity-scripts/thermometer/assets/ --acl public-read
