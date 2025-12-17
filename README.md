# regkata

> Master regular expressions through practice, one kata at a time.

An interactive CLI tool that teaches you regex the way martial artists learn moves—through deliberate practice and progressive challenges. Inspired by vimtutor, regkata guides you from regex basics to advanced patterns with hands-on lessons.

## Why regkata?

Regular expressions are powerful but intimidating. Most tutorials throw syntax at you and hope it sticks. regkata takes a different approach: learn by doing. Each lesson presents a challenge, you write the regex, and get instant feedback. No copy-paste, no passive reading—just you and the pattern.

## Features

- ✨ **15 Progressive Lessons** - From literal characters to complex patterns
- 🎯 **Real-time Validation** - Test your regex against multiple cases instantly
- 💾 **Progress Tracking** - Pick up exactly where you left off
- 💡 **Hint System** - Stuck? Type `?` for guidance
- 🎨 **Beautiful CLI** - Clean, colorful interface built with React
- ⚡ **Lightning Fast** - Powered by Bun for instant startup

## Installation

Install globally with Bun:

```bash
bun install -g regkata
```

Or with npm:

```bash
npm install -g regkata
```

## Usage

Start your training:

```bash
regkata
```

### Controls

- **Arrow keys** - Navigate menu options
- **Enter** - Submit your regex or select a lesson
- **`?`** - Show hint for the current lesson
- **`exit`** - Return to menu

### Learning Path

Your progress is automatically saved. When you return:
- ✓ Completed lessons are marked
- Resume from where you left off
- Or jump to any lesson to review

## What You'll Learn

```
Lesson  1: Literal Characters         →  Match exact text
Lesson  2: The Dot Metacharacter      →  Match any character
Lesson  3: Character Classes          →  Match sets of characters
Lesson  4: Character Ranges           →  Match ranges like [0-9]
Lesson  5: Negated Character Classes  →  Match anything BUT these
Lesson  6: Shorthand Character Classes →  \w, \d, \s shortcuts
Lesson  7: The Plus Quantifier        →  Match one or more
Lesson  8: The Star Quantifier        →  Match zero or more
Lesson  9: The Question Mark          →  Make optional
Lesson 10: Anchors - Start            →  ^ matches string start
Lesson 11: Anchors - End              →  $ matches string end
Lesson 12: Word Boundaries            →  \b matches word edges
Lesson 13: Alternation                →  Match this OR that
Lesson 14: Grouping                   →  Combine patterns
Lesson 15: Escaping Special Chars     →  Match literal . ? * etc.
```

## Development

Clone and install dependencies:

```bash
git clone https://github.com/JR-G/regkata.git
cd regkata
bun install
```

Run in development mode:

```bash
bun run dev
```

Type checking:

```bash
bun run typecheck
```

Build for production:

```bash
bun run build
```

## License

MIT © James Glenn
