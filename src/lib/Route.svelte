<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { RouteResolution } from "./types";

  let {
    component,
    layout = undefined,
    redirect = "/",
    guard = undefined,
    route,
  }: RouteResolution = $props();

  let pid;

  const cleanup = () => pid && clearInterval(pid);

  onMount(() => {
    if (guard && typeof guard === "function") {
      pid = setInterval(() => {
        if (!guard()) {
          window.location.href = redirect || "/";
          cleanup();
        }
      }, 1000);
    }
  });

  onDestroy(cleanup);

  const loader = async (it: any) => {
    // class
    if (typeof it === "function" && it.prototype !== undefined) {
      return it;
    }

    // lazy-loaded
    if (typeof it === "function") {
      const result = await it();

      return result?.default || result;
    }

    throw new Error("Unexpected component type, must be lazy loader or class");
  };

  const multiloader = async (it: any[]) => Promise.all(it.map(loader));
</script>

{#if layout}
  {#await multiloader([layout, component]) then [lay, comp]}
    {@const SvelteComponent_1 = lay}
    <SvelteComponent_1 {route}>
      {@const SvelteComponent = comp}
      <SvelteComponent {route} />
    </SvelteComponent_1>
  {/await}
{:else}
  {#await loader(component) then comp}
    {@const SvelteComponent_2 = comp}
    <SvelteComponent_2 {route} />
  {/await}
{/if}
