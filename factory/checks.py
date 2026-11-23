"""PPWCode validation. Run from the checkout being tested."""

import argparse
import os
import shutil
import subprocess
from pathlib import Path


def run(command, env):
    print(f"> {' '.join(command)}", flush=True)
    subprocess.run(command, env=env, check=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--setup", action="store_true", help="install dependencies and Chromium only")
    parser.add_argument("--port", type=int, default=4200, help="port for the Playwright demo server")
    args = parser.parse_args()
    env = {**os.environ, "CI": "true", "PPW_E2E_PORT": str(args.port)}
    npm = "npm.cmd" if os.name == "nt" else "npm"
    if not Path("node_modules/@angular/cli/package.json").exists():
        run([npm, "ci", "--prefer-offline"], env)
    if args.setup:
        run([npm, "exec", "--", "playwright", "install", "chromium"], env)
        return

    run([npm, "run", "ci:lint"], env)
    build = [npm, "run", "ci:build-libs"]
    if os.name == "nt":
        git = shutil.which("git.exe")
        bash = Path(git).resolve().parents[1] / "bin" / "bash.exe" if git else None
        if not bash or not bash.is_file():
            raise SystemExit("Git for Windows Bash is required to build the SDK libraries")
        build.extend(["--script-shell", str(bash)])
    run(build, env)
    run([npm, "run", "ci:test-libs"], env)
    run([npm, "run", "ci:test-e2e"], env)


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as error:
        raise SystemExit(error.returncode)
