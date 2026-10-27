# Third-party notices

Audited against both committed package-lock.json files and installed package
license files on 2026-10-27. Versions below are resolved versions, not ranges.
The portfolio LICENSE does not replace upstream licenses or claim exclusive
ownership of third-party code.

## Browser distribution

`assets/index-DUdg-Rz4.js` contains compiled application code with React 19.3.1,
React DOM 19.3.1, scheduler 0.28.0 (MIT) and lucide-react 0.546.0 (ISC, with
Feather-derived portions under MIT). `assets/index-DZK23Ncr.css` is generated
with Tailwind CSS 4.3.3 (MIT); its Tailwind license header is preserved.
The JavaScript currently has no retained block license comments. The complete
installed upstream license texts for these components are supplied in
[THIRD_PARTY_LICENSES.txt](THIRD_PARTY_LICENSES.txt), alongside build/tooling
licenses. Distribute this notice and that file with copies of the bundles;
these bundles also contain personal content excluded by README's License section.
Do not describe the whole bundle as exclusively copyright Matteo Cavo.

## Direct dependencies and tools

- React / React DOM / scheduler: MIT, Meta Platforms, Inc. and affiliates.
- lucide-react: ISC (Lucide Contributors), with MIT Feather portions (Cole Bemis).
- Vite 8.3.4: MIT; its shipped LICENSE.md includes bundled dependency notices.
- @vitejs/plugin-react 6.1.2: MIT.
- Tailwind CSS / @tailwindcss/vite 4.3.3: MIT.
- TypeScript and type packages: see resolved inventory below.
- @notionhq/client 5.12.0: MIT (sync script, not a browser dependency).
- dotenv 17.3.1: BSD-2-Clause (sync scripts).
- serve 14.2.6: MIT (local development server).

## Fonts, icons and external services

The source CSS names Public Sans, Plus Jakarta Sans and JetBrains Mono.
The HTML includes Google Fonts preconnects, but no font stylesheet request or
local font binary was found; system fallbacks may therefore be used. These
named fonts are SIL Open Font License 1.1 fonts; the upstream
copyright and complete OFL texts are included in THIRD_PARTY_LICENSES.txt.
Upstream sources:
- https://github.com/google/fonts/blob/main/ofl/publicsans/OFL.txt
- https://github.com/google/fonts/blob/main/ofl/plusjakartasans/OFL.txt
- https://github.com/google/fonts/blob/main/ofl/jetbrainsmono/OFL.txt

The configured preconnect hosts are fonts.googleapis.com and fonts.gstatic.com;
no tracked local font binaries were found. System fallback fonts are supplied by
the user's operating system. Lucide icons use the license above; personal favicon
and branding are excluded as stated in README.

GitHub Pages hosts the site. GitHub/Notion APIs supply project metadata;
Web3Forms supplies the contact endpoint. Power BI dashboards, linked GitHub
projects and external credentials retain their respective rights and service
terms. These links/API calls do not license their content under this repository's
MIT license. No additional third-party JavaScript CDN script was found in the
tracked HTML. Project imagery/slides and personal assets are excluded as described
in README; no ownership or open license is inferred for third-party material in
screenshots, CVs or creative works.

## Resolved dependency inventory

This includes build, development, transitive and optional platform dependencies;
it is not a claim that every package below ships in the browser. License identifiers
are copied from the lockfiles. Full license/notice files found in the installed
packages are collected in THIRD_PARTY_LICENSES.txt; optional packages absent on
this platform are identified there. Preserve upstream notices when redistributing
tooling or rebuilding on other platforms, and refresh this audit when upgrading.

### Root scripts

| Package | Version | License |
| --- | --- | --- |
| @notionhq/client | 5.12.0 | MIT |
| @zeit/schemas | 2.36.0 | MIT |
| ajv | 8.18.0 | MIT |
| ansi-align | 3.0.1 | ISC |
| ansi-regex | 5.0.1 | MIT |
| emoji-regex | 8.0.0 | MIT |
| string-width | 4.2.3 | MIT |
| strip-ansi | 6.0.1 | MIT |
| ansi-regex | 6.2.2 | MIT |
| ansi-styles | 6.2.3 | MIT |
| arch | 2.2.0 | MIT |
| arg | 5.0.2 | MIT |
| balanced-match | 1.0.2 | MIT |
| boxen | 7.0.0 | MIT |
| brace-expansion | 1.1.21 | MIT |
| bytes | 3.1.2 | MIT |
| camelcase | 7.0.1 | MIT |
| chalk | 5.0.1 | MIT |
| chalk-template | 0.4.0 | MIT |
| ansi-styles | 4.3.0 | MIT |
| chalk | 4.1.2 | MIT |
| cli-boxes | 3.0.0 | MIT |
| clipboardy | 3.0.0 | MIT |
| color-convert | 2.0.1 | MIT |
| color-name | 1.1.4 | MIT |
| compressible | 2.0.18 | MIT |
| compression | 1.8.2 | MIT |
| concat-map | 0.0.1 | MIT |
| content-disposition | 0.5.2 | MIT |
| cross-spawn | 7.0.6 | MIT |
| debug | 2.6.9 | MIT |
| deep-extend | 0.6.0 | MIT |
| destroy | 1.2.0 | MIT |
| dotenv | 17.3.1 | BSD-2-Clause |
| eastasianwidth | 0.2.0 | MIT |
| emoji-regex | 9.2.2 | MIT |
| execa | 5.1.1 | MIT |
| fast-deep-equal | 3.1.3 | MIT |
| fast-uri | 3.1.9 | BSD-3-Clause |
| get-stream | 6.0.1 | MIT |
| has-flag | 4.0.0 | MIT |
| human-signals | 2.1.0 | Apache-2.0 |
| ini | 1.3.8 | ISC |
| is-docker | 2.2.1 | MIT |
| is-fullwidth-code-point | 3.0.0 | MIT |
| is-port-reachable | 4.0.0 | MIT |
| is-stream | 2.0.1 | MIT |
| is-wsl | 2.2.0 | MIT |
| isexe | 2.0.0 | ISC |
| json-schema-traverse | 1.0.0 | MIT |
| merge-stream | 2.0.0 | MIT |
| mime-db | 1.54.0 | MIT |
| mime-types | 2.1.18 | MIT |
| mime-db | 1.33.0 | MIT |
| mimic-fn | 2.1.0 | MIT |
| minimatch | 3.1.5 | ISC |
| minimist | 1.2.8 | MIT |
| ms | 2.0.0 | MIT |
| negotiator | 0.6.4 | MIT |
| npm-run-path | 4.0.1 | MIT |
| on-headers | 1.1.0 | MIT |
| onetime | 5.1.2 | MIT |
| path-is-inside | 1.0.2 | (WTFPL OR MIT) |
| path-key | 3.1.1 | MIT |
| path-to-regexp | 3.3.0 | MIT |
| range-parser | 1.2.0 | MIT |
| rc | 1.2.8 | (BSD-2-Clause OR MIT OR Apache-2.0) |
| registry-auth-token | 3.3.2 | MIT |
| registry-url | 3.1.0 | MIT |
| require-from-string | 2.0.2 | MIT |
| safe-buffer | 5.2.1 | MIT |
| serve | 14.2.6 | MIT |
| serve-handler | 6.1.7 | MIT |
| bytes | 3.0.0 | MIT |
| shebang-command | 2.0.0 | MIT |
| shebang-regex | 3.0.0 | MIT |
| signal-exit | 3.0.7 | ISC |
| string-width | 5.1.2 | MIT |
| strip-ansi | 7.2.0 | MIT |
| strip-final-newline | 2.0.0 | MIT |
| strip-json-comments | 2.0.1 | MIT |
| supports-color | 7.2.0 | MIT |
| type-fest | 2.19.0 | (MIT OR CC0-1.0) |
| update-check | 1.5.4 | MIT |
| vary | 1.1.2 | MIT |
| which | 2.0.2 | ISC |
| widest-line | 4.0.1 | MIT |
| wrap-ansi | 8.1.0 | MIT |

### React application

| Package | Version | License |
| --- | --- | --- |
| @jridgewell/gen-mapping | 0.3.13 | MIT |
| @jridgewell/remapping | 2.3.5 | MIT |
| @jridgewell/resolve-uri | 3.1.2 | MIT |
| @jridgewell/sourcemap-codec | 1.6.0 | MIT |
| @jridgewell/trace-mapping | 0.3.31 | MIT |
| @oxc-project/types | 0.154.0 | MIT |
| @rolldown/binding-android-arm-eabi | 1.2.14 | MIT |
| @rolldown/binding-android-arm64 | 1.2.14 | MIT |
| @rolldown/binding-darwin-arm64 | 1.2.14 | MIT |
| @rolldown/binding-darwin-x64 | 1.2.14 | MIT |
| @rolldown/binding-freebsd-x64 | 1.2.14 | MIT |
| @rolldown/binding-linux-arm-gnueabihf | 1.2.14 | MIT |
| @rolldown/binding-linux-arm64-gnu | 1.2.14 | MIT |
| @rolldown/binding-linux-arm64-musl | 1.2.14 | MIT |
| @rolldown/binding-linux-ppc64-gnu | 1.2.14 | MIT |
| @rolldown/binding-linux-s390x-gnu | 1.2.14 | MIT |
| @rolldown/binding-linux-x64-gnu | 1.2.14 | MIT |
| @rolldown/binding-linux-x64-musl | 1.2.14 | MIT |
| @rolldown/binding-openharmony-arm64 | 1.2.14 | MIT |
| @rolldown/binding-win32-arm64-msvc | 1.2.14 | MIT |
| @rolldown/binding-win32-x64-msvc | 1.2.14 | MIT |
| @rolldown/pluginutils | 1.0.1 | MIT |
| @tailwindcss/node | 4.3.3 | MIT |
| @tailwindcss/oxide | 4.3.3 | MIT |
| @tailwindcss/oxide-android-arm64 | 4.3.3 | MIT |
| @tailwindcss/oxide-darwin-arm64 | 4.3.3 | MIT |
| @tailwindcss/oxide-darwin-x64 | 4.3.3 | MIT |
| @tailwindcss/oxide-freebsd-x64 | 4.3.3 | MIT |
| @tailwindcss/oxide-linux-arm-gnueabihf | 4.3.3 | MIT |
| @tailwindcss/oxide-linux-arm64-gnu | 4.3.3 | MIT |
| @tailwindcss/oxide-linux-arm64-musl | 4.3.3 | MIT |
| @tailwindcss/oxide-linux-x64-gnu | 4.3.3 | MIT |
| @tailwindcss/oxide-linux-x64-musl | 4.3.3 | MIT |
| @tailwindcss/oxide-wasm32-wasi | 4.3.3 | MIT |
| @emnapi/core | 1.11.1 | MIT |
| @emnapi/runtime | 1.11.1 | MIT |
| @emnapi/wasi-threads | 1.2.2 | MIT |
| @napi-rs/wasm-runtime | 1.1.4 | MIT |
| @tybys/wasm-util | 0.10.2 | MIT |
| tslib | 2.8.1 | 0BSD |
| @tailwindcss/oxide-win32-arm64-msvc | 4.3.3 | MIT |
| @tailwindcss/oxide-win32-x64-msvc | 4.3.3 | MIT |
| @tailwindcss/vite | 4.3.3 | MIT |
| @types/node | 22.20.5 | MIT |
| @types/react | 19.3.0 | MIT |
| @types/react-dom | 19.3.0 | MIT |
| @typescript/typescript-aix-ppc64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-darwin-arm64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-darwin-x64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-freebsd-arm64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-freebsd-x64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-linux-arm | 7.0.2 | Apache-2.0 |
| @typescript/typescript-linux-arm64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-linux-loong64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-linux-mips64el | 7.0.2 | Apache-2.0 |
| @typescript/typescript-linux-ppc64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-linux-riscv64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-linux-s390x | 7.0.2 | Apache-2.0 |
| @typescript/typescript-linux-x64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-netbsd-arm64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-netbsd-x64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-openbsd-arm64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-openbsd-x64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-sunos-x64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-win32-arm64 | 7.0.2 | Apache-2.0 |
| @typescript/typescript-win32-x64 | 7.0.2 | Apache-2.0 |
| @vitejs/plugin-react | 6.1.2 | MIT |
| csstype | 3.2.3 | MIT |
| detect-libc | 2.1.2 | Apache-2.0 |
| enhanced-resolve | 5.26.0 | MIT |
| fdir | 6.5.0 | MIT |
| fsevents | 2.3.3 | MIT |
| graceful-fs | 4.2.11 | ISC |
| jiti | 2.7.0 | MIT |
| lightningcss | 1.32.0 | MPL-2.0 |
| lightningcss-android-arm64 | 1.32.0 | MPL-2.0 |
| lightningcss-darwin-arm64 | 1.32.0 | MPL-2.0 |
| lightningcss-darwin-x64 | 1.32.0 | MPL-2.0 |
| lightningcss-freebsd-x64 | 1.32.0 | MPL-2.0 |
| lightningcss-linux-arm-gnueabihf | 1.32.0 | MPL-2.0 |
| lightningcss-linux-arm64-gnu | 1.32.0 | MPL-2.0 |
| lightningcss-linux-arm64-musl | 1.32.0 | MPL-2.0 |
| lightningcss-linux-x64-gnu | 1.32.0 | MPL-2.0 |
| lightningcss-linux-x64-musl | 1.32.0 | MPL-2.0 |
| lightningcss-win32-arm64-msvc | 1.32.0 | MPL-2.0 |
| lightningcss-win32-x64-msvc | 1.32.0 | MPL-2.0 |
| lucide-react | 0.546.0 | ISC |
| magic-string | 0.30.21 | MIT |
| nanoid | 3.3.20 | MIT |
| picocolors | 1.1.1 | ISC |
| picomatch | 4.0.7 | MIT |
| postcss | 8.5.30 | MIT |
| react | 19.3.1 | MIT |
| react-dom | 19.3.1 | MIT |
| rolldown | 1.2.14 | MIT |
| scheduler | 0.28.0 | MIT |
| source-map-js | 1.2.2 | BSD-3-Clause |
| tailwindcss | 4.3.3 | MIT |
| tapable | 2.3.3 | MIT |
| tinyglobby | 0.2.17 | MIT |
| tslib | 2.8.1 | 0BSD |
| typescript | 7.0.2 | Apache-2.0 |
| undici-types | 6.21.0 | MIT |
| vite | 8.3.4 | MIT |
| lightningcss | 1.33.0 | MPL-2.0 |
| lightningcss-android-arm64 | 1.33.0 | MPL-2.0 |
| lightningcss-darwin-arm64 | 1.33.0 | MPL-2.0 |
| lightningcss-darwin-x64 | 1.33.0 | MPL-2.0 |
| lightningcss-freebsd-x64 | 1.33.0 | MPL-2.0 |
| lightningcss-linux-arm-gnueabihf | 1.33.0 | MPL-2.0 |
| lightningcss-linux-arm64-gnu | 1.33.0 | MPL-2.0 |
| lightningcss-linux-arm64-musl | 1.33.0 | MPL-2.0 |
| lightningcss-linux-x64-gnu | 1.33.0 | MPL-2.0 |
| lightningcss-linux-x64-musl | 1.33.0 | MPL-2.0 |
| lightningcss-win32-arm64-msvc | 1.33.0 | MPL-2.0 |
| lightningcss-win32-x64-msvc | 1.33.0 | MPL-2.0 |
