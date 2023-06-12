import './style.css'
import rubic from "./rubic.js";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

var cube = new rubic(3, 3, 6, ["blue", "red", "white", "green", "orange", "yellow"]);
console.log(cube)


export const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});

const controls = new OrbitControls( camera, renderer.domElement );
controls.rotateSpeed = 0.5; 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(20);

controls.update();

renderer.render(scene, camera);
cube.add();


function animate() {
  requestAnimationFrame(animate);

  controls.update();
  
  renderer.render(scene, camera);
}

animate();

export function turn(index, dir) {
  cube.turn(index, dir);
}

export function changeFill() {
  cube.changeFill();
}
