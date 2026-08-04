import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSway;
  uniform float uSeed;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float hemWeight = smoothstep(0.1, 1.0, uv.y);
    float wave = sin(pos.y * 2.1 + uTime * 0.55 + uSeed) * 0.05
               + sin(pos.y * 4.6 - uTime * 0.85 + uSeed * 2.0) * 0.018;
    float sway = cos(pos.y * 1.6 + uTime * 0.42 + uSeed) * 0.045;

    pos.x += wave * hemWeight * uSway;
    pos.z += sway * hemWeight * uSway;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform vec3 uBaseColor;
  uniform vec3 uRimColor;
  uniform vec3 uSweepColor;
  uniform float uSweepSpeed;
  uniform float uOpacity;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.4);
    vec3 rim = uRimColor * fresnel * 1.5;

    vec3 lightDir = normalize(vec3(0.3, 0.55, 0.78));
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 base = uBaseColor * (0.1 + diff * 0.4);

    float sweepBand = 0.09;
    float sweepPos = fract(uTime * uSweepSpeed);
    float sweep = smoothstep(sweepBand, 0.0, abs(vUv.y - sweepPos));
    vec3 sweepGlow = uSweepColor * sweep * 0.55;

    float g = hash(floor(vUv * 140.0));
    float glint = step(0.995, g) * fresnel * 1.8;

    vec3 color = (base + rim + sweepGlow) * uReveal + glint * uReveal;
    gl_FragColor = vec4(color, uOpacity);
  }
`;

export interface GarmentMaterialColors {
  base: THREE.ColorRepresentation;
  rim: THREE.ColorRepresentation;
  sweep: THREE.ColorRepresentation;
}

export function createGarmentMaterial(colors: GarmentMaterialColors, seedOffset = 0) {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uSway: { value: 1 },
      uSeed: { value: seedOffset },
      uReveal: { value: 0 },
      uOpacity: { value: 1 },
      uBaseColor: { value: new THREE.Color(colors.base) },
      uRimColor: { value: new THREE.Color(colors.rim) },
      uSweepColor: { value: new THREE.Color(colors.sweep) },
      uSweepSpeed: { value: 0.045 },
    },
  });
}
