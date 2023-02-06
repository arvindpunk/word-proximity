<script lang="ts">
    import { currentWord, currentIndex } from "$stores/game";
    import { attemptedWords } from "$stores/game";

    import Word from "$lib/Word.svelte";
    $: console.log($currentIndex);
</script>

<div class="flex flex-col max-w-7xl mx-auto mb-4">
    {#each [...$attemptedWords] as word, index}
        {#if index === $currentIndex}
            <Word word={$currentWord} validate={false} />
        {:else}
            <Word {word} validate={index < $currentIndex} />
        {/if}
    {/each}
</div>
