function Messaggio(props) {
  return (
    <div className="alert alert-info">
      {props.testo}
    </div>
  );
}

function Cube3D() {
  const containerRef = React.useRef(null);
  const cubeRef = React.useRef(null);
  const [pendingHeight, setPendingHeight] = React.useState(1);

  React.useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Cubo
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x007bff });
    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube;
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []); // solo al montaggio, così la rotazione non riparte

  const handleChange = (e) => {
    setPendingHeight(parseFloat(e.target.value));
  };

  const handleChangeComplete = () => {
    if (cubeRef.current) {
      cubeRef.current.scale.y = pendingHeight;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div ref={containerRef} style={{ flex: 1 }} />
      <div style={{ width: '200px', padding: '10px' }}>
        <input
          type="range"
          min="0.5"
          max="10"
          step="0.01"
          value={pendingHeight}
          onChange={handleChange}
          onMouseUp={handleChangeComplete}
          onTouchEnd={handleChangeComplete}
        />
      </div>
    </div>
  );
}
