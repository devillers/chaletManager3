# Chalet Manager

**Chalet Manager** is a full-stack web application built with the latest Next.js App Router. It is designed to help chalet owners manage their rental properties and allows tenants and admins to interact through dedicated dashboards. The app features a public-facing website (vitrine) for showcasing chalet listings (with dynamic pages for each chalet), user authentication with role-based access (Tenant, Owner, Admin), and various modern web capabilities like an installable PWA and multi-language support (French/English).

## Tech Stack

* **Next.js (App Router)** – Full-stack React framework for server-side rendering, routing, and API routes.
* **Tailwind CSS** – Utility-first CSS framework for responsive UI design.
* **Framer Motion** – Animation library for React to build interactive UI transitions.
* **MongoDB & Mongoose** – NoSQL database and ODM for data modeling and persistence.
* **NextAuth (or JWT)** – Authentication system with credential-based login and session management.
* **Cloudinary** – Media storage and optimization platform for managing chalet images.
* **Stripe (Optional)** – Prepared for payment integration.
* **PWA (Progressive Web App)** – Installable app experience with custom install button (visible to Owner and Admin roles only).
* **i18n** – Manual language selection between French and English, using centralized translation files.

## Features

* Public marketing site with bilingual support (FR/EN)
* Responsive menu: Home, Services, FAQ, Contact, Signin, Signup
* User registration with role selection (Tenant or Owner)
* Terms & Privacy Policy agreement during signup
* Dashboards:

  * **Tenant Dashboard:** CRUD for profile, booking dates
  * **Owner Dashboard:** CRUD for chalet listing, calendar (iCal), images (Cloudinary), contract agreement
  * **Admin Dashboard:** Approve listings, manage users, publish chalet portfolio pages
* Chalet public pages generated via dynamic slugs
* Stripe integration (prepared)
* PWA support (Install prompt available only for Owner/Admin roles)
* Protected routes with middleware and role-based access

## Getting Started

### Prerequisites

* Node.js >= 18
* MongoDB instance or MongoDB Atlas
* Cloudinary account (for image management)
* Stripe account (optional, for payment integration)

> ⚠️ You should ensure at least one Admin user is created manually or seeded at startup to access admin functionalities.

### Installation

```bash
git clone https://github.com/your-username/chalet-manager.git
cd chalet-manager
npm install
```

### Environment Variables

Create a `.env.local` file and configure the following variables:

```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Development

```bash
npm run dev
```

App will run at [http://localhost:3000](http://localhost:3000)

## Project Structure

```bash
app/
├── [lang]/              # Multilingual public pages (fr, en)
│   ├── layout.jsx       # Shared layout (navbar, footer)
│   ├── page.jsx         # Home
│   ├── services/        # Services page
│   ├── faq/             # FAQ
│   ├── contact/         # Contact page
│   ├── signin/          # Login page
│   ├── signup/          # Registration page
├── tenant/              # Tenant dashboard
│   ├── layout.jsx       # Layout for tenant
│   └── page.jsx         # Dashboard home
├── owner/               # Owner dashboard
│   ├── layout.jsx       # Layout for owner
│   └── page.jsx         # Dashboard home
├── admin/               # Admin dashboard
│   ├── layout.jsx       # Layout for admin
│   └── page.jsx         # Dashboard home
├── chalets/[slug]/      # Public chalet pages
├── api/                 # API routes
│   ├── auth/[...nextauth]/route.js
│   ├── auth/register/route.js
│   └── ...
├── locales/             # JSON translation files for i18n (e.g. fr/common.json, en/common.json)
├── lib/ or utils/       # Translation helpers (getDictionary), Cloudinary, DB, auth utilities
```

## Authentication and Roles

* **NextAuth or JWT** based auth (credentials provider)
* Session-based authentication with role persistence (Tenant, Owner, Admin)
* Middleware protects `/tenant`, `/owner`, `/admin` routes
* Dashboards and API endpoints restricted per role
* Passwords are hashed using bcrypt
* Consider adding email verification for additional security

## PWA Integration

* `manifest.json` and service worker registered
* Works offline for cached assets
* Custom install button only visible to Owner and Admin roles
* Note: iOS Safari does not support install prompts — users must manually "Add to Home Screen"

## Stripe Integration

* Stripe libraries are installed
* `.env.local` includes keys
* Prepared backend endpoint for Checkout session
* Real payments should only be enabled in production with HTTPS and full audit/security review

## Deployment

Recommend deployment: **Vercel**

```bash
npm run build
npm start
```

Add environment variables in Vercel dashboard.
Ensure `NEXTAUTH_URL` matches deployment domain.

## License

MIT License

---

Built with ❤️ using Next.js, Tailwind CSS, MongoDB, and Cloudinary
