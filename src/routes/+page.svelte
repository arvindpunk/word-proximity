<script lang="ts">
    import Board from "$lib/Board.svelte";
    import Keyboard from "$lib/Keyboard.svelte";
    import {
        currentIndex,
        DEFAULT_CONFIG,
        isSolved,
        loadFromPreferences,
        saveToPreferences,
        set,
        targetWord,
        state,
    } from "$stores/game";
    import { GetTargetWord, ResponseCode } from "$utils/client";

    import { onMount } from "svelte";
    import { Toast } from "@capacitor/toast";
    import { blur } from "svelte/transition";

    onMount(async () => {
        const targetWordResp = await GetTargetWord();
        if (targetWordResp.code === ResponseCode.Error) {
            $state = "error";
            Toast.show({ text: targetWordResp.error, duration: "short" });
            return;
        }
        await loadFromPreferences();

        const newTargetWord = targetWordResp.data.targetWord;
        if ($targetWord === newTargetWord) {
            $state = "inprogress";
            if ($currentIndex === 6) {
                $state = "unsolved";
            } else if ($isSolved) {
                $state = "solved";
            }
            return;
        }
        // new word fetched, reset store and preferences
        set(DEFAULT_CONFIG);
        // update target word
        $targetWord = newTargetWord;
        await saveToPreferences();
        $state = "inprogress";
    });
</script>

<main>
    <div
        class="absolute min-w-full px-4 py-4 text-2xl bg-neutral-700 shadow-md shadow-neutral-900"
    >
        Word Edit
    </div>
    <div class="flex flex-col max-w-7xl m-auto min-h-screen justify-center">
        {#if $state === "error"}
            <div class="mx-auto flex flex-col text-xl text-center" in:blur>
                <h1>
                    Uh oh! Something went wrong.
                    <br />
                    Please restart the app.
                </h1>
            </div>
        {:else if $state === "inprogress"}
            <div class="flex flex-col" in:blur>
                <Board />
                <Keyboard />
            </div>
        {:else if $state === "unsolved"}
            <div class="flex flex-col" in:blur>
                <Board />
                <div class="mx-auto text-2xl text-center text-neutral-300">
                    <h1>
                        Better luck next time!
                        <br />
                        Today's word was
                        <span class="text-green-600">{$targetWord}</span>.
                    </h1>
                </div>
            </div>
        {:else if $state === "solved"}
            <div class="flex flex-col" in:blur>
                <Board />
                <div class="mx-auto text-2xl text-center text-neutral-300">
                    <h1>
                        Congratulations! <br />
                        You solved it!
                    </h1>
                </div>
            </div>
        {/if}
    </div>
</main>
