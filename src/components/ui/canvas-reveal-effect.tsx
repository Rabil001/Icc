"use client";
import { cn } from "@/utils/cn";
import React, { useMemo, useRef, useEffect } from "react";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
}: {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) => {
  return (
    <div className={cn("h-full relative bg-white w-full", containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors ?? [[0, 255, 255]]}
          dotSize={dotSize ?? 3}
          opacities={
            opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
          }
          shader={`
            float animation_speed_factor = ${animationSpeed.toFixed(1)};
            float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01;
            intro_offset = 0.0;
            float time = u_time * animation_speed_factor - intro_offset;
            float noise = snoise(vec3(st2, time));
            float opacity = step(0.0, noise);
            float opacity_index = v_opacity_index;
            float chosen_opacity = 0.0;
            if (opacity_index == 0.0) chosen_opacity = ${opacities[0].toFixed(2)};
            else if (opacity_index == 1.0) chosen_opacity = ${opacities[1].toFixed(2)};
            else if (opacity_index == 2.0) chosen_opacity = ${opacities[2].toFixed(2)};
            else if (opacity_index == 3.0) chosen_opacity = ${opacities[3].toFixed(2)};
            else if (opacity_index == 4.0) chosen_opacity = ${opacities[4].toFixed(2)};
            else if (opacity_index == 5.0) chosen_opacity = ${opacities[5].toFixed(2)};
            else if (opacity_index == 6.0) chosen_opacity = ${opacities[6].toFixed(2)};
            else if (opacity_index == 7.0) chosen_opacity = ${opacities[7].toFixed(2)};
            else if (opacity_index == 8.0) chosen_opacity = ${opacities[8].toFixed(2)};
            else if (opacity_index == 9.0) chosen_opacity = ${opacities[9].toFixed(2)};
            finalColor = vec4(v_color, opacity * chosen_opacity);
          `}
        />
      </div>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
      )}
    </div>
  );
};

interface DotMatrixProps {
  colors?: number[][];
  opacities?: number[];
  totalSize?: number;
  dotSize?: number;
  shader?: string;
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.1],
  totalSize = 4,
  dotSize = 2,
  shader = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { center } = useMemo(() => {
    return {
      center: [totalSize / 2, totalSize / 2],
    };
  }, [totalSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 position;
      attribute float opacityIndex;
      attribute vec3 color;
      varying float v_opacity_index;
      varying vec3 v_color;
      void main() {
        v_opacity_index = opacityIndex;
        v_color = color;
        gl_Position = vec4(position, 0.0, 1.0);
        gl_PointSize = ${dotSize.toFixed(1)};
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      varying float v_opacity_index;
      varying vec3 v_color;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_total_size;

      vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }

      vec4 mod289(vec4 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }

      vec4 permute(vec4 x) {
        return mod289(((x*34.0)+1.0)*x);
      }

      vec4 taylorInvSqrt(vec4 r) {
        return 1.79284291400159 - 0.85373472095314 * r;
      }

      float snoise(vec3 v) {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 =   v - i + dot(i, C.xxx) ;

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod289(i);
        vec4 p = permute( permute( permute(
                   i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );

        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );

        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                      dot(p2,x2), dot(p3,x3) ) );
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float total_size = u_total_size;
        vec2 st2 = vec2(int(st.x * u_resolution.x / total_size), int(st.y * u_resolution.y / total_size));

        vec4 finalColor = vec4(0.0);
        ${shader}
        gl_FragColor = finalColor;
      }
    `;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const program = gl.createProgram();
    if (!program) return;
    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    const positionAttribute = gl.getAttribLocation(program, "position");
    const opacityIndexAttribute = gl.getAttribLocation(program, "opacityIndex");
    const colorAttribute = gl.getAttribLocation(program, "color");
    const timeUniform = gl.getUniformLocation(program, "u_time");
    const resolutionUniform = gl.getUniformLocation(program, "u_resolution");
    const totalSizeUniform = gl.getUniformLocation(program, "u_total_size");

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, canvas.width, canvas.height);
        updateBuffers();
      }
    };

    let points: number[] = [];
    let opacityIndices: number[] = [];
    let colorsArray: number[] = [];

    const updateBuffers = () => {
      points = [];
      opacityIndices = [];
      colorsArray = [];

      const nx = Math.ceil(canvas.width / totalSize);
      const ny = Math.ceil(canvas.height / totalSize);

      for (let i = 0; i < nx; i++) {
        for (let j = 0; j < ny; j++) {
          const x = (i * totalSize + totalSize / 2) / canvas.width * 2 - 1;
          const y = (j * totalSize + totalSize / 2) / canvas.height * 2 - 1;
          points.push(x, y);
          opacityIndices.push(Math.floor(Math.random() * 10));
          const color = colors[Math.floor(Math.random() * colors.length)];
          colorsArray.push(color[0] / 255, color[1] / 255, color[2] / 255);
        }
      }

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(positionAttribute);
      gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

      const opacityIndexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, opacityIndexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(opacityIndices), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(opacityIndexAttribute);
      gl.vertexAttribPointer(opacityIndexAttribute, 1, gl.FLOAT, false, 0, 0);

      const colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsArray), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(colorAttribute);
      gl.vertexAttribPointer(colorAttribute, 3, gl.FLOAT, false, 0, 0);
    };

    let animationFrameId: number;
    const render = (time: number) => {
      resize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform1f(timeUniform, time * 0.001);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.uniform1f(totalSizeUniform, totalSize);
      gl.drawArrays(gl.POINTS, 0, points.length / 2);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors, totalSize, dotSize, shader]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
};
