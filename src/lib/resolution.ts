import { parse } from "regexparam";
import type { RouteDefinition, RouteResolution } from "./types";

function exec(path, result) {
  let i = 0,
    out = {};
  let matches = result.pattern.exec(path);
  while (matches && i < result.keys.length) {
    out[result.keys[i]] = matches[++i] || null;
  }
  return out;
}

function search(location: Location = window.location) {
  let s = {}
  for (const [k, v] of new URLSearchParams(location.search).entries()) {
    if (s[k] && Array.isArray(s[k])) {
      s[k].push(v)
    } else {
      s[k] = v;
    }
  }
  return s;
}

const resolveRoute = (definition: RouteDefinition, location: Location = window.location): (RouteResolution | undefined) => {
  const tester = parse(definition.path)
  if (!tester.pattern.test(location.pathname)) return undefined

  const params = exec(location.pathname, tester)
  return Object.assign(definition, {
    route: {
      ...window.location,
      params,
      search: search(),
    }
  })
}

export function resolve(routes: RouteDefinition[]): RouteResolution[] {
  const matches: RouteResolution[] = []
  const location = document.location || window.location

  for (const route of routes.sort((a, b) => b.path.localeCompare(a.path))) {
    const resolved = resolveRoute(route, location)
    if (!resolved) {
      continue;
    }
    
    if (resolved.path === "*" && matches.length !== 0) {
      continue;
    }

    if (resolved.guard && typeof resolved.guard === 'function' && !resolved.guard()) {
      window.location.href = resolved.redirect || "/";
      break;
    }

    matches.push(resolved)
  }

  return matches
}
