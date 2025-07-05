<script lang="ts">
  import { authUser, authLoading } from '$lib/stores/authStore.js';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  // Loading component while checking auth
  let showContent = false;

  onMount(() => {
    const unsubscribe = authLoading.subscribe(loading => {
      if (!loading) {
        const user = $authUser;
        if (!user) {
          goto('/login');
        } else {
          showContent = true;
        }
      }
    });

    return unsubscribe;
  });
</script>

{#if $authLoading}
  <div class="flex items-center justify-center min-h-screen">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
  </div>
{:else if showContent}
  <slot />
{/if}
