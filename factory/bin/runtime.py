import os
import time
from contextlib import contextmanager
from pathlib import Path

if os.name == "nt":
    import msvcrt
else:
    import fcntl

REPO = Path(__file__).resolve().parents[2]
FACTORY = REPO / "factory"
JOBS = FACTORY / "jobs"
BIN = FACTORY / "bin"


def worktree(job_id):
    return REPO / ".worktrees" / job_id


def port(job_id, config, offset):
    return config["ports"]["base"] + int(job_id.split("-", 1)[0]) * config["ports"]["step"] + offset


@contextmanager
def locked(path, *, wait=True):
    """Release the interprocess lock automatically when the file closes."""
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a+b") as handle:
        while True:
            try:
                if os.name == "nt":
                    msvcrt.locking(handle.fileno(), msvcrt.LK_NBLCK, 1)
                else:
                    fcntl.flock(handle, fcntl.LOCK_EX | fcntl.LOCK_NB)
            except OSError as error:
                if not wait or error.errno not in {11, 13, 36}:
                    raise
                time.sleep(0.25)
            else:
                break
        yield
