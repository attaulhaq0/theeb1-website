# theEb1 — website

Freelance web development for an immigration-services business: responsive visa guidance, company pages, resources and consultation journeys.

[Live website](https://theeb1.com/) · [Design notes](docs/design-notes.md) · [Website portfolio](https://github.com/attaulhaq0/website-work)

![theEb1 desktop and mobile website](docs/images/devices.webp)

## Work

- Twelve public routes with shared navigation, typography, reusable content sections and mobile menus.
- Animated service headlines, testimonials, pricing, consultation and contact journeys.
- React, TypeScript, Vite, Tailwind CSS and PHP/PDO content and form endpoints.
- Environment-based backend configuration, shared form quotas and offline mail-security tests.
- Document title, description, Open Graph and Twitter metadata in the shared HTML entry.

<details>
<summary>Complete landing page</summary>

[Open desktop capture](docs/images/homepage-full.webp) · [Open mobile capture](docs/images/homepage-mobile-full.webp)

![Complete theEb1 desktop landing page](docs/images/homepage-full.webp)

</details>

## Run locally

Requires Node.js 22. PHP 8.1 or later is needed for the optional backend and offline tests.

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

The local interface uses fallback content and simulated form success. Vite serves the visual preview without executing PHP or contacting the production API.

```sh
npm run typecheck
npm run build
npm audit --audit-level=high
php tests/forms-security.php
```

The 183-assertion PHP suite covers shared quotas, concurrent requests, fixed confirmation templates and configuration failures without sending mail or connecting to a database. GitHub Actions repeats the checks and scans the working tree and full Git history for credentials.

## Code and deployment

`src/pages` contains the public routes; `src/components` holds the shared UI. `src/lib/api.ts` selects the production PHP integration. `public/api` contains content reads and enquiry endpoints. Build output is `dist`; PHP requires a PHP-capable host and appropriate SPA rewrites.

Configure `DB_HOST`, `DB_NAME`, `DB_USER` and `DB_PASS` privately on the server. Form quota storage must stay outside the document root. Visitor confirmations default to disabled. Follow [form deployment instructions](docs/form-security.md) and [database setup](database/README.md). The setup schema drops and recreates tables: use a new local database.

Maintained by [Sheikh Atta-ul-Haq](https://github.com/attaulhaq0).
