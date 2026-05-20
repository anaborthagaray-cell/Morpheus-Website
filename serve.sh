#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  Morpheus — local dev server
#  Serves the project on the local network so any device on the
#  same Wi-Fi can open it at  http://<YOUR-IP>:8080
# ─────────────────────────────────────────────────────────────

PORT=8080
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Detect local IP (tries Wi-Fi first, then Ethernet)
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null \
        || ipconfig getifaddr en1 2>/dev/null \
        || echo "127.0.0.1")

echo ""
echo "  ╔══════════════════════════════════════════════╗"
echo "  ║        Morpheus Local Dev Server             ║"
echo "  ╚══════════════════════════════════════════════╝"
echo ""
echo "  Project : $PROJECT_DIR"
echo "  Port    : $PORT"
echo ""
echo "  ┌─ Open on THIS computer ──────────────────────"
echo "  │  http://localhost:$PORT"
echo "  │"
echo "  ├─ Open on the iMac (same Wi-Fi) ─────────────"
echo "  │  http://$LOCAL_IP:$PORT"
echo "  │"
echo "  └─ Press  Ctrl + C  to stop the server ───────"
echo ""

cd "$PROJECT_DIR"
python3 -m http.server "$PORT" --bind 0.0.0.0
