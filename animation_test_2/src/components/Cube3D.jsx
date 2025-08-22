import React from "react";
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";

export default function Cube3D() {
  return (
    <div style={{ height: "80vh" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[-2, 2, 2]} intensity={1} />
        <Box args={[1, 2, 1]}>
          <meshStandardMaterial color="#007bff" />
        </Box>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
