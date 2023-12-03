<div style="text-align:center;">
<img src="https://github.com/martinval11/exams-5to/blob/main/public/icon-512x512.png?raw=true" width="150" height="150">

# Exams 5to
School Exams for 5ºA
</div>

Languages Available:
- [English](README.md)
- [Español](README.es.md)

## Setup

```sh
git clone https://github.com/martinval11/exams-5to
cd exams-5to
bun install
```

Create a `.env.local` file and put the following code:

```
NEXT_PUBLIC_EXAMS_TABLE_DEV= {{ TABLE_OF_YOUR_SUPABASE_DB }}
NEXT_PUBLIC_SUPABASE_URL= {{ YOUR SUPABASE URL DB }}
NEXT_PUBLIC_SUPABASE_KEY= {{ YOUR SUPABASE KEY }}
NEXT_PUBLIC_SECRET_KEY= {{ SECRET KEY FOR crypto.js }}
NEXT_PUBLIC_FIREBASE_VAPID_KEY= {{ FIREBASE MESSAGING VAPID KEY FOR NOTIFICATIONS }}
```

Now run:
```
$ bun dev

   ▲ Next.js 14.0.3
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 7.7s
```

## Setup for testing
This project uses Cypress, first, you need to create a `cypress.env.json` file and put the following code:
```json
{
  "LOGIN_USERNAME": "Username",
  "LOGIN_PASSWORD": "Password"
}
```
This creates two environment variables: `LOGIN_USERNAME` and `LOGIN_PASSWORD`. These are necessary for test the `/login` page.

## Scripts
- `bun dev` - Starts development environment
- `bun build` - Build for production
- `bun run test` - Run tests with Cypress