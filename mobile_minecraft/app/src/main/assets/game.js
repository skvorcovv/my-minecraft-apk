// Basic 3D Mobile Minecraft Clone using Three.js

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky color
scene.fog = new THREE.Fog(0x87CEEB, 10, 50);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: false }); // Disable antialias for performance on mobile
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

// Texture loader (Using solid colors to avoid CORS issues in file:// protocol on Android WebView, but simulating textures)
const materials = {
    grass: new THREE.MeshLambertMaterial({ color: 0x4CAF50 }), // Top grass
    dirt: new THREE.MeshLambertMaterial({ color: 0x795548 }),
    stone: new THREE.MeshLambertMaterial({ color: 0x9E9E9E }),
    wood: new THREE.MeshLambertMaterial({ color: 0x8D6E63 })
};

// Voxel World Logic
const worldSize = 32;
const geometry = new THREE.BoxGeometry(1, 1, 1);
const blocks = []; // To check collisions and raycasting
const simplex = new SimplexNoise();

function generateWorld() {
    for (let x = -worldSize/2; x < worldSize/2; x++) {
        for (let z = -worldSize/2; z < worldSize/2; z++) {
            // Simple terrain generation
            let y = Math.floor(simplex.noise2D(x * 0.05, z * 0.05) * 3);

            // Surface block
            addBlock(x, y, z, materials.grass);
            // Dirt below
            addBlock(x, y-1, z, materials.dirt);
            addBlock(x, y-2, z, materials.dirt);
            // Stone below that
            addBlock(x, y-3, z, materials.stone);
        }
    }
}

function addBlock(x, y, z, material) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    blocks.push(mesh);
}

generateWorld();

// Player/Camera Logic
const player = {
    height: 1.6,
    speed: 4.0,
    jumpForce: 7.0,
    velocity: new THREE.Vector3(),
    direction: new THREE.Vector3(),
    onGround: false
};
camera.position.set(0, 5, 0);

// Physics & Gravity
const gravity = -15.0;
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();

// --- Mobile Controls (Touch) ---
let moveForward = 0, moveRight = 0;
let isLookTouching = false;
let previousTouch = { x: 0, y: 0 };

// Joystick
const zone = document.getElementById('controls-zone');
const stick = document.getElementById('stick');
let joyActive = false;
let joyCenter = {x:0, y:0};

zone.addEventListener('touchstart', (e) => {
    e.preventDefault();
    joyActive = true;
    const touch = e.changedTouches[0];
    const rect = zone.getBoundingClientRect();
    joyCenter = { x: rect.left + rect.width/2, y: rect.top + rect.height/2 };
    updateJoystick(touch.clientX, touch.clientY);
}, {passive: false});

zone.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if(!joyActive) return;
    updateJoystick(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
}, {passive: false});

zone.addEventListener('touchend', (e) => {
    e.preventDefault();
    joyActive = false;
    stick.style.transform = `translate(0px, 0px)`;
    moveForward = 0; moveRight = 0;
}, {passive: false});

function updateJoystick(tx, ty) {
    let dx = tx - joyCenter.x;
    let dy = ty - joyCenter.y;
    const maxDist = 35;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist > maxDist) {
        dx = (dx / dist) * maxDist;
        dy = (dy / dist) * maxDist;
    }

    stick.style.transform = `translate(${dx}px, ${dy}px)`;

    // Normalize to -1.0 to 1.0
    moveRight = dx / maxDist;
    moveForward = -dy / maxDist; // Invert Y
}

// Camera Look (Right side of screen)
document.addEventListener('touchstart', (e) => {
    // Ignore if touching controls or buttons
    if(e.target.closest('#controls-zone') || e.target.closest('#action-buttons') || e.target.closest('#inventory')) return;
    isLookTouching = true;
    previousTouch.x = e.touches[0].clientX;
    previousTouch.y = e.touches[0].clientY;
}, {passive: false});

document.addEventListener('touchmove', (e) => {
    if(!isLookTouching) return;
    e.preventDefault();
    const touch = e.touches[0];

    // Ignore touch on the left half of the screen (joystick area) if needed, but we rely on target
    let movementX = touch.clientX - previousTouch.x;
    let movementY = touch.clientY - previousTouch.y;

    const lookSpeed = 0.005;

    // Euler angles for camera rotation
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.setFromQuaternion(camera.quaternion);

    euler.y -= movementX * lookSpeed;
    euler.x -= movementY * lookSpeed;

    // Clamp vertical look
    euler.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, euler.x));

    camera.quaternion.setFromEuler(euler);

    previousTouch.x = touch.clientX;
    previousTouch.y = touch.clientY;
}, {passive: false});

document.addEventListener('touchend', () => { isLookTouching = false; });

// Action Buttons
document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (player.onGround) player.velocity.y = player.jumpForce;
});

// Inventory selection
let currentMaterial = materials.grass;
const slots = document.querySelectorAll('.slot');
slots.forEach(slot => {
    slot.addEventListener('touchstart', (e) => {
        slots.forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');
        const type = e.target.getAttribute('data-type');
        currentMaterial = materials[type];
    });
});

// Interaction (Build / Break)
function getTargetBlock() {
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera); // Center of screen
    const intersects = raycaster.intersectObjects(blocks);
    if (intersects.length > 0 && intersects[0].distance < 6) {
        return intersects[0];
    }
    return null;
}

document.getElementById('btn-break').addEventListener('touchstart', (e) => {
    e.preventDefault();
    const target = getTargetBlock();
    if (target) {
        scene.remove(target.object);
        blocks.splice(blocks.indexOf(target.object), 1);
    }
});

document.getElementById('btn-build').addEventListener('touchstart', (e) => {
    e.preventDefault();
    const target = getTargetBlock();
    if (target) {
        const pos = target.object.position.clone().add(target.face.normal);
        // Simple overlap check (don't build inside yourself)
        if (Math.abs(pos.x - camera.position.x) < 0.8 && Math.abs(pos.z - camera.position.z) < 0.8 && pos.y < camera.position.y && pos.y > camera.position.y - player.height) {
            return;
        }
        addBlock(pos.x, pos.y, pos.z, currentMaterial);
    }
});

// Main Loop
function animate() {
    requestAnimationFrame(animate);

    const delta = Math.min(clock.getDelta(), 0.1);

    // Physics
    player.velocity.y += gravity * delta;

    // Movement relative to camera direction
    player.direction.z = Number(moveForward);
    player.direction.x = Number(moveRight);
    player.direction.normalize();

    // Get camera looking direction (ignore Y for walking)
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.setFromQuaternion(camera.quaternion);
    let rot = euler.y;

    // Calculate movement vector
    let moveZ = (Math.cos(rot) * player.direction.z - Math.sin(rot) * player.direction.x) * player.speed;
    let moveX = (Math.sin(rot) * player.direction.z + Math.cos(rot) * player.direction.x) * player.speed;

    // Super basic collision detection (Raycasting down)
    player.onGround = false;
    raycaster.set(camera.position, new THREE.Vector3(0, -1, 0));
    const intersects = raycaster.intersectObjects(blocks);

    if (intersects.length > 0 && intersects[0].distance < player.height && player.velocity.y <= 0) {
        player.velocity.y = 0;
        camera.position.y = intersects[0].object.position.y + 0.5 + player.height;
        player.onGround = true;
    } else {
        camera.position.y += player.velocity.y * delta;
    }

    // Apply horizontal movement (no wall collision yet for simplicity in prototype)
    camera.position.x -= moveX * delta;
    camera.position.z -= moveZ * delta;

    // Fall out of world reset
    if (camera.position.y < -20) {
        camera.position.set(0, 10, 0);
        player.velocity.y = 0;
    }

    renderer.render(scene, camera);
}

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
