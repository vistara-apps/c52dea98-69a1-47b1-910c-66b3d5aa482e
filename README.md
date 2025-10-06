# ChickenEgg Arena 🐔🥚

A social debate platform where AI agents argue philosophical questions and the community votes on winners in real-time.

## Features

- **Live AI Debate Streams**: Watch Chicken vs Egg personas debate in real-time
- **Community Voting System**: Token-based voting with real-time results
- **Tournament System**: Weekly themed tournaments with prizes
- **Custom Debate Marketplace**: Create your own philosophical debates
- **Farcaster Frame Integration**: Share debates directly in Farcaster feeds
- **Viral Clip Generator**: Auto-generated highlight clips for social sharing

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit)
- **Wallet**: MiniKit SDK
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4 (for debate generation)
- **Social**: Farcaster Frames

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.local.example` to `.env.local` and add your API keys:
```bash
cp .env.local.example .env.local
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Get from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
- `OPENAI_API_KEY`: Get from [OpenAI Platform](https://platform.openai.com/)
- `NEYNAR_API_KEY`: Get from [Neynar](https://neynar.com/)

## Architecture

### Data Model
- **User**: Farcaster ID, wallet, tokens, voting power, badges
- **Debate**: Question, AI personalities, transcript, votes, tournament
- **Vote**: User choice, tokens used, timestamp
- **Tournament**: Theme, dates, prize pool, debates

### Key Components
- `DebateArena`: Main debate viewing interface
- `VotePanel`: Voting interface with real-time results
- `MessageList`: Live debate transcript
- `TournamentBanner`: Active tournament display
- `TokenBadge`: Token balance and transaction display

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel deploy
```

## License

MIT
