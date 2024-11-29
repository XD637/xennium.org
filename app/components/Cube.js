"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Cube = () => {
  const canvasRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false); // Initialize once

  useEffect(() => {
    if (!canvasRef.current || isInitialized) return;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvasRef.current });

    // Handle resizing logic
    const handleResize = () => {
      const size = 250; // Fixed square size
      canvasRef.current.width = size;
      canvasRef.current.height = size;
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(size, size);
    };

    handleResize(); // Initial size setup

    // Cube setup
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshBasicMaterial({ color: 0x8a2be2, wireframe: true })
    );
    scene.add(cube);

    camera.position.set(0, 0, 5);

    // Animation loop (no changes needed here)
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize listener
    window.addEventListener("resize", handleResize);

    // Set initialization state
    setIsInitialized(true);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [isInitialized]);

  return (
    <div className="relative" style={{ width: "250px", height: "250px" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
};

export default Cube;
