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
  const [height, setHeight] = React.useState(2);
  const [width, setWidth] = React.useState(1);
  const [depth, setDepth] = React.useState(1);

  React.useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // trasparente
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    

    var light = new THREE.AmbientLight (0xffffff, 0.5);
    scene.add(light);
    var light1 = new THREE.PointLight (0xffffff, 10);
    light1.position.set(-2, 2, 2);
    scene.add(light1);

    // Cubo
    const geometry = new THREE.BoxGeometry(width, height, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0x007bff });
    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube;
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []); // solo al montaggio, così la rotazione non riparte

  const handleHeightChange = (e) => {
    const newHeight = parseFloat(e.target.value);
    setHeight(newHeight);
    if (cubeRef.current) {
      cubeRef.current.scale.y = newHeight;
    }
  };

  const handleWidthChange = (e) => {
    const newWidth = parseFloat(e.target.value);
    setWidth(newWidth);
    if (cubeRef.current) {
      cubeRef.current.scale.x = newWidth;
    }
  };

  const handleDepthChange = (e) => {
    const newDepth = parseFloat(e.target.value);
    setDepth(newDepth);
    if (cubeRef.current) {
      cubeRef.current.scale.z = newDepth;
    }
  };

  return (
    <div style={{ display: 'flex', height: '80vh' }}>
      <div ref={containerRef} style={{ flex: 1 }} />
      <div style={{ width: '200px', padding: '10px' }}>
        <label>Altezza</label>
        <input
          type="range"
          min="0.5"
          max="10"
          step="0.5"
          value={height}
          onChange={handleHeightChange}
        />
        <label>Larghezza</label>
        <input
          type="range"
          min="0.5"
          max="10"
          step="0.5"
          value={width}
          onChange={handleWidthChange}
        />
        <label>Profondita</label>
        <input
          type="range"
          min="0.5"
          max="10"
          step="0.5"
          value={depth}
          onChange={handleDepthChange}
        />
      </div>
    </div>
  );
}
