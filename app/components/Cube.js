"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Cube = () => {
  const canvasRef = useRef(null); // Reference to the canvas element
  const [isInitialized, setIsInitialized] = useState(false); // Tracks initialization state

  useEffect(() => {
    if (!canvasRef.current || isInitialized) return;

    // Initialize Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvasRef.current });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create and Add the Cube
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshBasicMaterial({ color: 0x8a2be2, wireframe: true })
    );
    scene.add(cube);

    // Set Camera Position
    camera.position.set(0, 0, 5);

    // Animation Loop
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle Window Resize
    const handleResize = () => {
      const { clientWidth, clientHeight } = canvasRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener("resize", handleResize);

    setIsInitialized(true);

    return () => {
      // Clean-up on Unmount
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [isInitialized]); // Only run this effect once on mount

  return (
    <div className="relative w-full h-full">
      {/* Attach Canvas via Ref */}
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
};

export default Cube;
