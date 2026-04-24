#!/bin/bash
set -euo pipefail

echo "Installing dependencies..."
npm install

echo "Generating Prisma client..."
npm run db:generate

echo "Starting Next.js app on http://localhost:3000"
npm run dev
