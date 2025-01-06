
export type RouteDefinition = {
  path: string;
  component?: any;
  layout?: any;
  redirect?: string;
  guard?: () => boolean;
} & any

export type RouteResolution = RouteDefinition & {
  route: RouteDetails
}

export interface RouteDetails extends Location {
  params: any,
  search: any,
}
