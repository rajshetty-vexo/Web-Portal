"""
Pixtron Backend 24/7 Keep-Alive Watchdog
Monitors and runs the FastAPI backend continuously.
If the backend process crashes or terminates unexpectedly,
it automatically restarts within 2 seconds.
"""

import sys
import time
import subprocess
from pathlib import Path

# Fix Windows console encoding for Unicode output
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

BACKEND_DIR = Path(__file__).resolve().parent
PYTHON_EXE = sys.executable

def run_backend_loop():
    print("=" * 65)
    print("  [*] PIXTRON BACKEND 24/7 KEEP-ALIVE SUPERVISOR")
    print(f"  [*] Working Directory: {BACKEND_DIR}")
    print(f"  [*] Python Interpreter: {PYTHON_EXE}")
    print("  [*] Service Endpoint: http://localhost:5000/api/drug-verify")
    print("  [*] Press Ctrl+C at any time to stop the supervisor.")
    print("=" * 65)

    restart_count = 0

    while True:
        print(f"\n[+] Starting FastAPI server (Launch #{restart_count + 1})...")
        start_time = time.time()

        try:
            # Run app.py with the venv python
            process = subprocess.Popen(
                [PYTHON_EXE, "-m", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5000"],
                cwd=str(BACKEND_DIR)
            )
            exit_code = process.wait()

            runtime = time.time() - start_time
            print(f"[!] Server process exited with code {exit_code} after {runtime:.1f}s.")

            # If user interrupted with Ctrl+C, exit gracefully
            if exit_code in [0, -2, 130]:
                print("[*] Server stopped cleanly. Exiting supervisor.")
                break

        except KeyboardInterrupt:
            print("\n[*] Received KeyboardInterrupt. Stopping server...")
            try:
                process.terminate()
            except Exception:
                pass
            break
        except Exception as e:
            print(f"[!] Supervisor error: {e}")

        restart_count += 1
        print(f"[!] Auto-restarting server in 2 seconds... (Total restarts: {restart_count})")
        time.sleep(2)

if __name__ == "__main__":
    run_backend_loop()
