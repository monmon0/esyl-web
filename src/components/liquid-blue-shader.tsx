"use client";

/**
 * The liquid-metal domain-warp shader, recolored into the site's blue
 * palette (Tailwind blue-950 → blue-400 → blue-300) for the profile arc.
 */

import ShaderCanvas from "@/components/pixel-perfect/shader-canvas";

const FRAGMENT_SHADER = /* glsl */ `
  void main() {
    vec2 uv = uv01() * 3.0;
    float t = time * 0.15;
    vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(5.2, 1.3)));
    vec2 r = vec2(
      fbm(uv + 4.0 * q + vec2(1.7, 9.2) + t * 0.5),
      fbm(uv + 4.0 * q + vec2(8.3, 2.8))
    );
    float f = fbm(uv + 4.0 * r);
    vec3 col = mix(vec3(0.0902, 0.1451, 0.3294), vec3(0.3765, 0.6471, 0.9804), f);
    col = mix(col, vec3(0.5765, 0.7725, 0.9922), clamp(length(q), 0.0, 1.0) * 0.6);
    col = mix(col, vec3(0.5765, 0.7725, 0.9922), r.x * 0.35);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function LiquidBlueShader({
  className,
  dpr,
}: {
  className?: string;
  dpr?: number;
}) {
  return (
    <ShaderCanvas fragmentShader={FRAGMENT_SHADER} className={className} dpr={dpr} />
  );
}
