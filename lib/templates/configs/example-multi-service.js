// Sample multi-service company config for BOLT template
// This is what a real client's site.config.js would look like
export const config = {
  business: {
    legal_name: "Front Range Home Services LLC",
    display_name: "Front Range Home Services",
    phone: "(913) 555-0188",
    phone_display: "913-555-0188",
    email: "info@frontrangehs.com",
    address_line: "10000 W 75th St, Overland Park, KS 66204",
    hours_display: "24/7 Emergency Service · Office Mon–Fri 7a–7p",
    established_year: 1998,
    family_owned: true,
    years_in_business: 27,
  },
  positioning: {
    tagline: "Fast, honest HVAC, plumbing, and electrical service across Kansas City",
    subtagline: "Family-owned since 1998 · 4.9★ from 800+ Google reviews · Same-day service",
    emergency_service: true,
    financing: true,
    financing_partners: ["Synchrony", "Wells Fargo", "GreenSky"],
    licensed: true,
    insured: true,
    warranties: ["100% satisfaction guarantee", "Parts + labor warranty on installs"],
  },
  services: [
    {
      slug: "ac-repair",
      category: "HVAC",
      name: "AC Repair",
      short: "Same-day AC diagnosis and repair",
      description: "24/7 emergency air conditioning repair across Kansas City metro. Certified technicians, upfront pricing.",
      icon: "snowflake",
      emergency: true,
    },
    {
      slug: "heating-repair",
      category: "HVAC",
      name: "Heating Repair",
      short: "Furnace and heat pump repair, any brand",
      description: "Expert furnace repair. Trane, Carrier, Lennox, Bryant, Goodman certified.",
      icon: "flame",
      emergency: true,
    },
    {
      slug: "ac-installation",
      category: "HVAC",
      name: "AC Installation",
      short: "New AC systems with financing available",
      description: "High-efficiency AC installations with 10-year warranty and financing.",
      icon: "wind",
      emergency: false,
    },
    {
      slug: "water-heater",
      category: "Plumbing",
      name: "Water Heater",
      short: "Tank, tankless, and hybrid water heater service",
      description: "Repair, replacement, and installation of all water heater types.",
      icon: "droplet",
      emergency: true,
    },
    {
      slug: "drain-cleaning",
      category: "Plumbing",
      name: "Drain Cleaning",
      short: "Hydro-jetting, camera inspection, and sewer repair",
      description: "Advanced drain cleaning and sewer diagnostic services.",
      icon: "waves",
      emergency: true,
    },
    {
      slug: "electrical-service",
      category: "Electrical",
      name: "Electrical Repair",
      short: "Panel upgrades, wiring, outlets, and troubleshooting",
      description: "Licensed master electricians for all residential electrical needs.",
      icon: "zap",
      emergency: true,
    },
    {
      slug: "generator-install",
      category: "Electrical",
      name: "Generator Installation",
      short: "Whole-home standby generators",
      description: "Generac and Kohler-certified generator installation and maintenance.",
      icon: "battery-charging",
      emergency: false,
    },
    {
      slug: "ev-charger",
      category: "Electrical",
      name: "EV Charger Installation",
      short: "Tesla and universal EV charger installs",
      description: "Certified EV charger installation for Tesla, ChargePoint, and universal chargers.",
      icon: "plug",
      emergency: false,
    },
  ],
  service_areas: [
    "Kansas City", "Overland Park", "Leawood", "Prairie Village",
    "Olathe", "Lenexa", "Shawnee", "Merriam", "Mission",
    "Lees Summit", "Independence", "Blue Springs"
  ],
  primary_service_area: "Kansas City Metro",
  reviews: {
    google_rating: 4.9,
    google_count: 847,
    google_url: "https://g.co/kgs/example",
    featured: [
      {
        author: "Sarah M.",
        rating: 5,
        text: "Called at 11pm when our AC died in July. Tech was at our house by 1am, had us cool by 3am. Couldn't ask for better.",
        service: "AC Repair",
        location: "Leawood, KS"
      },
      {
        author: "Michael T.",
        rating: 5,
        text: "Best HVAC install I've ever had. Fair price, clean work, and they even helped set up our thermostat app.",
        service: "AC Installation",
        location: "Overland Park, KS"
      },
      {
        author: "Rachel P.",
        rating: 5,
        text: "Water heater burst on a Saturday. New unit installed same day. Family-owned really shows.",
        service: "Water Heater",
        location: "Kansas City, MO"
      },
    ]
  },
  certifications: [
    { name: "Carrier Factory Authorized Dealer", type: "hvac" },
    { name: "NATE Certified Technicians", type: "hvac" },
    { name: "EPA 608 Certified", type: "hvac" },
    { name: "Master Plumber License", type: "plumbing" },
    { name: "Master Electrician License", type: "electrical" },
    { name: "Generac Elite Dealer", type: "electrical" },
    { name: "BBB A+ Accredited", type: "general" },
  ],
  team: {
    size: 28,
    description: "27 years serving Kansas City families. Every technician is background-checked, NATE certified where applicable, and drug tested."
  },
  brand: {
    primary_accent: "#f97316", // orange - BOLT default; client can override
    logo_url: "/templates/bolt/logo-placeholder.svg",
    hero_image: "/templates/bolt/hero-truck.jpg",
  },
  meta: {
    site_title: "Front Range Home Services | HVAC, Plumbing & Electrical in Kansas City",
    site_description: "Fast, honest HVAC, plumbing, and electrical service in Kansas City. Family-owned since 1998. 24/7 emergency service. Free estimates.",
    canonical: "https://frontrangehs.com",
  }
}
