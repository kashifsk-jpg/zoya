import * as THREE from "three";
import { seededRandom } from "@/lib/seeded-random";

export interface GarmentGeometryOptions {
  width: number;
  height: number;
  topY: number;
  segmentsWidth: number;
  segmentsHeight: number;
  /** half-width at t (0 = shoulder, 1 = hem) */
  widthProfile: (t: number) => number;
  /** forward curvature amplitude at t */
  depthProfile: (t: number) => number;
  seed: string;
  jitter?: number;
}

/**
 * Procedural draped-garment panel — a parametric curved grid standing in
 * for a real GLB abaya mesh until licensed 3D assets exist (see
 * public/models/README.md for the asset contract).
 */
export function createGarmentGeometry(options: GarmentGeometryOptions): THREE.BufferGeometry {
  const { width, height, topY, segmentsWidth, segmentsHeight, widthProfile, depthProfile, seed, jitter = 0.004 } = options;
  const rand = seededRandom(seed);

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let row = 0; row <= segmentsHeight; row++) {
    const t = row / segmentsHeight;
    const halfWidth = widthProfile(t) * width;
    const depth = depthProfile(t);
    for (let col = 0; col <= segmentsWidth; col++) {
      const u = col / segmentsWidth;
      const x = (u - 0.5) * 2 * halfWidth + (rand() - 0.5) * jitter;
      const z = Math.sin(u * Math.PI) * depth + (rand() - 0.5) * jitter;
      const y = topY - t * height;
      positions.push(x, y, z);
      uvs.push(u, t);
    }
  }

  const rowStride = segmentsWidth + 1;
  for (let row = 0; row < segmentsHeight; row++) {
    for (let col = 0; col < segmentsWidth; col++) {
      const a = row * rowStride + col;
      const b = a + 1;
      const c = a + rowStride;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function bodyPanelOptions(seed: string): GarmentGeometryOptions {
  return {
    width: 1,
    height: 2.7,
    topY: 1.15,
    segmentsWidth: 44,
    segmentsHeight: 90,
    seed,
    widthProfile: (t) => {
      // shoulder -> gentle waist -> A-line hem flare
      if (t < 0.12) return lerp(0.3, 0.27, t / 0.12);
      if (t < 0.45) return lerp(0.27, 0.25, (t - 0.12) / 0.33);
      return lerp(0.25, 0.46, smoothstep((t - 0.45) / 0.55));
    },
    depthProfile: (t) => lerp(0.16, 0.05, smoothstep(t)),
  };
}

export function sleevePanelOptions(seed: string, side: 1 | -1): GarmentGeometryOptions {
  return {
    width: 1,
    height: 1.5,
    topY: 1.08,
    segmentsWidth: 14,
    segmentsHeight: 40,
    seed,
    widthProfile: (t) => lerp(0.07, 0.1, t),
    depthProfile: (t) => lerp(0.05, 0.02, t) * side,
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}
