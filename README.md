# regkata

A small, hands-on CLI for learning regular expressions. It works like a kata: short lessons, immediate feedback, repeat.

## Why it exists

Regex is best learned by doing, not by skimming a cheat sheet. regkata gives you a prompt, test cases, and a place to try patterns until they click.

## Install

```bash
bun install -g regkata
```

Or:

```bash
npm install -g regkata
```

## Run

```bash
regkata
```

## Controls

- Arrow keys: select a lesson
- Enter: submit your regex
- `?`: show hint
- `exit`: return to menu

## What you get

- 36 lessons, ordered from fundamentals to advanced pattern design
- White Belt fundamentals, Yellow Belt real-world patterns, Orange Belt advanced drills, Green Belt expert challenges
- Instant feedback against multiple test cases
- Progress saved between sessions
- Clean, readable CLI built with Ink

## Lessons

The full lesson list lives on the website so the README stays lean. Run `regkata` to see the catalog in the CLI.
If you are contributing lessons, use `docs/lessons.md` for the authoring rules and checklist.

## Development

```bash
git clone https://github.com/JR-G/regkata.git
cd regkata
bun install
```

```bash
bun run dev
```

```bash
bun run typecheck
```

```bash
bun run lint
```

```bash
bun run build
```

```bash
bun run check
```

## Tests

```bash
bun run test
```

## Releases

Create a release PR with a semver bump:

```bash
bun run release patch
```

After that PR is merged to `main`, tag and publish:

```bash
bun run release:tag
```

Publishing is handled by GitHub Actions on `v*` tags.

## License

MIT © James Glenn
