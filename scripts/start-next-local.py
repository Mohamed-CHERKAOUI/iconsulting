import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NODE = Path(r"C:\Program Files\nodejs\node.exe")
NEXT = ROOT / "node_modules" / "next" / "dist" / "bin" / "next"

stdout = open(ROOT / "next-dev.log", "ab")
stderr = open(ROOT / "next-dev.err.log", "ab")

subprocess.Popen(
    [str(NODE), str(NEXT), "dev", "-p", "3000"],
    cwd=ROOT,
    stdout=stdout,
    stderr=stderr,
    stdin=subprocess.DEVNULL,
    creationflags=subprocess.CREATE_NEW_PROCESS_GROUP | subprocess.DETACHED_PROCESS,
)
