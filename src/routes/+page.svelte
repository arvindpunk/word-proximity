<script lang="ts">
    import Board from "$lib/Board.svelte";
    import Keyboard from "$lib/Keyboard.svelte";
    import {
        DEFAULT_CONFIG,
        loadFromPreferences,
        set,
        targetWord,
        isSolved,
    } from "$stores/game";
    import { GetTargetWord, ResponseCode } from "$utils/client";

    import { onMount } from "svelte";
    import { Toast } from "@capacitor/toast";
    import { blur } from "svelte/transition";

    let loading = true;
    onMount(async () => {
        const targetWordResp = await GetTargetWord();
        if (targetWordResp.code === ResponseCode.Error) {
            Toast.show({ text: targetWordResp.error, duration: "short" });
            return;
        }
        loading = false;
        await loadFromPreferences();
        const newTargetWord = targetWordResp.data.targetWord;
        if ($targetWord === newTargetWord) {
            return;
        }
        set(DEFAULT_CONFIG);
        $targetWord = newTargetWord;
    });
</script>

{#if !loading}
    <main>
        <div
            class="flex flex-col max-w-7xl m-auto min-h-screen justify-center"
            transition:blur
        >
            <Board />
            <Keyboard />
        </div>
    </main>
{/if}
