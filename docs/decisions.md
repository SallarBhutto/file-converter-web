# Decision Log

Architecture and product decisions for File Converter Web.

## How to use this log

- Every important architectural or product change gets a **new sequential
  ID** (D008, D009, ...). Never edit a historical decision to mean something
  else.
- When a decision is replaced, mark the old entry `Status: Superseded by Dnnn`
  and add the new one.
- Statuses: `Accepted`, `Accepted for future implementation`, `Superseded`,
  `Rejected`.
- Update the affected doc in `docs/` in the same change.

---

## D001 — Browser-only file processing

**Status:** Accepted

**Decision:** User files are processed locally in the browser. No upload
APIs, processing servers, cloud storage, or conversion databases.

**Reasoning:**
- stronger privacy
- low infrastructure cost
- no file storage
- simple operational model
- differentiates the product from upload-based converters

**Consequences:**
- browser memory constraints matter
- very large files require careful handling or limits
- some advanced operations may be harder than server-side processing
- all privacy messaging in the UI depends on this decision holding

---

## D002 — SEO from day one

**Status:** Accepted

**Decision:** Every real tool gets a dedicated SEO-friendly route with useful
server-rendered content.

**Reasoning:** Organic search is expected to be the primary acquisition
channel.

**Consequences:** Page architecture must not become entirely
client-rendered. Routes exist only for real tools.

---

## D003 — Next.js App Router

**Status:** Accepted

**Decision:** Use Next.js App Router, React, TypeScript, and Tailwind CSS for
the web application.

**Reasoning:** Supports strong SEO, Server Components, static/server
rendering, routing, metadata, and a modern frontend stack.

---

## D004 — Server Components by default

**Status:** Accepted

**Decision:** Only interactive or browser-dependent parts are Client
Components.

**Reasoning:** Reduces client-side JavaScript and supports page performance
and crawlability.

---

## D005 — Minimal advertising

**Status:** Accepted for future implementation

**Decision:** Advertising may be added after traffic exists, but it must
remain limited and outside critical conversion interactions.

**Reasoning:** Monetize free traffic without degrading trust.

**Consequences:** Nothing is implemented now. Introducing ads requires a
follow-up decision entry covering provider and placements.

---

## D006 — No authentication for initial product

**Status:** Accepted

**Decision:** Initial conversion/compression tools do not require users to
create accounts.

**Reasoning:** Account creation provides little value for browser-only
one-off tools and creates unnecessary friction.

---

## D007 — Build tools incrementally

**Status:** Accepted

**Decision:** Build one complete vertical slice first, starting with
PDF → JPG, instead of implementing every converter simultaneously.

**Reasoning:** Allows the shared architecture, memory handling, UX, and SEO
patterns to be validated before scaling to more tools.
