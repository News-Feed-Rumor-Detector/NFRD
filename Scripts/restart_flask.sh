#!/bin/bash

# Stop the Flask app
pkill -f "python3 -m server"

cd /home/nfrd/Server

# Activate the Python environment
source env/bin/activate

# Restart the Flask app
python3 -m server &

echo "Flask app restarted at $(date)"
