<script lang="ts">
  import { chatStore } from '$lib/stores/chatStore';
  import type { ChatCategory, ChatQuestion } from '$lib/types/chat';
  // import type { Writable } from 'svelte/store'; // Niet nodig, ChatStoreValue is lokaal
  import CategoryChip from './CategoryChip.svelte';
  import QuestionChip from './QuestionChip.svelte';
  import { slide } from 'svelte/transition';

  interface ChatStoreValue {
    allCategories: ChatCategory[];
    activeCategoryId: string | null;
    showCategoryPicker: boolean;
    isLoading: boolean;
    error: string | null;
  }

  let allCategoriesFromStore: ChatCategory[] = [];
  let isLoading: boolean = true;
  let error: string | null = null;
  let activeCategoryId: string | null = null;
  let activeQuestions: ChatQuestion[] = [];

  let showAllCategories = false;
  const initialDisplayCount = 3; 

  chatStore.subscribe((value: ChatStoreValue) => {
    allCategoriesFromStore = value.allCategories;
    isLoading = value.isLoading;
    error = value.error;
    
    if (value.activeCategoryId !== activeCategoryId) {
      activeCategoryId = value.activeCategoryId;
      if (activeCategoryId) {
        const currentCategory = allCategoriesFromStore.find(cat => cat.id === activeCategoryId);
        activeQuestions = currentCategory ? currentCategory.questions : [];
      } else {
        activeQuestions = [];
      }
    }
  });

  $: displayedCategories = showAllCategories 
    ? allCategoriesFromStore 
    : allCategoriesFromStore.slice(0, initialDisplayCount);

  $: hasMoreButton = !showAllCategories && allCategoriesFromStore.length > initialDisplayCount;
  $: hasLessButton = showAllCategories && allCategoriesFromStore.length > initialDisplayCount;

  function handleCategorySelect(event: CustomEvent<{ id: string; title: string }>): void {
    chatStore.selectCategory(event.detail.id);
  }

  function handleQuestionSelect(event: CustomEvent<{ text: string }>): void {
    chatStore.selectQuestion(event.detail.text);
  }

  function toggleShowAllCategories(): void {
    showAllCategories = !showAllCategories;
  }

</script>

{#if isLoading}
  <div class="p-4 text-center">
    <p class="text-sm text-gray-500">Categorieën laden...</p>
  </div>
{:else if error}
  <div class="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
    <p class="text-sm font-semibold">Fout bij laden categorieën</p>
    <p class="text-xs">{error}</p>
  </div>
{:else if allCategoriesFromStore.length > 0}
  <div class="mb-2">
    <div class="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-lg shadow" role="toolbar" aria-label="Categorieën">
      {#each displayedCategories as category (category.id)}
        <CategoryChip {category} on:select={handleCategorySelect} />
      {/each}
      
      {#if hasMoreButton}
        <button 
          on:click={toggleShowAllCategories}
          class="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors whitespace-nowrap"
        >
          Meer...
        </button>
      {/if}
      {#if hasLessButton} 
        <button 
          on:click={toggleShowAllCategories}
          class="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors whitespace-nowrap"
        >
          Minder...
        </button>
      {/if}
    </div>
  </div>

  {#if activeCategoryId && activeQuestions.length > 0}
    <div class="mt-3 p-2 bg-gray-50 rounded-lg shadow-inner" transition:slide={{ duration: 250 }}>
      <h3 class="text-sm font-semibold text-gray-600 mb-2 px-1">Suggesties:</h3>
      {#each activeQuestions as question (question.text + question.displayOrder)} 
        <QuestionChip {question} on:selectQuestion={handleQuestionSelect} />
      {/each}
    </div>
  {/if}

{:else}
  <div class="p-4 text-center">
    <p class="text-sm text-gray-500">Geen categorieën beschikbaar.</p>
  </div>
{/if}

<style>
  /* Scrollbar styling is niet meer nodig en kan verwijderd worden */
</style> 