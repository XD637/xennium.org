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
      75, // Field of view
      1, // Aspect ratio (1:1 for square canvas)
      0.1, // Near plane
      1000 // Far plane
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvasRef.current });

    // Handle resizing the canvas to always be square and fixed height
    const handleResize = () => {
      const height = 250; // Fixed height
      canvasRef.current.height = height;
      canvasRef.current.width = height; // Width equal to height for square canvas

      // Update camera aspect ratio and renderer size
      camera.aspect = 1; // Aspect ratio 1:1 for square canvas
      camera.updateProjectionMatrix();
      renderer.setSize(height, height);
    };

    handleResize(); // Initial call to set size

    // Create and Add the Cube
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2), // Cube size
      new THREE.MeshBasicMaterial({ color: 0x8a2be2, wireframe: true })
    );
    scene.add(cube);

    // Set Camera Position to ensure the cube is centered
    camera.position.set(0, 0, 5); // Adjust the camera's distance from the cube

    // Animation Loop
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize listener
    window.addEventListener("resize", handleResize);

    setIsInitialized(true);

    return () => {
      // Clean-up on unmount
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [isInitialized]); // Only run this effect once on mount

  return (
    <div className="relative" style={{ width: "250px", height: "250px" }}>
      {/* Attach Canvas via Ref */}
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
};

export default Cube;
