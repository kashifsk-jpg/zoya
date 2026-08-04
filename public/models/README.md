# 3D Asset Contract

No licensed GLB/glTF garment models exist yet. Every 3D garment surface
currently rendered on the site — the product detail 3D view and the Atelier
viewer — is a **procedural stand-in**: parametric
draped-panel geometry (`src/lib/three/garment-geometry.ts`) with a custom
GLSL shader (`src/lib/three/garment-material.ts`) that fakes rim lighting,
a traveling light sweep and sparse glints in place of real embroidery/normal
maps. This keeps every 3D surface on brand (no primitive boxes, no bare
mannequins) while the real pipeline is pending.

When licensed 3D assets are produced, drop them here using the names and
contract below. Loader code should switch from the procedural geometry to
`useGLTF()` per component without changing any surrounding UI.

## Expected files

| File | Purpose |
|---|---|
| `abaya-obsidian-01.glb` | Obsidian Edit runway / PDP model |
| `abaya-embroidered-02.glb` | Embroidered Atelier runway / PDP model |
| `abaya-pleated-03.glb` | Quiet Structure runway / PDP model |
| `fabric-nida.glb`, `fabric-satin.glb`, … | Fabric constellation samples, one per `FabricId` |
| `embroidery-detail.glb` | Crafted-in-Detail macro sequence |

## Mesh / material naming

- Mesh names: `Body`, `SleeveLeft`, `SleeveRight`, `Overlay` (only where the
  silhouette has a bisht-style overlay).
- Material names must match a preset in `atelier-options.ts` `fabric` step
  ids (`matte-nida`, `silk-crepe`, `satin`, `linen-blend`, `jacquard`,
  `knitted-trim`, `lace`, `chiffon-overlay`) so the Atelier configurator can
  swap material variants by name.
- Morph targets (if used for silhouette variants): `mt_aline`, `mt_butterfly`,
  `mt_pleated` — 0..1 influence.
- Animation clips (if baked cloth-sim is supplied): `Idle_Sway`, `Reveal_In`.

## Textures

- Base color, normal, roughness, AO as separate KTX2/Basis textures, 2048px
  max for hero-tier assets, 1024px for runway/product tier.
- Embroidery detail: a dedicated height/normal mask, `_embroidery_normal.ktx2`,
  applied as a second normal layer over the base fabric.

## Geometry budget

- Hero garment: ≤ 60k triangles.
- Runway / PDP garment: ≤ 35k triangles.
- Fabric sample: ≤ 4k triangles.

## Orientation, origin, scale

- +Y up, +Z forward (facing camera at rotation 0).
- Origin at the garment's shoulder-line centre, floor at Y = 0 for a
  standing silhouette.
- Real-world scale in meters (a floor-length abaya ≈ 1.4–1.6m tall).

## Compression

Run every delivered `.glb` through `tools/optimize-model.mjs` (Draco or
Meshopt geometry compression, KTX2/Basis texture compression) before
committing — see `docs/ASSET_STRATEGY.md` for the full pipeline once that
tool exists.
