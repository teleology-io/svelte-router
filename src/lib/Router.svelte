<script lang="ts">
  import Route from "./Route.svelte";
  import { listen } from "./history";
  import { resolve } from "./resolution";
  import { type RouteDefinition } from "./types";

  type Props = Record<string, any> & {
    routes?: RouteDefinition[];
  };

  let { routes = [], ...rest }: Props = $props();

  // Sort to ensure '*' is at bottom, then try to find matches
  let matches = $state<RouteDefinition[]>([]);

  const notify = (_: any) => {
    matches = resolve(routes);
  };

  listen(notify);
</script>

{#each matches as route, index (route.path)}
  <Route {...route} {...rest} />
{/each}
