# Chalet Manager

Chalet Manager is a bilingual Next.js platform for managing luxury chalet rentals. It combines a marketing site, role-based dashboards for tenants, owners and administrators, media management powered by Cloudinary and a prepared Stripe Checkout integration. The stack follows the original project brief: App Router, JavaScript only, Tailwind CSS, Mongoose, NextAuth, Cloudinary and Stripe.

## Key Features

- **Bilingual public site** – French and English locales for home, services, FAQ, contact, legal, sign in and sign up pages.
- **Role-aware dashboards** – Separate experiences for tenants, owners and admins protected by middleware and JWT sessions.
- **NextAuth credentials flow** – Credential-based login backed by MongoDB with hashed passwords and role propagation inside the session.
- **Owner onboarding** – Owners can update their profile, build a chalet listing, upload media to Cloudinary (with local fallback) and accept the partnership contract before review.
- **Tenant requests** – Tenants create, view and delete stay requests stored in MongoDB collections.
- **Admin control centre** – Super admins review chalet submissions, adjust publication status and browse all accounts and rental requests.
- **Dynamic chalet pages** – Published chalets receive SEO-friendly pages exposed via slugs suitable for Google Business listings.
- **Stripe-ready** – Checkout session endpoint implemented with the official Stripe SDK to enable payments once keys are provided.
- **PWA tooling** – Manifest, service worker registration and an install prompt for owner/admin dashboards.

## Tech Stack

- [Next.js 16 App Router](https://nextjs.org/) with React 19.
- [Tailwind CSS v4](https://tailwindcss.com/) utility styling.
- [NextAuth v5](https://authjs.dev/) Credentials provider for authentication.
- [Mongoose](https://mongoosejs.com/) ODM for MongoDB models.
- [Cloudinary](https://cloudinary.com/) for media storage with local fallback.
- [Stripe](https://stripe.com/) SDK for Checkout sessions.

## Project Structure

```
app/
├── layout.js                 # Global layout and metadata
├── page.js                   # Redirect to default locale
├── manifest.js               # PWA manifest
├── [lang]/                   # Locale specific marketing + auth pages
│   ├── layout.jsx            # Navbar, footer and dictionary provider
│   ├── page.jsx              # Home
│   ├── services/page.jsx     # Services overview
│   ├── faq/page.jsx          # FAQ
│   ├── contact/page.jsx      # Contact
│   ├── terms/page.jsx        # Terms of service
│   ├── privacy/page.jsx      # Privacy policy
│   ├── signin/page.jsx       # Sign-in form (NextAuth)
│   ├── signup/page.jsx       # Registration form
├── tenant/page.jsx           # Tenant dashboard
├── owner/page.jsx            # Owner dashboard
├── admin/page.jsx            # Admin dashboard
├── chalets/[slug]/page.jsx   # Public chalet pages
└── api/…                     # Route handlers for auth, CRUD, uploads, Stripe
components/                   # Reusable UI pieces
lib/
├── auth/                     # NextAuth configuration helpers
├── cloudinary.js             # Cloudinary client initialisation
├── db/connect.js             # MongoDB connection caching
├── serializers/chalet.js     # Serializers for chalet documents
├── utils/slugify.js          # Slug generation helper
models/                       # Mongoose models (User, Chalet, RentalRequest)
public/
├── icons/                    # PWA icons
├── uploads/                  # Local upload fallback
└── sw.js                     # Service worker stub
```

## Data Layer & Authentication

- `lib/db/connect.js` caches the MongoDB connection for both server components and route handlers.
- `models/User.js` includes bcrypt password hashing and exposes a `comparePassword` helper used by NextAuth.
- `lib/auth/options.js` configures the Credentials provider and JWT/session callbacks so every session contains the user id and role.
- `middleware.js` uses `getToken` from NextAuth to gate server-rendered pages and API routes by role.

## Environment Variables

Create a `.env.local` file with the required secrets before running the app:

```
AUTH_SECRET=change-me # NEXTAUTH_SECRET is also supported
MONGODB_URI=mongodb://localhost:27017/chalet-manager
APP_URL=http://localhost:3000

# Optional – enables named database selection
# MONGODB_DB=chalet-manager

# Optional – enables Cloudinary uploads
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLOUDINARY_FOLDER=chalet-manager

# Optional – enables Stripe Checkout session creation
STRIPE_SECRET_KEY=sk_test_...
```

If Cloudinary values are omitted the upload endpoint falls back to saving files in `public/uploads/` so development can proceed offline.

## Development

```bash
npm install
npm run dev
```

Visit <http://localhost:3000>. The default locale is French (`/fr`).

### Seeding Roles

1. Start a MongoDB instance and ensure `MONGODB_URI` points to it.
2. Register via `/fr/signup` as a tenant or owner to create accounts.
3. Promote a user to admin inside MongoDB (set `role` to `admin`) to access `/admin`.

### Stripe

With `STRIPE_SECRET_KEY` set, trigger a checkout session:

```bash
curl -X POST http://localhost:3000/api/stripe/session \
  -H "Content-Type: application/json" \
  -d '{}'
```

The response includes a `url` that can be opened in a browser while using Stripe test keys.

## Deployment Notes

- The project expects the App Router build output (Vercel, Netlify, etc.) with environment variables configured.
- Middleware relies on `AUTH_SECRET`; production deployments must define it for JWT verification.
- Ensure the `public/uploads/` directory is writable if the Cloudinary fallback is used in production (recommended to keep Cloudinary enabled instead).
