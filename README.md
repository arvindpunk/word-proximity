### Word Street Bets

A variant of wordle, with a different set of hints each attempt. The goal is the same, guess the 5-letter word.

### Terms

1. `price` - The `price` of the word is basically the sum of the `value` each letter.
2. `value` - The `value` of a letter corresponds to the index (starting from 1) of the letter in the English alphabet. (`A = 1`, `B = 2`, and so on up till `Z = 26`).
3. `target` - The `target` is the hidden word of the day, which is to be guessed within `6 attempts`.

### Hints

1. `word_delta` -  
    1. (`price` of `target` word) minus (`price` of attempted word)  
        ```
        target = "APPLE" (price = 50)
        attempt = "CARET" (price = 47)
        delta = +3
        ```
    2. (`price` of attempted word) is `higher/lower` than (`price` of `target` word)
        ```
        target = "APPLE" (price = 50)
        attempt = "CARET" (price = 47)
        delta = "higher"
        ```
    3. |a - b|
2. `letter_delta` - If one letter is `higher/lower/equal` than other, can be visually depicted by green or red as in the stock market.

---

## Technical considerations

**Why use this over SvelteKit?**

- It brings its own routing solution which might not be preferable for some users.
- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.

This template contains as little as possible to get started with Vite + TypeScript + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `allowJs` in the TS template?**

While `allowJs: false` would indeed prevent the use of `.js` files in the project, it does not prevent the use of JavaScript syntax in `.svelte` files. In addition, it would force `checkJs: false`, bringing the worst of both worlds: not being able to guarantee the entire codebase is TypeScript, and also having worse typechecking for the existing JavaScript. In addition, there are valid use cases in which a mixed codebase may be relevant.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```ts
// store.ts
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```
