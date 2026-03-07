#!/bin/bash
echo "🚀 Initiating AstraVeda Sovereign Launch..."
npx kill-port 3001
rm -rf .next
npm run dev -- -p 3001
