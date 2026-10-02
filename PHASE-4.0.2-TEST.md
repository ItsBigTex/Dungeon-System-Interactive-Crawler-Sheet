# Phase 4.0.2 Acceptance Test

1. Deploy and verify `window.DESCENT_GM_BUILD` returns `4.0.2`.
2. AI Content Studio -> ITEM.
3. Paste the reported Pool Cue prompt with Name: AI Decide, Tier: Gold, Category: Weapon, Damage Type: Piercing, Damage Dice: AI decide.
4. PASS only if the result has an authored name, gold tier, weapon category, structured mechanics.weapon, authored damage dice, Piercing damage, populated range, actual System prose, and mechanically represented billiards benefit/drawback.
5. Invented campaign mechanics should appear in campaign_rules/review_flags.
6. A bad first response should automatically repair once.
7. A still-invalid repair should be rejected with explicit failures.
