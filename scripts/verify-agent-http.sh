#!/usr/bin/env bash
set -euo pipefail
BASE="${1:-http://127.0.0.1:8787}"

echo "=== homepage HTML Vary ==="
curl -sS -i -H 'Accept: text/html' "$BASE/" | head -20

echo ""
echo "=== homepage markdown ==="
curl -sS -i -H 'Accept: text/markdown' "$BASE/" | head -25

echo ""
echo "=== 404 markdown ==="
curl -sS -L -i -H 'Accept: text/markdown' "$BASE/some-path-that-does-not-exist" | head -25

echo ""
echo "=== api problem 404 ==="
curl -sS -i "$BASE/api/no-such" | head -20

echo ""
echo "=== llms.txt ==="
curl -sS -i "$BASE/llms.txt" | head -15

echo ""
echo "=== openapi.json ==="
curl -sS "$BASE/openapi.json" | head -c 200; echo

echo ""
echo "=== robots.txt ==="
curl -sS "$BASE/robots.txt"

echo ""
echo "=== sitemap.xml (first lines) ==="
curl -sS "$BASE/sitemap.xml" | head -8
