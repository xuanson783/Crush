const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controlsWebGL = new THREE.OrbitControls(camera, renderer.domElement);

const tl = gsap.timeline({
  repeat: -1,
  yoyo: true,
});

const path = document.querySelector("path");
const length = path.getTotalLength();
const vertices = [];
for (let i = 0; i < length; i += 0.1) {
  const point = path.getPointAtLength(i);
  const vector = new THREE.Vector3(point.x, -point.y, 0);
  vector.x += (Math.random() - 0.5) * 30;
  vector.y += (Math.random() - 0.5) * 30;
  vector.z += (Math.random() - 0.5) * 70;
  vertices.push(vector);
  tl.from(
    vector,
    {
      x: 600 / 2,
      y: -552 / 2,
      z: 0,
      ease: "power2.inOut",
      duration: "random(2, 5)",
    },
    i * 0.002
  );
}
const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
const material = new THREE.PointsMaterial({
  color: #000000,
  blending: THREE.AdditiveBlending,
  size: 3,
});
const particles = new THREE.Points(geometry, material);
particles.position.x -= 600 / 2;
particles.position.y += 552 / 2;
scene.add(particles);

gsap.fromTo(
  scene.rotation,
  {
    y: -0.2,
  },
  {
    y: 0.2,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
    duration: 3,
  }
);

function render() {
  requestAnimationFrame(render);
  geometry.setFromPoints(vertices);
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);

requestAnimationFrame(render);

const loader = new THREE.TextureLoader();
loader.load("./background.jpg", function (texture) {
  scene.background = texture;
});
