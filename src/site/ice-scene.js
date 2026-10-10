"use strict";
// Rounded ice-cube point clouds. Canvas keeps the visual self-contained and offline-capable.
const ICE_CUBES = [
  { half: 70, center: [0, 43, 0], yaw: Math.PI / 4, pitch: 0.61548, roll: 0 },
  {
    half: 46,
    center: [-126, -73, 0],
    yaw: Math.PI / 4 + 0.08,
    pitch: 0.61548,
    roll: 0,
  },
  {
    half: 43,
    center: [123, -67, 0],
    yaw: Math.PI / 4 - 0.07,
    pitch: 0.61548,
    roll: 0,
  },
];
function rotateIcePoint(x, y, z, yaw, pitch, roll = 0) {
  const cy = Math.cos(yaw),
    sy = Math.sin(yaw),
    cp = Math.cos(pitch),
    sp = Math.sin(pitch),
    cr = Math.cos(roll),
    sr = Math.sin(roll);
  const a = x * cy + z * sy,
    b = z * cy - x * sy,
    c = y * cp - b * sp,
    d = y * sp + b * cp;
  return [a * cr - c * sr, a * sr + c * cr, d];
}
function createIceParticles(perCube = 1200) {
  let seed = 4217;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const points = [];
  ICE_CUBES.forEach((cube, index) => {
    const rounded = (x, y, z, edge = false) => {
      const h = cube.half,
        r = h * 0.22,
        core = h - r;
      const inner = [x, y, z].map((v) => Math.max(-core, Math.min(core, v))),
        delta = [x - inner[0], y - inner[1], z - inner[2]],
        length = Math.hypot(...delta) || 1;
      const coords = rotateIcePoint(
        ...inner.map((v, i) => v + (delta[i] * r) / length),
        cube.yaw,
        cube.pitch,
        cube.roll,
      );
      const normal = rotateIcePoint(
        ...delta.map((v) => v / length),
        cube.yaw,
        cube.pitch,
        cube.roll,
      );
      points.push({
        x: coords[0],
        y: coords[1],
        z: coords[2],
        nx: normal[0],
        ny: normal[1],
        nz: normal[2],
        cube: index,
        edge,
        seed: random(),
      });
    };
    for (let face = 0; face < 6; face++)
      for (let i = 0; i < Math.floor(perCube / 6); i++) {
        const pos = [
          (random() * 2 - 1) * cube.half,
          (random() * 2 - 1) * cube.half,
          (random() * 2 - 1) * cube.half,
        ];
        pos[Math.floor(face / 2)] = (face % 2 ? 1 : -1) * cube.half;
        rounded(...pos);
      }
    const steps = Math.max(12, Math.round(Math.sqrt(perCube) * 0.8));
    for (let axis = 0; axis < 3; axis++)
      for (const a of [-1, 1])
        for (const b of [-1, 1])
          for (let i = 0; i < steps; i++) {
            const pos = [];
            pos[axis] = ((i / (steps - 1)) * 2 - 1) * cube.half;
            pos[(axis + 1) % 3] = a * cube.half;
            pos[(axis + 2) % 3] = b * cube.half;
            rounded(...pos, true);
          }
  });
  return points;
}
function projectIceParticles(points, yaw, pitch, time) {
  return points.map((p) => {
    const center = ICE_CUBES[p.cube].center,
      float = Math.sin(time * 0.65 + p.cube * 2) * 7;
    const [x, y, z] = rotateIcePoint(
      p.x + center[0],
      p.y + center[1] + float,
      p.z + center[2],
      yaw,
      pitch,
    );
    const scale = 1;
    const normalZ =
      p.nz === undefined ? -1 : rotateIcePoint(p.nx, p.ny, p.nz, yaw, pitch)[2];
    return {
      x: x * scale,
      y: y * scale,
      z,
      scale,
      normalZ,
      cube: p.cube,
      edge: p.edge,
      seed: p.seed,
    };
  });
}
function createIceFaces() {
  const faces = [];
  ICE_CUBES.forEach((cube, index) => {
    for (let axis = 0; axis < 3; axis++)
      for (const sign of [-1, 1]) {
        const normal = [0, 0, 0];
        normal[axis] = sign;
        const n = rotateIcePoint(...normal, cube.yaw, cube.pitch, cube.roll);
        // Sample the same rounded surface as the particles, including the corner fillets.
        const corners = [
            [-1, -1],
            [1, -1],
            [1, 1],
            [-1, 1],
          ],
          vertices = [];
        for (let side = 0; side < 4; side++)
          for (let step = 0; step < 8; step++) {
            const ratio = step / 8,
              a = corners[side],
              b = corners[(side + 1) % 4],
              local = [0, 0, 0];
            local[axis] = sign * cube.half;
            local[(axis + 1) % 3] = (a[0] + (b[0] - a[0]) * ratio) * cube.half;
            local[(axis + 2) % 3] = (a[1] + (b[1] - a[1]) * ratio) * cube.half;
            const r = cube.half * 0.22,
              core = cube.half - r,
              inner = local.map((v) => Math.max(-core, Math.min(core, v))),
              delta = local.map((v, i) => v - inner[i]),
              length = Math.hypot(...delta);
            const rounded = inner.map((v, i) => v + (delta[i] * r) / length),
              point = rotateIcePoint(
                ...rounded,
                cube.yaw,
                cube.pitch,
                cube.roll,
              );
            vertices.push({
              x: point[0],
              y: point[1],
              z: point[2],
              cube: index,
              nx: n[0],
              ny: n[1],
              nz: n[2],
            });
          }
        faces.push({ vertices, top: axis === 1 && sign === -1 });
      }
  });
  return faces;
}
export function mountIceScene(root) {
  if (!root?.querySelector) return () => {};
  const canvas = root.querySelector("canvas"),
    ctx = canvas?.getContext?.("2d");
  if (!ctx) return () => {};
  const pause = root.querySelector(".ice-motion-toggle"),
    motion = window.matchMedia("(prefers-reduced-motion: reduce)"),
    coarse = window.matchMedia("(pointer: coarse)");
  const points = createIceParticles(coarse.matches ? 420 : 1200),
    faces = createIceFaces(),
    events = [];
  let width = 0,
    height = 0,
    dpr = 1,
    frame = null,
    disposed = false,
    visible = false,
    paused = motion.matches,
    time = 0,
    last = 0,
    lastDraw = 0;
  let yaw = 0,
    pitch = 0,
    targetYaw = 0,
    targetPitch = 0;
  const allowed = () =>
    !disposed &&
    visible &&
    !document.hidden &&
    !paused &&
    !document.querySelector(".modal-overlay");
  const cancel = () => {
    if (frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
    }
  };
  const on = (target, type, fn) => {
    target.addEventListener(type, fn);
    events.push(() => target.removeEventListener(type, fn));
  };
  function draw() {
    if (!width || !height) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const unit = Math.min(width / 455, height / 400),
      cx = width * 0.5,
      cy = height * 0.48;
    ctx.save();
    ctx.translate(cx, cy + 143 * unit);
    ctx.scale(1, 0.23);
    const floor = ctx.createRadialGradient(0, 0, 0, 0, 0, 150 * unit);
    floor.addColorStop(0, "rgba(64,133,221,.10)");
    floor.addColorStop(1, "rgba(64,133,221,0)");
    ctx.fillStyle = floor;
    ctx.beginPath();
    ctx.arc(0, 0, 150 * unit, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    const viewYaw = yaw + Math.sin(time * 0.2) * 0.025,
      viewPitch = pitch + Math.cos(time * 0.24) * 0.018;
    const glass = faces
      .map((face) => ({
        ...face,
        points: projectIceParticles(face.vertices, viewYaw, viewPitch, time),
      }))
      .filter((face) => face.points[0].normalZ < -0.02)
      .sort(
        (a, b) =>
          b.points.reduce((sum, p) => sum + p.z, 0) -
          a.points.reduce((sum, p) => sum + p.z, 0),
      );
    for (const face of glass) {
      const vertices = face.points.map((p) => ({
          x: cx + p.x * unit,
          y: cy + p.y * unit,
        })),
        minX = Math.min(...vertices.map((p) => p.x)),
        minY = Math.min(...vertices.map((p) => p.y)),
        maxX = Math.max(...vertices.map((p) => p.x)),
        maxY = Math.max(...vertices.map((p) => p.y));
      const gradient = ctx.createLinearGradient(minX, minY, maxX, maxY);
      gradient.addColorStop(
        0,
        face.top ? "rgba(255,255,255,.90)" : "rgba(211,247,255,.62)",
      );
      gradient.addColorStop(
        0.55,
        face.top ? "rgba(228,249,255,.70)" : "rgba(177,228,255,.35)",
      );
      gradient.addColorStop(
        1,
        face.top ? "rgba(167,223,255,.52)" : "rgba(104,182,238,.26)",
      );
      ctx.beginPath();
      vertices.forEach((p, i) =>
        i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y),
      );
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = "rgba(244,253,255,.8)";
      ctx.lineWidth = 1.4 * unit;
      ctx.lineJoin = "round";
      ctx.stroke();
    }
    const projected = projectIceParticles(
      points,
      viewYaw,
      viewPitch,
      time,
    ).sort((a, b) => b.z - a.z);
    for (const p of projected) {
      if (p.normalZ > 0.08) continue;
      const x = cx + p.x * unit,
        y = cy + p.y * unit,
        r = (p.edge ? 0.88 : 0.55 + p.seed * 0.5) * unit * p.scale;
      const hue = 194 + ((p.y + 140) / 320) * 28 + p.cube * 4,
        alpha =
          Math.max(0.24, Math.min(0.88, 0.7 - p.z / 650)) *
          (p.edge ? 0.85 : 0.68);
      ctx.fillStyle = `hsla(${hue},88%,${p.edge ? 53 : 56 + p.seed * 10}%,${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      if (p.edge && p.seed > 0.965) {
        ctx.fillStyle = "rgba(220,251,255,.85)";
        ctx.fillRect(x - 3 * unit, y - 0.5 * unit, 6 * unit, unit);
        ctx.fillRect(x - 0.5 * unit, y - 3 * unit, unit, 6 * unit);
      }
    }
    for (let i = 0; i < 30; i++) {
      const angle = i * 2.399,
        timeShift = time * 0.06,
        rx = Math.cos(angle + timeShift) * (173 + (i % 5) * 12),
        ry = Math.sin(angle + timeShift) * (120 + (i % 3) * 26);
      ctx.fillStyle = `rgba(68,170,247,${0.13 + (i % 4) * 0.06})`;
      ctx.beginPath();
      ctx.arc(
        cx + rx * unit,
        cy + ry * unit,
        ((i % 3) + 1) * 0.55 * unit,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    canvas.dataset.yaw = yaw.toFixed(3);
    canvas.dataset.pitch = pitch.toFixed(3);
  }
  function tick(timestamp) {
    frame = null;
    if (!allowed()) return;
    const delta = last ? Math.min((timestamp - last) / 1000, 0.06) : 0;
    last = timestamp;
    time += delta;
    if (timestamp - lastDraw >= 32) {
      yaw += (targetYaw - yaw) * 0.09;
      pitch += (targetPitch - pitch) * 0.09;
      draw();
      lastDraw = timestamp;
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancel();
    last = 0;
    pause.setAttribute("aria-pressed", paused);
    pause.setAttribute(
      "aria-label",
      paused ? pause.dataset.play : pause.dataset.pause,
    );
    pause.textContent = paused ? "▶" : "Ⅱ";
    draw();
    if (allowed()) frame = requestAnimationFrame(tick);
  }
  function resize() {
    const rect = root.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    draw();
  }
  on(root, "pointermove", (e) => {
    if (coarse.matches || e.pointerType === "touch" || motion.matches || paused)
      return;
    const r = root.getBoundingClientRect();
    targetYaw =
      Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)) *
      0.26;
    targetPitch =
      Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1)) * 0.2;
  });
  on(root, "pointerleave", () => {
    targetYaw = 0;
    targetPitch = 0;
  });
  on(pause, "click", () => {
    paused = !paused;
    sync();
  });
  on(document, "visibilitychange", sync);
  on(motion, "change", () => {
    paused = motion.matches;
    targetYaw = 0;
    targetPitch = 0;
    sync();
  });
  const observer =
    typeof IntersectionObserver === "function"
      ? new IntersectionObserver(
          (entries) => {
            visible = entries[0].isIntersecting;
            sync();
          },
          { threshold: 0.08 },
        )
      : null;
  if (observer) observer.observe(root);
  else visible = true;
  const resizer =
    typeof ResizeObserver === "function" ? new ResizeObserver(resize) : null;
  if (resizer) resizer.observe(root);
  else on(window, "resize", resize);
  root.classList.add("ice-scene-ready");
  resize();
  sync();
  const dispose = () => {
    disposed = true;
    cancel();
    observer?.disconnect();
    resizer?.disconnect();
    events.forEach((off) => off());
  };
  dispose.refresh = sync;
  return dispose;
}
