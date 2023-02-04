<script lang="ts">
  import { attemptedWords, currentWord, currentIndex } from "$stores/game";
  import { KeyCode, isValidKeyCode } from "$utils/keycodes";

  export let key: string = "";

  const handlePress = (letter: string) => {
    const pressedKey = letter.toUpperCase();
    if (!isValidKeyCode(pressedKey)) return;

    if (pressedKey === KeyCode.Backspace || pressedKey == KeyCode.Delete) {
      currentWord.update((prev: string) => prev.slice(0, -1));
      return;
    }

    if (pressedKey === KeyCode.Enter) {
      if (
        $currentWord.length === 5 &&
        $currentIndex < 6 &&
        validate($currentWord)
      ) {
        $attemptedWords[$currentIndex] = $currentWord;
        $currentIndex = $currentIndex + 1;
        $currentWord = "";
      }
      return;
    }

    if ($currentWord.length < 5) {
      $currentWord = $currentWord + pressedKey;
    }
  };

  const validate = (word: string): boolean => {
    // TODO: do actual validation here
    return true;
  };
</script>

<button
  class="flex bg-neutral-500 min-w-min p-1 w-6 h-12 m-1 rounded-sm text-xs"
  on:click={() => handlePress(key)}
  on:keydown|preventDefault={(event) => handlePress(event.key)}
>
  <div class="flex m-auto p-0">{key}</div>
</button>
