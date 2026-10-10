import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene({ active = true }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // STARFIELD
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1800;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3]     = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffe8c0, size: 0.22, sizeAttenuation: true, transparent: true, opacity: 0.75 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // GOLD DUST PARTICLES
    const dustGeo = new THREE.BufferGeometry();
    const dustCount = 600;
    const dustPos = new Float32Array(dustCount * 3);
    const dustVel = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3]     = (Math.random() - 0.5) * 80;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      dustVel[i * 3]     = (Math.random() - 0.5) * 0.012;
      dustVel[i * 3 + 1] = (Math.random()) * 0.018 + 0.005;
      dustVel[i * 3 + 2] = (Math.random() - 0.5) * 0.006;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0xf0c060, size: 0.15, sizeAttenuation: true, transparent: true, opacity: 0.6 });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // FLOATING HEART MESHES
    const hearts = [];
    const heartColors = [0xc05070, 0xe08090, 0xbd9459, 0xff6b8a, 0xffd6e0];
    for (let h = 0; h < 18; h++) {
      const heartShape = new THREE.Shape();
      heartShape.moveTo(0, 0);
      heartShape.bezierCurveTo(0, -0.3, -0.5, -0.3, -0.5, 0);
      heartShape.bezierCurveTo(-0.5, 0.3, 0, 0.6, 0, 1);
      heartShape.bezierCurveTo(0, 0.6, 0.5, 0.3, 0.5, 0);
      heartShape.bezierCurveTo(0.5, -0.3, 0, -0.3, 0, 0);
      const heartGeo = new THREE.ShapeGeometry(heartShape, 12);
      const heartMat = new THREE.MeshBasicMaterial({
        color: heartColors[h % heartColors.length],
        transparent: true,
        opacity: Math.random() * 0.35 + 0.15,
        side: THREE.DoubleSide,
      });
      const heart = new THREE.Mesh(heartGeo, heartMat);
      const scale = Math.random() * 0.6 + 0.2;
      heart.scale.setScalar(scale);
      heart.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 20 - 5);
      heart.rotation.z = Math.random() * Math.PI * 2;
      heart.userData = {
        velY: Math.random() * 0.025 + 0.008,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        phase: Math.random() * Math.PI * 2,
      };
      hearts.push(heart);
      scene.add(heart);
    }

    // GLOWING RINGS
    const rings = [];
    for (let r = 0; r < 5; r++) {
      const ringGeo = new THREE.TorusGeometry(4 + r * 2.5, 0.04 + r * 0.015, 16, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: r % 2 === 0 ? 0xbd9459 : 0xc05070,
        transparent: true,
        opacity: 0.12 - r * 0.015,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + r * 0.3;
      ring.userData = { axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize() };
      rings.push(ring);
      scene.add(ring);
    }

    // BOKEH BLOBS
    const blobs = [];
    const blobColors = [0x61172a, 0xa85540, 0x8b5a2b];
    for (let b = 0; b < 8; b++) {
      const blobGeo = new THREE.SphereGeometry(2 + Math.random() * 3, 16, 16);
      const blobMat = new THREE.MeshBasicMaterial({ color: blobColors[b % blobColors.length], transparent: true, opacity: 0.06 + Math.random() * 0.04 });
      const blob = new THREE.Mesh(blobGeo, blobMat);
      blob.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 20 - 10);
      blob.userData = { phase: Math.random() * Math.PI * 2, speed: 0.003 + Math.random() * 0.005 };
      blobs.push(blob);
      scene.add(blob);
    }

    // MOUSE PARALLAX
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ANIMATION LOOP
    let frameId;
    let t = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.016;

      stars.rotation.y += 0.00008;
      stars.rotation.x += 0.00004;

      const dp = dustGeo.attributes.position.array;
      for (let i = 0; i < dustCount; i++) {
        dp[i * 3]     += dustVel[i * 3];
        dp[i * 3 + 1] += dustVel[i * 3 + 1];
        dp[i * 3 + 2] += dustVel[i * 3 + 2];
        if (dp[i * 3 + 1] > 40) dp[i * 3 + 1] = -40;
        if (Math.abs(dp[i * 3]) > 40) dustVel[i * 3] *= -1;
      }
      dustGeo.attributes.position.needsUpdate = true;

      hearts.forEach((heart) => {
        const u = heart.userData;
        heart.position.y += u.velY;
        heart.position.x += Math.sin(t * 0.5 + u.phase) * 0.008;
        heart.rotation.z += u.rotSpeed;
        heart.rotation.y += u.rotSpeed * 0.5;
        if (heart.position.y > 40) heart.position.y = -40;
      });

      rings.forEach((ring, i) => {
        ring.rotateOnAxis(ring.userData.axis, 0.0015 + i * 0.001);
        ring.material.opacity = 0.07 + Math.sin(t * 0.6 + i) * 0.04;
      });

      blobs.forEach((blob) => {
        const s = 1 + Math.sin(t * blob.userData.speed * 60 + blob.userData.phase) * 0.12;
        blob.scale.setScalar(s);
      });

      camera.position.x += (mouse.x * 4 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 3 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
