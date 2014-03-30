#!/bin/bash
sed -i "s/REPLACEME/${BACKEND_URL}/" /var/www/scripts/config.js
nginx