// Line icons for each service. `data-draw` lets Motion/Interactions animate
// the strokes being drawn (on reveal and on card hover).
const icons: Record<string, React.ReactNode> = {
  "social-media-marketing": (
    <>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M12 13.5s-3-1.8-3-3.6a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 1.8-3 3.6-3 3.6z" />
    </>
  ),
  "meta-ads": (
    <>
      <path d="M3 10v4h3l7 4V6l-7 4z" />
      <path d="M16.5 9a4 4 0 0 1 0 6" />
      <path d="M19 6.5a7.5 7.5 0 0 1 0 11" />
    </>
  ),
  "google-ads": (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </>
  ),
  seo: (
    <>
      <path d="M3 20h18" />
      <path d="M5 16l5-5 3 3 6-7" />
      <path d="M15 7h4v4" />
    </>
  ),
  "content-video": (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M10 9.5v5l4.5-2.5z" />
    </>
  ),
  "branding-design": (
    <>
      <path d="M4 20l4-1 11-11-3-3L5 16z" />
      <path d="M14 7l3 3" />
    </>
  ),
  "web-development": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M10 12.5l-2 2 2 2" />
      <path d="M14 12.5l2 2-2 2" />
    </>
  ),
  "lead-generation": <path d="M3 4h18l-7 8v6l-4 2v-8z" />,
};

export default function ServiceIcon({ slug, className = "h-6 w-6" }: { slug: string; className?: string }) {
  return (
    <svg
      data-draw
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {icons[slug] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
