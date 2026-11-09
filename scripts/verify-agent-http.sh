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
echo "=== SSR HTML text length (no JS) ==="
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
for path in / /Docs /Showcase /registry /ai; do
  html="$(curl -sS -H 'Accept: text/html' "$BASE$path")"
  len="$(node --input-type=module -e "
import { documentTextLength, firstHeadingText } from '${ROOT}/src/lib/agent/ssr-html.js';
const html = process.env.HTML ?? '';
console.log(documentTextLength(html), firstHeadingText(html));
" HTML="$html")"
  echo "$path chars h1: $len"
done

echo ""
echo "=== robots.txt ==="
curl -sS "$BASE/robots.txt"

echo ""
echo "=== sitemap.xml (first lines) ==="
curl -sS "$BASE/sitemap.xml" | head -8
