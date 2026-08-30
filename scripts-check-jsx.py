#!/usr/bin/env python3
"""
Catch JSX opening tags stripped during file writes.

Heredoc writes intermittently drop a lone "<a" or "<img" line, leaving a blank
line followed by attributes. The build error points at the attribute rather than
the missing tag, which made this slow to diagnose repeatedly. Run before
building to catch it in one pass.
"""
import glob, sys

ATTRS = ('href=', 'key=', 'src=', 'target=', 'rel=', 'alt=')
problems = []

for path in glob.glob("app/**/*.js", recursive=True) + glob.glob("lib/**/*.js", recursive=True):
    if 'node_modules' in path or '.next' in path:
        continue
    with open(path) as f:
        lines = f.read().split('\n')
    for i in range(len(lines) - 1):
        if lines[i].strip() == '' and any(lines[i + 1].strip().startswith(a) for a in ATTRS):
            problems.append(f"{path}:{i + 2}  attribute with no opening tag")

if problems:
    print("Stripped JSX tags found:")
    for p in problems:
        print("  " + p)
    sys.exit(1)

print("JSX tags OK")
