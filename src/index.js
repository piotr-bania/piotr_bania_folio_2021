import * as THREE from 'three'
import './style/main.scss'
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader'
import {
    gsap
} from "gsap"

console.log(THREE)

// ----------------- Canvas -----------------

const canvas_1 = document.querySelector('canvas.canvas-1')

// ----------------- Scene -----------------

const scene = new THREE.Scene()

// ----------------- Sizes -----------------

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// ----------------- Camera -----------------

const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = -1
camera.position.y = 0
camera.position.z = 6

// ----------------- Lights -----------------

const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4)
scene.add(hemiLight)

const spotLight = new THREE.SpotLight(0xffffff, 4)
spotLight.position.set(-50, 50, 50)
spotLight.castShadow = true
spotLight.shadow.bias = -0.0001
spotLight.shadow.mapSize.width = 1024 * 4
spotLight.shadow.mapSize.height = 1024 * 4
scene.add(spotLight)

// ----------------- 3d models -----------------

let modelsDistance = 5

// Model 1
let model_1 = new GLTFLoader()
model_1.load('../src/assets/models/sphere2/sphere2.gltf', function (gltf) {
    // Model
    model_1 = gltf.scene
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(0, 0, 0)
    gltf.scene.position.y = -modelsDistance * 0

    // Texture
    // const textureLoader = new THREE.TextureLoader()
    // const normalMapTexture = textureLoader.load("../src/assets/models/test/Marble06_4K_Normal.png")
    // const modelColorTexture = textureLoader.load('../src/assets/models/test/Marble06_4K_BaseColor.png')
    // normalMapTexture.wrapS = THREE.RepeatWrapping
    // normalMapTexture.wrapT = THREE.RepeatWrapping


    // Material
    const newMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x7161F5,
        // map: modelColorTexture,
        // normalMap: normalMapTexture,
        // clearcoatNormalMap: normalMapTexture,
        metalness: 1,
        roughness: 0,
        transmission: 1,
        thickness: 0,
    })
    model_1.traverse((o) => {
        if (o.isMesh) o.material = newMaterial
    })

    model_1.traverse(n => {
        if (n.isMesh) {
            n.castShadow = true
            n.receiveShadow = true
            if (n.material.map) n.material.map.anisotropy = 16
        }
    })

    scene.add(model_1)

    // Animation
    gsap.to(model_1.rotation, {
        duration: 500,
        delay: 0,
        y: -15,
        repeat: -1
    })
})

// ----------------- Render -----------------

// Render 1
const renderer = new THREE.WebGLRenderer({
    canvas: canvas_1,
    antialias: true,
    alpha: true
})

renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
renderer.outputEncoding = THREE.sRGBEncoding

renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

// ----------------- Section paralax -----------------

let scrollY = window.scrollY

window.addEventListener('scroll', () => {
    scrollY = window.scrollY
})

// ----------------- Orbit controls -----------------

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.autoRotate = true
// controls.autoRotateSpeed = -0.25
// controls.enableDamping = true
// controls.enableZoom = false

// ----------------- Helpers -----------------

// const gridHelper = new THREE.GridHelper(10, 10)
// scene.add(gridHelper)
// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

// ----------------- GUI -----------------/

// const gui = new GUI()

// gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001).name('directionalLight intensity')
// gui.addColor(directionalLight, 'color').name('directionalLight color')
// gui.add(directionalLight.position, 'x').min(- 3).max(3).step(0.01).name('directionalLight X')
// gui.add(directionalLight.position, 'y').min(- 3).max(3).step(0.01).name('directionalLight Y')
// gui.add(directionalLight.position, 'z').min(- 3).max(3).step(0.01).name('directionalLight Z')

// ----------------- Clock -----------------/

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Animate camera
    camera.position.y = -scrollY / sizes.height * modelsDistance

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// ----------------- Animation -----------------

function animate() {
    requestAnimationFrame(animate)

    // spotLight.position.set(
    //     camera.position.x + 10,
    //     camera.position.y + 10,
    //     camera.position.z + 10
    // )

    // controls.update()
    renderer.render(scene, camera)
}
animate()

// ----------------- Resize -----------------

function onWindowResize() {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)

    // Casting shadows
    renderer.shadowMap.enabled = true
}
window.addEventListener('resize', onWindowResize, false)