<script lang="ts">
  import Sidebar from '$lib/components/ui/sidebar.svelte';
  import SidebarLink from '$lib/components/ui/sidebarlink.svelte';
  import UserMenu from '$lib/components/ui/user-menu.svelte';
  import ProtectedRoute from '$lib/components/Auth/ProtectedRoute.svelte';
  import { authUser } from '$lib/stores/authStore.js';
  
  let user = $authUser;
</script>

<ProtectedRoute>
  <div class="flex h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
    <Sidebar animate={true}>
      <div slot="desktop" class="flex flex-col space-y-2">
        <div class="px-3 py-4">
          <h2 class="text-lg font-bold">Dashboard</h2>
        </div>
        
        <SidebarLink link={{ href: "/dashboard", label: "Dashboard", icon: "home" }} />
        <SidebarLink link={{ href: "/dashboard/projecten", label: "Projecten", icon: "folder" }} />
        <SidebarLink link={{ href: "/dashboard/taken", label: "Taken", icon: "check-square" }} />
        <SidebarLink link={{ href: "/dashboard/team", label: "Team", icon: "users" }} />
        <SidebarLink link={{ href: "/dashboard/rapportages", label: "Rapportages", icon: "bar-chart" }} />
      </div>
      
      <div slot="user">
        {#if user}
          <UserMenu {user} />
        {/if}
      </div>
      
      <div slot="mobile" class="flex flex-col space-y-2 mt-10">
        <div class="px-3 py-4">
          <h2 class="text-lg font-bold">Dashboard</h2>
        </div>
        
        <SidebarLink link={{ href: "/dashboard", label: "Dashboard", icon: "home" }} />
        <SidebarLink link={{ href: "/dashboard/projecten", label: "Projecten", icon: "folder" }} />
        <SidebarLink link={{ href: "/dashboard/taken", label: "Taken", icon: "check-square" }} />
        <SidebarLink link={{ href: "/dashboard/team", label: "Team", icon: "users" }} />
        <SidebarLink link={{ href: "/dashboard/rapportages", label: "Rapportages", icon: "bar-chart" }} />
      </div>
      
      <div slot="user-mobile">
        {#if user}
          <UserMenu {user} />
        {/if}
      </div>
    </Sidebar>
    
    <main class="flex-grow p-8">
      <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
      <p>Welkom bij het dashboard. Dit is een voorbeeld implementatie van de sidebar met gebruikerssectie.</p>
      {#if user}
        <p class="mt-4 text-neutral-600 dark:text-neutral-400">Ingelogd als: {user.email}</p>
      {/if}
    </main>
  </div>
</ProtectedRoute> 