<script lang="ts">
    import Word from "$lib/Word.svelte";

    let currentWord = "APPLE";
    const target = "SMILE";
    let words: string[] = [currentWord];
</script>

<main>
    <Word word={words.at(0)} />
    <Word word={words.at(1)} />
    <Word word={words.at(2)} />
    <Word word={words.at(3)} />
    <Word word={words.at(4)} />
    <Word word={words.at(5)} />
</main>
