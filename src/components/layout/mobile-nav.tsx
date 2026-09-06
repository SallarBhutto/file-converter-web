"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

export interface MobileNavLink {
  label: string;
  href: string;
}

export interface MobileNavGroup {
  label: string;
  links: readonly MobileNavLink[];
}

interface MobileNavProps {
  /** Registry-derived groups; the header builds them on the server. */
  groups: readonly MobileNavGroup[];
}

/**
 * Compact navigation for narrow screens: one labelled toggle button and a
 * panel that drops over the page content, so opening it never shifts the
 * layout. Closes on link selection, Escape, route change, and outside click.
 */
export function MobileNav({ groups }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Navigating anywhere closes the menu, including back/forward. Adjusting
  // state during render is React's sanctioned way to react to a prop change.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-md text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
      >
        <MenuIcon open={open} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-b border-zinc-200 bg-white shadow-lg"
      >
        <nav aria-label="Primary" className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center rounded-md px-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
          >
            Home
          </Link>
          {groups.map((group) => (
            <div key={group.label} className="mt-3">
              <p className="px-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {group.label}
              </p>
              <ul className="mt-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className="flex min-h-11 items-center rounded-md px-2 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 aria-[current=page]:font-medium aria-[current=page]:text-zinc-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="size-6"
    >
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}
