<script lang="ts">
    export let letter: string = "";
    export let targetLetter: string = "";
    export let validate: boolean = false;

    function getBGColorClass(): string {
        if (!validate) return "bg-neutral-900";
        const manhattanDistance = Math.abs(
            letter.charCodeAt(0) - targetLetter.charCodeAt(0)
        );
        if (manhattanDistance === 0) return "bg-green-500";
        else if (manhattanDistance <= 2) return "bg-yellow-400/100";
        else if (manhattanDistance <= 5) return "bg-yellow-400/75";
        else if (manhattanDistance <= 10) return "bg-yellow-400/50";
        else if (manhattanDistance <= 15) return "bg-yellow-400/25";
        else return "bg-neutral-700";
    }

    function getBorderColorClass(): string {
        if (!validate) {
            if (letter === "") return "border-neutral-700";
            return "border-neutral-500";
        }
        return "border-transparent";
    }
</script>

<div
    class="flex w-12 h-12 m-0.5 border-2 text-2xl {getBorderColorClass()} {getBGColorClass()}"
>
    <div class="m-auto">{letter}</div>
</div>
