<script lang="ts">
  import Key from "./Key.svelte";

  const rows: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
  ];
</script>

<div class="flex flex-col">
  {#each rows as row}
    <div class="flex flex-row m-auto">
      {#each row as key}
        <Key {key} />
      {/each}
    </div>
  {/each}
</div>
