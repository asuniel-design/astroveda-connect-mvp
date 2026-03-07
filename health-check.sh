#!/bin/bash
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001)

if [ $STATUS -ne 200 ]; then
  echo "[$(date)] AstraVeda Offline (Status: $STATUS). Initiating Self-Healing..."
  pm2 restart astraveda-engine
else
  echo "[$(date)] AstraVeda Sovereign: Fully Operational."
fi
