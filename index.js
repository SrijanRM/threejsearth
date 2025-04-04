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

const earthGroup = new THREE.Group()
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup)
new OrbitControls(camera, renderer.domElement)
const loader = new THREE.TextureLoader()
const detail = 12;
const geometry = new THREE.IcosahedronGeometry(1, detail);


const earthmaterial = new THREE.MeshStandardMaterial({
    map: loader.load("./static/assets/earthmap1k.jpg")
})
const earthMesh = new THREE.Mesh(geometry, earthmaterial);
earthGroup.add(earthMesh)

const lightMaterial = new THREE.MeshStandardMaterial({
    map: loader.load("./static/assets/earthlights1k.jpg"),
    blending:THREE.AdditiveBlending
})
const lightMesh = new THREE.Mesh(geometry, lightMaterial)
earthGroup.add(lightMesh)

const cloudMaterial = new THREE.MeshStandardMaterial({
    map:loader.load("./static/assets/earthcloudmaptrans.jpg"),
    transparent:true,
    opacity:0.5,
    blending :THREE.AdditiveBlending
})
const cloudmesh = new THREE.Mesh(geometry , cloudMaterial);
cloudmesh.scale.setScalar(1.01)
earthGroup.add(cloudmesh);

// const hemilight = new THREE.HemisphereLight(0xffffff,0x444444)
// scene.add(hemilight)

const sunLight = new THREE.DirectionalLight(0xffffff)
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight)

function animate(t = 0) {
    requestAnimationFrame(animate)
    earthMesh.rotation.y += 0.001;
    lightMesh.rotation.y += 0.001;
    cloudmesh.rotation.y += 0.001;
    renderer.render(scene, camera)
}
animate();