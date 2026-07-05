import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes"

export default [
  // Marketing pages share the overlay Nav + enterprise footer.
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("destinations", "routes/destinations.tsx"),
    route("destinations/:slug", "routes/destination.tsx"),
    route("expeditions", "routes/expeditions.tsx"),
    route("expeditions/:slug", "routes/expedition.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
  ]),
  // Document-style pages keep their own lightweight chrome.
  route("privacy", "routes/privacy.tsx"),
  route("terms", "routes/terms.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig
