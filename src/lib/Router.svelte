<script lang="ts">
  import Route from "./Route.svelte";
  import { listen } from "./history";
  import { resolve } from "./resolution";
  import { type RouteDefinition } from "./types";

  interface Props {
    routes?: RouteDefinition[];
  }

  let { routes = [] }: Props = $props();

  // Sort to ensure '*' is at bottom, then try to find matches
  let matches = $state<RouteDefinition[]>([]);

  const notify = (_: any) => {
    matches = resolve(routes);
  };

  listen(notify);
</script>

{#each matches as route, index (route.path)}
  <Route {...route} />
{/each}
