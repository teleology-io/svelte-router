# @teleology/svelte-router
Tested against Svelte 5.1.3. This is a library for SPA's and does not support SSR at this time.

## API

### Router Usage
```ts
<script lang="ts">
  import { Router } from "@teleology/svelte-router"

  import { Test } from "./routes/Test.svelte"

  let isAuthenticated = true;

  const routes = [
    {
      path: "*",
      // lazy loaded
      component: () => import("./lib/routes/NotFound.svelte"),
    },
    {
      path: "/test"
      // non-lazy load
      component: Test,
    },
    {
      path: "/user",
      component: () => import("./lib/routes/UserProfile.svelte"),
      layout: () => import("./lib/pages/UserLayout.svelte"),
      redirect: "/",
      guard: () => isAuthenticated
    }
  ]
</script>

<Router {routes}>
```

#### RouteDefinition
<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>path</code></td>
      <td><code>String</code></td>
      <td>A pathing string</td>
    </tr>
    <tr>
      <td><code>component</code></td>
      <td>
        <ul>
          <li><code>SvleteComponent</code></li>
          <li><code>() => Promise(SvelteComponent)</code></li>
        </ul>
      </td>
      <td>An imported SvelteComponent or a lazy-loaded component</td>
    </tr>
    <tr>
      <td><code>layout</code></td>
      <td>
        <ul>
          <li><code>SvleteComponent</code></li>
          <li><code>() => Promise(SvelteComponent)</code></li>
        </ul>
      </td>
      <td>An imported SvelteComponent or a lazy-loaded component.
      <b>Must have {@render children}!!</b></td>
    </tr>
    <tr>
      <td><code>redirect</code></td>
      <td><code>String</code></td>
      <td>An alternate url if the guard function is not true</td>
    </tr>
    <tr>
      <td><code>guard</code></td>
      <td><code>() => Boolean</code></td>
      <td>A synchronous function that returns whether the route should be navigated to</td>
    </tr>
  </tbody>
</table>

### Route Usage
```js
<script lang="ts">
  import { push, type RouteDetails } from "@teleology/svelte-router";

  interface Props {
    route: RouteDetails;
  }

  let { route }: Props = $props();
</script>

<h1>You landed on {route.pathname}</h1>
```

#### RouteDetails
Route details are extends from the browser [Location](https://developer.mozilla.org/en-US/docs/Web/API/Location) object
<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>params</code></td>
      <td><code>Object</code></td>
      <td>The key-value object of url params</td>
    </tr>
    <tr>
      <td><code>search</code></td>
      <td>
        <code>Object</code>
      </td>
      <td>The key-value object of search params</td>
    </tr>
  </tbody>
</table>

### Utils
- push(url: string, state?: any)
- replace(url: string, state?: any)
- back()