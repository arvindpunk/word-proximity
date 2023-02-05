<script lang="ts">
  import {
    attemptedWords,
    currentWord,
    currentIndex,
    targetWord,
    isSolved,
    set,
    saveToPreferences,
  } from "$stores/game";
  import { KeyCode, isValidKeyCode } from "$utils/keycodes";
  import { isValidWord } from "$utils/words";

  import { Toast } from "@capacitor/toast";
  export let key: string = "";

  const handlePress = (letter: string) => {
    const pressedKey = letter.toUpperCase();
    if (!isValidKeyCode(pressedKey)) return;

    if (pressedKey === KeyCode.Backspace || pressedKey == KeyCode.Delete) {
      currentWord.update((prev: string) => prev.slice(0, -1));
      return;
    }

    if (pressedKey === KeyCode.Enter) {
      if ($currentWord.length === 5 && $currentIndex < 6) {
        if (isValidWord($currentWord)) {
          $attemptedWords[$currentIndex] = $currentWord;
          if ($currentWord === $targetWord) {
            $isSolved = true;
          }
          $currentIndex = $currentIndex + 1;
          $currentWord = "";
          saveToPreferences();
        } else {
          // TODO: invalid word feedback via animation/spring
          Toast.show({ text: "Invalid Word", duration: "short" });
        }
      }
      return;
    }

    if ($currentWord.length < 5) {
      $currentWord = $currentWord + pressedKey;
    }
  };
</script>

<button
  class="flex bg-neutral-500 min-w-min p-1 w-6 h-12 m-1 rounded-sm text-xs"
  on:click={() => handlePress(key)}
  on:keydown|preventDefault={(event) => handlePress(event.key)}
>
  <div class="flex m-auto p-0">{key}</div>
</button>
