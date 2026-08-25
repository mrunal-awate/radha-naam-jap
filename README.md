# Radha Naam Jap Counter — v1

MERN-aligned stack: Next.js (client) + Node/Express (server) + MongoDB Atlas.

## What's built (v1 scope)

- Guest-mode counting — no login required to chant and count
- Email/password auth (register, login)
- Guest count migration — counts made before signing in are saved into the new account
- Multi-mantra support, own URL per mantra for SEO (`/naam-japa-counter/:slug`)
- Local-first tap counting, batched sync to the server every 5 seconds (not one request per tap)
- Statistics page — total japa, active days, average/day, best day

**Deferred to later phases** (per our plan): Premanand page, Streak Challenge, leaderboard, reminders, AI voice chanting, mobile app, premium tier / payments.

## Local setup

### 1. Server
```
cd server
npm install
cp .env.example .env   # fill in MONGODB_URI (Atlas connection string) and JWT_SECRET
npm run seed            # loads the initial mantra list into your DB
npm run dev              # runs on http://localhost:5000
```

### 2. Client
```
cd client
npm install
cp .env.local.example .env.local
npm run dev              # runs on http://localhost:3000
```

Visit `http://localhost:3000`.

## MongoDB Atlas setup (if you haven't already)

1. Create a free cluster at mongodb.com/cloud/atlas
2. Database Access → add a user with a password
3. Network Access → allow your IP (or 0.0.0.0/0 for now, tighten later)
4. Get the connection string from "Connect" → "Drivers" → paste into `server/.env` as `MONGODB_URI`

## Deploying

- **Client → Vercel**: connect the repo, set root directory to `client`, add `NEXT_PUBLIC_API_URL` env var pointing to your deployed API.
- **Server → Render or Railway**: connect the repo, set root directory to `server`, add `MONGODB_URI`, `JWT_SECRET`, `CLIENT_ORIGIN` (your Vercel URL) as env vars, start command `npm start`.
- **Domain**: point a custom domain at your Vercel deployment before you start actively promoting the site — don't launch on a free subdomain and migrate later, you lose SEO progress doing that.

## Known gaps to close before public launch

- No password reset flow yet
- No input sanitization/rate limiting on auth routes — add before going live (brute-force protection at minimum)
- No tests

## AdSense readiness — what's done, what's still yours to do

**Done in this build:**
- About, Contact, Privacy Policy, Terms, Disclaimer pages, linked in the footer
- `sitemap.xml` and `robots.txt` (auto-generated from your live mantra list)
- Real original content per mantra (meaning, how to chant, FAQ) — not just name + audio + counter
- Open Graph tags, canonical URLs, AudioObject structured data
- Logout, playback speed control, working reset

**Still yours to do before applying:**
- Replace the placeholder email in `app/contact/page.js` with a real one
- Fill in `[DATE]` in the Privacy Policy and Terms pages, and have them actually reviewed — these are starting templates, not legal advice
- Write your own About page story (currently has honest placeholder text, marked with a TODO comment) — generic filler is exactly what Google's reviewers discount
- Confirm your mp3 is your own recording or properly licensed — do not use a downloaded devotional recording without rights
- Deploy live, verify on Google Search Console, submit the sitemap, and let it sit indexed for a while before applying — Google reviews live sites, not local dev builds
- Do NOT apply for AdSense the moment this deploys. Give Google time to actually crawl and index it first.
