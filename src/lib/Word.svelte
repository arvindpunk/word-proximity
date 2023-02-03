<script lang="ts">
    import Letter from "./Letter.svelte";

    export let word: string = "";
    const push = (letter: string) => {
        word += letter;
    };
    const pop = () => {};
</script>

<div class="flex">
    <Letter letter={word.charAt(0)} />
    <Letter letter={word.charAt(1)} />
    <Letter letter={word.charAt(2)} />
    <Letter letter={word.charAt(3)} />
    <Letter letter={word.charAt(4)} />
</div>
