# Phase 4.4.2 Test
1. Replace module with v0.4.4.2 and restart Foundry.
2. Module Settings → BUILD R&R PROTOTYPE.
3. Activate R&R Cards and Games — 403 Fisk.
4. Confirm background, room labels, tables, sales counter, grid, walls/doors, warm lights and map notes.
5. Add a manual note/token; rebuild and confirm manual content remains.
6. Rebuild again; Descent-created map objects should replace, not duplicate.
7. Console: `await TheDescentBridge.buildRRMap()`.
8. Confirm prior scene activation/System announcement/Playlist tests still work.
