import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(25);

renderer.render(scene, camera);

const geometry = new THREE.SphereGeometry(16, 8, 8);
const material = new THREE.MeshToonMaterial({color: 0xc2c2c2});
const moon = new THREE.Mesh(geometry, material);
moon.position.set(-10,5,-100);

scene.add(moon);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15,-10,-25);

scene.add(pointLight);

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(1, 4, 4);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));

  //const testColor = '0x20ff00';
  var randomColor = Math.floor(Math.random() * 3);
  switch (randomColor) {
    case 0:
      var colorCode = new THREE.Color(0xfffb00);
      break;
    case 1:
      var colorCode = new THREE.Color(0xff0000);
      break;
    case 2:
      var colorCode = new THREE.Color(0x0081ff);
      break;
  }
  const material = new THREE.MeshStandardMaterial({color: colorCode});
  const star = new THREE.Mesh(geometry, material);
  star.position.set(x, y, z-200);

  scene.add(star);
}

Array(75).fill().forEach(addStar)

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x +=0.01;
  moon.rotation.y +=0.005;
  moon.rotation.z +=0.01;


  renderer.render(scene, camera);
}

animate();