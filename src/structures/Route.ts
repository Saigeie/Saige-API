import { APIRouteType, RouteType} from "../types/RouteTypes";

export class APIRoute {
  constructor(routeOptions: APIRouteType) {
    Object.assign(this, routeOptions);
  }
}

export class Route {
  constructor(routeOptions: RouteType) {
    Object.assign(this, routeOptions);
  }
}
