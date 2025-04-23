<!-- Sidebar.svelte -->
<script context="module" lang="ts">
    import type { Writable } from 'svelte/store';
    
    // Definitie van context key
    export const SidebarContextKey = Symbol('sidebar-context');
    
    // Context waarde type
    export interface SidebarContextValue {
        sidebarStore: Writable<{ open: boolean }>;
        animate: boolean;
    }
</script>

<script lang="ts">
    import { writable } from 'svelte/store';
    import { slide, fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { setContext } from 'svelte';
    
    // Types
    interface Link {
      label: string;
      href: string;
      icon: string;
    }
    
    // Props
    export let openProp: boolean | undefined = undefined;
    export let animate = true;
    
    // Store (buiten de instance script logica geplaatst indien nodig, maar hier is het ok)
    const sidebarStore = writable({
      open: false,
    });
    
    // Initialize with prop value if provided
    if (openProp !== undefined) {
      sidebarStore.update(state => ({ ...state, open: openProp }));
    }
    
    // Reactive value for open state
    $: open = $sidebarStore.open;
    
    // Geef de store en animate prop door via context
    setContext(SidebarContextKey, {
        sidebarStore,
        animate
    });
    
    // Functions
    function toggleSidebar() {
      sidebarStore.update(state => ({ ...state, open: !state.open }));
    }
    
    function setOpen(value: boolean) {
      sidebarStore.update(state => ({ ...state, open: value }));
    }
    
    function handleMouseEnter() {
      if (animate) setOpen(true);
    }
    
    function handleMouseLeave() {
      if (animate) setOpen(false);
    }
    
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleSidebar();
      }
    }
    
    // Helper function similar to cn from React
    function cn(...classes: string[]) {
      return classes.filter(Boolean).join(' ');
    }
  </script>
  
  <!-- Desktop Sidebar -->
  <div 
    class={cn(
      "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 transition-all duration-300 ease-in-out",
      $$props.class
    )}
    style={animate ? `width: ${open ? '300px' : '60px'}` : 'width: 300px'}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    role="navigation"
    aria-label="Hoofdnavigatie"
  >
    <slot name="desktop"></slot>
    
    <!-- User section -->
    <div class="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
      <slot name="user"></slot>
    </div>
  </div>
  
  <!-- Mobile Sidebar -->
  <div class={cn(
    "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full"
  )}>
    <div class="flex justify-end z-20 w-full">
      <button 
        type="button"
        class="bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center"
        on:click={toggleSidebar}
        aria-label="Open navigatiemenu"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor" 
          class="w-6 h-6 text-neutral-800 dark:text-neutral-200"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
    
    {#if open}
      <div 
        class={cn(
          "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
          $$props.mobileClass
        )}
        transition:slide={{ duration: 350, axis: 'x', easing: quintOut }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobiel navigatiemenu"
      >
        <button
          type="button"
          class="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200 cursor-pointer bg-transparent border-0 p-0 flex items-center justify-center"
          on:click={toggleSidebar}
          aria-label="Sluit navigatiemenu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <slot name="mobile"></slot>
        
        <!-- User section mobile -->
        <div class="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <slot name="user-mobile"></slot>
        </div>
      </div>
    {/if}
  </div>