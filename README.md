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

### Required
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Get from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
- `OPENAI_API_KEY`: Get from [OpenAI Platform](https://platform.openai.com/)
- `NEYNAR_API_KEY`: Get from [Neynar](https://neynar.com/)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

### Optional
- `NEXT_PUBLIC_APP_URL`: Your app URL (defaults to localhost:3000)
- `NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS`: ERC-20 token contract address for payments

## Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the following SQL in your Supabase SQL editor:

```sql
-- Users table
CREATE TABLE users (
  fid TEXT PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  username TEXT NOT NULL,
  avatar_url TEXT,
  token_balance INTEGER DEFAULT 10,
  voting_power INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  badges TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Debates table
CREATE TABLE debates (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  chicken_agent_personality TEXT DEFAULT 'aggressive',
  egg_agent_personality TEXT DEFAULT 'logical',
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed')),
  transcript JSONB DEFAULT '[]',
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  tournament_id TEXT,
  creator_fid TEXT,
  is_custom BOOLEAN DEFAULT FALSE,
  clip_url TEXT,
  share_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Votes table
CREATE TABLE votes (
  id TEXT PRIMARY KEY,
  debate_id TEXT REFERENCES debates(id) ON DELETE CASCADE,
  user_fid TEXT REFERENCES users(fid) ON DELETE CASCADE,
  choice TEXT NOT NULL CHECK (choice IN ('chicken', 'egg')),
  tokens_used INTEGER DEFAULT 1,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tournaments table
CREATE TABLE tournaments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  theme TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  prize_pool INTEGER DEFAULT 1000,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agents table
CREATE TABLE agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL CHECK (name IN ('Chicken', 'Egg')),
  base_personality TEXT NOT NULL,
  system_prompt TEXT NOT NULL,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  total_votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default agents
INSERT INTO agents (id, name, base_personality, system_prompt) VALUES
('chicken-agent', 'Chicken', 'aggressive', 'You are the Chicken in a philosophical debate...'),
('egg-agent', 'Egg', 'logical', 'You are the Egg in a philosophical debate...');

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE debates ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now - customize based on your needs)
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations on debates" ON debates FOR ALL USING (true);
CREATE POLICY "Allow all operations on votes" ON votes FOR ALL USING (true);
CREATE POLICY "Allow all operations on tournaments" ON tournaments FOR ALL USING (true);
CREATE POLICY "Allow all operations on agents" ON agents FOR ALL USING (true);
```

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
