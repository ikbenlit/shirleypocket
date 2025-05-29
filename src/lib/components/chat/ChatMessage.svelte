<script lang="ts">
  export let message: string = "";
  export let sender: 'bot' | 'user' = 'bot';
  export let showAvatar: boolean = false;
</script>

{#if sender === 'bot'}
  <div class="chat-message flex items-start gap-3 mb-3">
    {#if showAvatar}
      <img src="/images/avatar_shirley.webp" alt="Bot avatar" class="chat-avatar w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0" loading="lazy" />
    {:else}
      <div class="chat-avatar-spacer w-8 md:w-10 flex-shrink-0"></div>
    {/if}
    <div class="speech-bubble left bg-[#FEFEFE] text-black rounded-[16px_16px_16px_4px] max-w-[75%] text-base font-roboto px-4 py-3">
      {@html message}
    </div>
  </div>
{:else}
  <div class="chat-message flex items-start justify-end gap-3 mb-3">
    <div class="speech-bubble right bg-[#E91E63] text-white rounded-[16px_16px_4px_16px] max-w-[75%] text-base font-roboto px-4 py-3 user-bubble">
      {@html message}
    </div>
  </div>
{/if}

<style>
  /* Extra spacing en responsive tweaks indien nodig */
</style> 