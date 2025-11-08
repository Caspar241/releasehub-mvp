#!/bin/bash

echo "🏥 Running health checks..."

# Check 1: middleware-manifest.json exists
if [ ! -f .next/server/middleware-manifest.json ]; then
  echo "❌ middleware-manifest.json missing"
  exit 1
fi

# Check 2: Only one dev server running
PROC_COUNT=$(ps aux | grep "next dev" | grep -v grep | wc -l | xargs)
if [ "$PROC_COUNT" -gt 1 ]; then
  echo "❌ Multiple dev servers detected ($PROC_COUNT)"
  exit 1
fi

# Check 3: Server responds on common ports
SERVER_FOUND=0
for PORT in 3000 3001 3002 3003 3004 3005 3006 3007 3008 3009; do
  if curl -s http://localhost:$PORT > /dev/null 2>&1; then
    echo "✅ Server responding on port $PORT"
    SERVER_FOUND=1
    break
  fi
done

if [ "$SERVER_FOUND" -eq 0 ]; then
  echo "⚠️  No server responding on common ports"
fi

echo "✅ All health checks passed"
