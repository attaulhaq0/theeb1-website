# Public form mail limits

The PHP form guard requires PHP 8.1 or later.

Contact, consultation and newsletter share one server-side quota reservation before database access. Visitor confirmations are disabled by default. Fixed admin notifications still send after a successful database write. Optional visitor confirmations use fixed text only; submitted names, messages, phone numbers, dates and URLs are never included.

Provision an existing writable private directory outside `public`, the deployed document root, and any directory exposed by another virtual host or alias. On Hostinger, deploy `dist` into `public_html` and place runtime storage in a separate private sibling directory. Set these variables in the PHP server environment, never in frontend `VITE_` variables or public files:

| Variable | Default / requirement |
| --- | --- |
| `THEEB1_FORM_RUNTIME_DIR` | Required absolute path to the private directory |
| `THEEB1_FORM_HMAC_KEY` | Required random secret of at least 32 bytes; generate and provision privately |
| `THEEB1_SEND_VISITOR_CONFIRMATIONS` | `0`; only explicit `1` enables bounded, fixed-text confirmations |
| `THEEB1_FORM_IP_LIMIT` | 5 accepted submissions per server client IP |
| `THEEB1_FORM_RECIPIENT_LIMIT` | 3 accepted submissions per submitted email address across all endpoints |
| `THEEB1_FORM_GLOBAL_LIMIT` | 50 reserved outbound messages, shared by the whole application |
| `THEEB1_FORM_WINDOW_SECONDS` | 3600; accepted range 60–86400 |

The quota limits accept positive integers up to 1000. Every accepted request reserves one admin message and, when confirmations are enabled, one visitor message. Recipient quotas apply even when confirmations are disabled. Counters use fixed time windows. At a window boundary, two windows' capacity can occur close together. Reservations remain consumed after database or mail failures; they are never rolled back in a way that could allow abuse.

All three endpoints and all PHP workers serving them must share this directory, secret and limit configuration. The file lock must work across those workers. Multiple hosts need shared storage with reliable locks or a shared atomic datastore; independent local directories do not enforce a deployment-wide quota. Keep the runtime directory private and exclude it from public exports, backups served by the website and version control. Do not delete the live quota file to recover space: its loss resets capacity. Corrupt, unreadable or incompatible state fails closed with HTTP 503; exhausted quotas return HTTP 429. Neither error logs nor state expose plaintext recipient addresses or IP addresses.

The quota uses `REMOTE_ADDR` and ignores forwarded headers and cookies. If a trusted reverse proxy fronts PHP, configure the web server to derive `REMOTE_ADDR` safely from that proxy. A browser Origin or a client-side preview check is not an abuse boundary. Optional confirmations still target unverified addresses and should remain disabled unless the operator accepts that bounded behavior; no ownership-verification flow is implemented here.

Run the offline regression suite with `php tests/forms-security.php`. It launches fresh PHP processes with native `mail()` disabled and a recording fake transport. Endpoint tests use temporary copies with fixture-only database and input readers; they never connect to a database or send mail. Set process TEMP/TMP to a private disposable directory before running. Rebuild with `npm run build` before deployment so the generated `dist/api` contains the current PHP sources. Review configuration and hosting permissions before enabling the forms.
