import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks';
import styles from './AsciiOrb.module.css';

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

const ORB_WIDTH = 39;
const ORB_HEIGHT = 21;
const CENTER_X = (ORB_WIDTH - 1) / 2;
const CENTER_Y = (ORB_HEIGHT - 1) / 2;
const X_RADIUS = ORB_WIDTH * 0.43;
const Y_RADIUS = ORB_HEIGHT * 0.47;
const ORB_FRAME_COUNT = 28;
const ORB_TILT = -0.38;
const FRAME_INTERVAL_MS = 170;

const rotateAroundX = ({ x, y, z }: Vector3, angle: number): Vector3 => {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);

  return {
    x,
    y: y * cosine - z * sine,
    z: y * sine + z * cosine,
  };
};

const rotateAroundY = ({ x, y, z }: Vector3, angle: number): Vector3 => {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);

  return {
    x: x * cosine + z * sine,
    y,
    z: -x * sine + z * cosine,
  };
};

const sampleSurfaceCharacter = (gridX: number, gridY: number, angle: number) => {
  const normalizedX = (gridX - CENTER_X) / X_RADIUS;
  const normalizedY = (gridY - CENTER_Y) / Y_RADIUS;
  const radialDistance = normalizedX * normalizedX + normalizedY * normalizedY;

  if (radialDistance > 1) {
    return ' ';
  }

  const viewPoint = {
    x: normalizedX,
    y: normalizedY,
    z: Math.sqrt(1 - radialDistance),
  };

  const objectPoint = rotateAroundY(rotateAroundX(viewPoint, -ORB_TILT), -angle);
  const longitude = Math.atan2(objectPoint.z, objectPoint.x);
  const latitude = Math.asin(objectPoint.y);
  const edgeFalloff = 1 - Math.sqrt(radialDistance);
  const light = viewPoint.z * 0.84 + viewPoint.x * 0.12 - viewPoint.y * 0.08;

  const bandSignal = Math.sin(latitude * 16 + Math.sin(longitude * 2.3) * 0.7);
  const landSignal =
    Math.sin(longitude * 2.7 + Math.cos(latitude * 2.2) * 1.3) +
    Math.cos(latitude * 5.4) * 0.82 +
    Math.sin((longitude - latitude) * 3.8) * 0.42;
  const landThreshold = 1.02 + Math.sin(latitude * 4.8) * 0.12;

  const isEdge = edgeFalloff < 0.075;
  const isLand = landSignal > landThreshold;
  const showsOcean = bandSignal > -0.68 || light > 0.84;

  if (isEdge) {
    return '#';
  }

  if (isLand) {
    return ' ';
  }

  if (!showsOcean) {
    return light > 0.72 ? ':' : ' ';
  }

  if (light > 0.92 || bandSignal > 0.4) {
    return '.';
  }

  return ':';
};

const createOrbFrame = (frame: number) =>
  Array.from({ length: ORB_HEIGHT }, (_, y) =>
    Array.from({ length: ORB_WIDTH }, (_, x) =>
      sampleSurfaceCharacter(x, y, (frame / ORB_FRAME_COUNT) * Math.PI * 2),
    ).join(''),
  ).join('\n');

// Precompute frames so the runtime animation only swaps text nodes.
const ORB_FRAMES = Array.from({ length: ORB_FRAME_COUNT }, (_, frame) => createOrbFrame(frame));

export const AsciiOrb = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const orbRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const orbNode = orbRef.current;

    if (!orbNode) {
      return undefined;
    }

    orbNode.textContent = ORB_FRAMES[0];

    if (prefersReducedMotion) {
      return undefined;
    }

    let frameIndex = 0;
    let isInViewport = true;
    let intervalId: number | null = null;

    const stopAnimation = () => {
      if (intervalId === null) {
        return;
      }

      window.clearInterval(intervalId);
      intervalId = null;
    };

    const startAnimation = () => {
      if (intervalId !== null) {
        return;
      }

      intervalId = window.setInterval(() => {
        frameIndex = (frameIndex + 1) % ORB_FRAMES.length;
        orbNode.textContent = ORB_FRAMES[frameIndex];
      }, FRAME_INTERVAL_MS);
    };

    const syncAnimationState = () => {
      if (document.hidden || !isInViewport) {
        stopAnimation();
        return;
      }

      startAnimation();
    };

    const handleVisibilityChange = () => {
      syncAnimationState();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    let observer: IntersectionObserver | undefined;

    if (typeof IntersectionObserver === 'function') {
      observer = new IntersectionObserver(([entry]) => {
        isInViewport = entry?.isIntersecting ?? true;
        syncAnimationState();
      });
      observer.observe(orbNode);
    }

    syncAnimationState();

    return () => {
      stopAnimation();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer?.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <div className={styles.shell} role="img" aria-label="Animated ASCII orb">
      <pre className={styles.orb} aria-hidden="true" ref={orbRef}>
        {ORB_FRAMES[0]}
      </pre>
    </div>
  );
};
