<script lang="ts">
    import Letter from "$lib/Letter.svelte";
    import { targetWord } from "$stores/game";

    export let word: string = "";
    export let validate: boolean = false;
</script>

<div class="flex flex-row">
    {#each $targetWord as targetLetter, index}
        <Letter letter={word.charAt(index)} {targetLetter} {validate} />
    {/each}
</div>
