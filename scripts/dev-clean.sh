#!/bin/bash
set -e

echo "🧹 Cleaning development environment..."

# Kill existing processes
killall -9 node 2>/dev/null || true
sleep 2

# Remove build artifacts
rm -rf .next node_modules/.cache .swc .turbo

# Ensure middleware-manifest exists
mkdir -p .next/server
if [ ! -f .next/server/middleware-manifest.json ]; then
  cat > .next/server/middleware-manifest.json << 'EOF'
{
  "sortedMiddleware": [],
  "middleware": {},
  "functions": {},
  "version": 2
}
EOF
fi

echo "✅ Environment cleaned, starting dev server..."
npm run dev
