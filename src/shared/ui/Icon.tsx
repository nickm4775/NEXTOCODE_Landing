const PATHS = {
  store: 'M3 9l1.5-5h15L21 9M3 9h18M3 9v1a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0V9M5 13v7h14v-7M10 20v-4h4v4',
  sparkles: 'M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z',
  chat: 'M20 12a8 8 0 01-11.8 7L4 20l1.1-4A8 8 0 1120 12zM9 11h.01M12 11h.01M15 11h.01',
  rocket: 'M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 11a14 14 0 017-8c2 0 5 0 5 0s0 3 0 5a14 14 0 01-8 7M9 11l4 4M9 11H5l2-4h5M13 15v4l4-2v-5',
  headset: 'M4 14v-2a8 8 0 0116 0v2M4 14a2 2 0 002 2h1v-5H6a2 2 0 00-2 2zM20 14a2 2 0 01-2 2h-1v-5h1a2 2 0 012 2zM18 16v1a3 3 0 01-3 3h-3',
  code: 'M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14',
  plug: 'M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0V8zM12 17v4',
  graduation: 'M2 9l10-5 10 5-10 5L2 9zM6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6',
  compass: 'M12 21a9 9 0 100-18 9 9 0 000 18zM15.5 8.5l-2 5-5 2 2-5 5-2z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
} as const

export type IconName = keyof typeof PATHS

export const Icon = ({ name, className = 'size-6' }: { name: IconName; className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={PATHS[name]} />
  </svg>
)
