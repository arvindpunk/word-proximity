<script lang="ts">
  import Key from "$lib/Key.svelte";
  import {
    attemptedWords,
    currentIndex,
    currentWord,
    targetWord,
  } from "$stores/game";

  interface KeyProps {
    key: string;
    disable: boolean;
  }

  let rows: KeyProps[][] = [
    [
      { key: "Q", disable: false },
      { key: "W", disable: false },
      { key: "E", disable: false },
      { key: "R", disable: false },
      { key: "T", disable: false },
      { key: "Y", disable: false },
      { key: "U", disable: false },
      { key: "I", disable: false },
      { key: "O", disable: false },
      { key: "P", disable: false },
    ],
    [
      { key: "A", disable: false },
      { key: "S", disable: false },
      { key: "D", disable: false },
      { key: "F", disable: false },
      { key: "G", disable: false },
      { key: "H", disable: false },
      { key: "J", disable: false },
      { key: "K", disable: false },
      { key: "L", disable: false },
    ],
    [
      { key: "ENTER", disable: false },
      { key: "Z", disable: false },
      { key: "X", disable: false },
      { key: "C", disable: false },
      { key: "V", disable: false },
      { key: "B", disable: false },
      { key: "N", disable: false },
      { key: "M", disable: false },
      { key: "DEL", disable: false },
    ],
  ];

  const toSlab = (distance: number): number => {
    if (distance === 0) return 0;
    if (distance <= 1) return 1;
    if (distance <= 3) return 3;
    if (distance <= 5) return 5;
    if (distance <= 7) return 7;
    return 26;
  };

  currentWord.subscribe((changedWord) => {
    const index = changedWord.length;
    let a = "";
    rows.forEach((_, idxRows) => {
      rows[idxRows].forEach((key, idxRow) => {
        // never disable non-letter keys
        if (!/^[A-Z]$/.test(key.key)) {
          rows[idxRows][idxRow].disable = false;
          return;
        }

        // enable all if fully completed currentWord
        if (index >= 5) {
          rows[idxRows][idxRow].disable = false;
          return;
        }

        rows[idxRows][idxRow].disable = false;

        for (let i = 0; i < $currentIndex; i++) {
          const attempt = $attemptedWords[i];

          const targetSlab = toSlab(
            Math.abs(attempt.charCodeAt(index) - $targetWord.charCodeAt(index))
          );
          const attemptManhattanDistance = Math.abs(
            attempt.charCodeAt(index) - key.key.charCodeAt(0)
          );

          if (attemptManhattanDistance > targetSlab) {
            rows[idxRows][idxRow].disable = true;
            return;
          }

          if (
            attempt.charCodeAt(index) === key.key.charCodeAt(0) &&
            attempt.charCodeAt(index) !== $targetWord.charCodeAt(index)
          ) {
            rows[idxRows][idxRow].disable = true;
          }
        }
        if (!key.disable) a += key.key;
      });
    });
  });
</script>

<div class="flex flex-col">
  {#each rows as row}
    <div class="flex flex-row m-auto">
      {#each row as keyProps}
        <Key {...keyProps} />
      {/each}
    </div>
  {/each}
</div>
