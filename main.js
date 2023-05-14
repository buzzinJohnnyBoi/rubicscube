import './style.css'
import rubic from "./rubic.js";
import * as THREE from 'three';

var cube = new rubic(3, 3, 6, ["blue", "red", "orange", "white", "yellow", "green"]);
console.log(cube)


export const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(20);

renderer.render(scene, camera);
cube.add();

function animate() {
  requestAnimationFrame(animate);



  renderer.render(scene, camera);
}

animate();