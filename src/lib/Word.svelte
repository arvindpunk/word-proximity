<script lang="ts">
    import Letter from "./Letter.svelte";

    export let word: string = "";
</script>

<div class="flex flex-row">
    <Letter letter={word.charAt(0)} />
    <Letter letter={word.charAt(1)} />
    <Letter letter={word.charAt(2)} />
    <Letter letter={word.charAt(3)} />
    <Letter letter={word.charAt(4)} />
</div>
