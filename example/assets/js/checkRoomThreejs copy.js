// 准备场景、相机、渲染器、光线
let scene = null;
let camera = null;
let renderer = null;
let light = null;
let initThree = function () {
  // 增加一个性能监视器
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);

  // 创建渲染器
  const canvas = document.querySelector('#three_canvas');
  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 创建相机
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  // 增加一个轨道控制器
  controls = new THREE.OrbitControls(camera, canvas);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.rotateSpeed = - 0.25;

  camera.position.z = 0.01;
  controls.update();

  // 创建场景
  scene = new THREE.Scene();
}

// 加载纹理 渲染球体
let cube = null;
let initSkyBox = function () { 
  const loadManager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(loadManager);
  const materials = [
    // new THREE.MeshBasicMaterial({map: loader.load('/example/assets/img/movie_yourname.jpg')})
    new THREE.MeshBasicMaterial({map: loader.load('https://img.zcool.cn/community/01c87559b80c29a801207534df71f9.jpg')})
  ];
  loadManager.onLoad = () => {
    const geometry = new THREE.SphereGeometry(16, 64, 64);
    cube = new THREE.Mesh(geometry, materials[0]);
    cube.geometry.scale(1, 1, -1);
    scene.add(cube);
    animate();
  };
}

let animate = function () {
  // 渲染场景和相机
  renderer.render(scene, camera);
  // 随动画更新性能监视器
  stats.update();
  controls.update();

  // 回调动画
  requestAnimationFrame(animate);
}

// 启动方法或其他初始化方法
initThree();
initSkyBox();