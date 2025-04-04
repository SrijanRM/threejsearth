import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;


const controls = new OrbitControls(camera, renderer.domElement)
const loader = new THREE.TextureLoader()
const geometry = new THREE.IcosahedronGeometry(1, 8);
const material = new THREE.MeshStandardMaterial({
    map: loader.load("./static/assets/earthmap1k.jpg")
})
const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh)

const hemilight = new THREE.HemisphereLight(0xffffff)
scene.add(hemilight)

function animate(t = 0) {
    requestAnimationFrame(animate)
    earthMesh.rotation.y += 0.005;
    renderer.render(scene, camera)
}
animate();