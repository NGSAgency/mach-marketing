// Lightweight SVG icon paths for service icons
// Using simple paths so we don't need to import a full icon library into templates
export const icons = {
  snowflake: "M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07l14.14-14.14",
  flame: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
  wind: "M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2",
  droplet: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
  waves: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  "battery-charging": "M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M22 11v2M11 7l-3 5h4l-3 5",
  plug: "M12 22v-5M9 8V2M15 8V2M18 8v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8",
}

export function ServiceIcon({ name, size = 24, stroke = 'currentColor', ...props }) {
  const path = icons[name] || icons.wind
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d={path} />
    </svg>
  )
}
