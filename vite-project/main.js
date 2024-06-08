import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import "./style.css"
import gsap from 'gsap'

//scene
const scene = new THREE.Scene();


//letloadmodule
let loader = new GLTFLoader();
let model;
loader.load('./assets/model.glb', (gltf) => {
  model = gltf.scene;
  model.position.y = -5;
  scene.add(model);
  });

//mesh
const geometry = new THREE.SphereGeometry(3, 64, 64)
//standard material
const material = new THREE.MeshStandardMaterial({ 
  color: "#00ff83",
roughness:0.3,
 })
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

sphere.visible = false
//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//point light
const pointLight = new THREE.PointLight(0xffffff, 500, 1000);
pointLight.position.set(0, 10, 10)
scene.add(pointLight)

//ambientlight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05)
scene.add(ambientLight)



//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 15
scene.add(camera)



//renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//orbitcontrols
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true


//resize
window.addEventListener("resize", () => {
  console.log("lasidasd")
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

const tl = gsap.timeline({ defaults: { duration: 1 } })
tl.fromTo(sphere.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 })
tl.fromTo('nav', { y: '-100%' }, { y: '0%' })
tl.fromTo('.title', { opacity: '0' }, { opacity: '1' })

let mouseDown = false
let rgb = []
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

window.addEventListener("mousemove", (e) => {

  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ]

    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(pointLight.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    })
  }
})