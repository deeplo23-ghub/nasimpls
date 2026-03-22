export const routes = {
  home: "/",
  bancakan: "/bancakan",
  rantang: "/rantang",
  warung: "/warung",
  story: "/story",
  contact: "/contact",
  thankYou: "/thank-you"
} as const;

export type RouteKey = keyof typeof routes;
