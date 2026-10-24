# Design and implementation notes

This delivered freelance website presents immigration-services information and guides visitors toward a consultation. The published source preserves the site’s page structure and visual assets for portfolio review; client production systems and private application records are outside that review.

The homepage layers a navy-to-teal background, particle decoration and a centered rotating headline. Teal and emerald accents connect primary buttons with the rest of the visual system. Light content sections make the longer service explanations, testimonials and pricing easier to scan. The interface uses an Inter-first system font stack and shared HSL color tokens in `src/index.css`.

![Desktop homepage](images/home-desktop.png)

Navigation groups visa services and company information on larger screens, then uses a compact menu on smaller screens. Shared page containers, responsive grids and scalable headings carry the same layout language through the 12 routes. The contact page handles consultation and enquiry inputs; the footer provides the newsletter interaction. These client forms use the local preview simulation when the page is not running on the two configured production hostnames.

![Mobile homepage](images/home-mobile.png)

`src/App.tsx` defines the public routes and shared navbar/footer. `src/pages` holds each page. Components such as `HeroSlider`, `CompanyLogos`, `TestimonialCarousel` and `PricingSection` keep homepage sections reusable. React Router handles navigation; Tailwind and the shared UI primitives provide layout and interaction styling.

Content reads and form submissions meet at `src/lib/api.ts`. Local content GETs are skipped so the visual preview uses its in-code content. Local POSTs return a simulated success response. On `theeb1.com` or `www.theeb1.com`, those calls reach relative `api/*.php` endpoints. The hostname check is preview behavior; server-side form quotas enforce the mail-abuse boundary independently of browser settings.

The PHP form guard reserves shared per-IP, per-submitted-recipient and global outbound capacity before database work. Its locked runtime state stays outside the served directory; visitor confirmations default to disabled and any explicitly enabled confirmation is fixed text. See [form security](form-security.md) for deployment and operational limits. The sanitized schema supplies content seeds and empty private-record tables for a new local database, with no client submissions or credentials.

The shared HTML document contains a title, description, Open Graph properties and Twitter summary image. These are the metadata present in the source; no per-route SEO implementation or Lighthouse score is claimed. Images here document the locally rendered interface. The homepage’s marketing copy and metrics remain client-facing content rather than independently verified performance or immigration-outcome claims.
