

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
scene.fog = new THREE.Fog(0x87CEEB, 10, 40);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Textures

const base64Atlas = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAQCAYAAACBSfjBAAAIHElEQVR4nH2XSZIr2Y1FjzfP+4bhEUn7FpmWa9CkNlIL0EDbqlVoVMuoqeb//0xGRpJJ73t3DViAnJJMMAuzIJ3+HnBxcQFYf/7fv+y2bdN1HQBpmlLXNU3TkCQJR6uqiizLmOeZcRxJkoQ//fUDANd1WZaFeZ4xxjAMA47j8PLyQtd1bNtG13VEUaTnLctC/l//TVEUfP/+nSzLWJaFvu+xbZs4jgGwLIt93xmGgdfXV2zb5tu3b6Rpiv9//4MxBtd16fseY4z60LatnnG0OI5p2xbXdXH/lnA+n5nnmXmeAQiCgLZtKYqCruu4Xq84jkOapniexziO7PsOgP3x8UHXdfi+ryABCl5VVXpwURQYY+i6Tp8bYxSMqqr08zRNGGNomkYdF/Bs26YsS1zXxRjD5XLRxKzrSpqmxHGMZVkYY6jrWgO73W5M00Se59i2jTGGcRzp+56XlxcAfN+n6zriOCZNU41jGAYA5nnGcRyWZSFJErquY55n/W3f9ziOw+fnJ/M8s+87b29vbNvGMAy0basJtYuiwHVdxnEkCAKiKNKD2rbFGKOgXK9XrtcrnudpQALuNE0a+DiOnE4npmnC8zy2bWOaJizLwvM8yrLk559/fmKEJMP3faZpUqDnedYgjTH88MMPGGOwbVuT4/v+U7K2bdNkCfhZlhEEAWEYMk0Ty7I8JRfgdrsp45um0TjzPKfve/XDdV2Ny17XVQECuFwu1HVNWZbEcczb25s+y/Mcx3GUfb/99ps+S9MUy7KU+tu20fc9vu8rcFmWcb1eSdOUy+UCoKUgdnR833e2bVP2zvPMt2/f6PuebdtIkgTXdcmyjKZpWJZFGSYJABiGQc8Zx5Gu67AsS6tOkic4VFWF4zj6riSjaRryPMfzPK0wWzImDqRpyjRNypDb7ab6GAQBcRyzrisAr6+vxHFM3/eM4whAWZYKbJ7nbNumIJVlqU5KcOK82FF3t23TwOX7LMtY15Usy4CHdHz9+lXBHIaBoiiwLEsrKY5jff9+vxNFEXme8/r6qncJ6FEUkWWZ/gEav2AQBIHKi50kCeM4Escxy7Jg2zaO41CWJfAoD8nAOI5PtJ/nmbZtCcNQv8vz/Em4q6qiqioFLAiCp3ObplHnjyZnuq7Lvu80TYPruvq8aRoFvigKvTsIAvZ9Z993yrLEtm3WdaXrOsIwxBhDHMfc7/cnva/rmnmeud1uzPOMbdtUVaX+isnvRE9tAeR0Oulhrus+dUvJoud5JEmi4nu0siy1lI42zzNZlmnJreuqQEipNE1Dmqbkea7v9X1PGIY0TcO6rqpbSZKQJAnbtuF5Ho7jaEWUZcm6rupDFEXKYDmzKAqu1yu2bWNZliYjTVOWZdHSPJb3uq5PErCuK+fz+QHgEQBjDJ+fnwRBoAinaaqdR8rUdV1+//13vUC64r7vvL+/PzFKMhjHMU3TaPfLskwTJQwoy5IkSZSt9/udH3/8UZMnCXEch7quadv2CTDLsnAc50n7xKSZ3G43TqeTslSI4vs+YRiSZRnGGJUhz/OI4xjXdem6jvP5TBAEVFX1mATkAsmmbdsq0uJwEAQarO/7Gujx3SMIRVGofsCD1W3bPs2BUj6S4a7rFAzRLrlLEjcMg/4vIg9wPp/J85wsy2jblm3bGMeRbduUZWmasm2blnHbtuR5rmw7NjOJWcghTSiKIm63Gx8fH4Rh+BjFROukfE6nE8YYtm2jLEuGYSAMQ/q+1y4XhqH+7/u+ir00jbquGceRaZp4f39Xx6Io0pnr2Dgcx1Fg53mmLMunQd62bbZtU30ry5Jt2x6z4v8vAZIc0d95nhWYuq45n8/0fa9s/PLly6PqylT92LZN2RtFkQ7bMtxLYmWsaZoGO45j8jxXivd9z9evX3EcB8dxMMawrqtevizLU9MYx5EwDHU4vt1u9H1Pnufa0cdx1HIahoFlWfTcY/KiKMIYo6UkA/JRx4ZhoOs69n2nbVvu97uyUMhw7KBCiqqqnvS5rms9V1jatq0+77qO0+mkLI6iSP2Fh4wVRYHtui7TND01jTzPKcuSuq6p6xrLsjRI13VZ11XLFh7l+Ouvv+oaFYYhwzCwriv7vjNNk5ZEnueEYahaBg/93fddy1pAE92L45goivA8T5MlyRGgrterNqd/Bl2GcNu2VQKqqnqaNwFlmIwt4te/M2k4dtu2eJ73L90zTVN++uknDex2u+lmAKiOHH8/z/NTIhzH0a2iaRqCIFDnpOmIWZalQ/HxuzAMtYHVdY3neQRBQJZlCoDYsXwl2XVdE8cxvu/z9vama57s3YBKlNixe2dZRl3XSgppIL7vY9v2o4SP6Mu+9/37d82A7/u6uoh2yZgh24eAJOb7Pn3fY1mWrnG3200B7vteA17XVbXnl19+UYnY950kSXR4N8YwTROu6+qdR+0+mjQUGU8APj8/NTHHJni/3/XOowbKO2ma8vHxQRAE/PHHH4rHOI6PLiyzje/7yhQpORl2j9lumoY4jrlcLriui2VZ1HX95JSwa993BUu0T2RDhluZs2RjEDbkeU7TNAqWJFkSB48yE5Gv61oZLywRC4JAPzuOw/1+pyxLpml6+l0URcq24yopwH758gXf96nr+h+r3Pl8xrIsxnHUVUkcBHh5edGRYhgG3t/ftTSkg8oF8q6Ac2RJHMd0XceyLARBwDRNCm7btjp7iTZWVaWAJEnC5XJhXVfqun4qf7k7TdP/qFmikZ7n4bqu7rWyHMgYdezWxwVjXVdtVGJ/B73fjGB+jBR8AAAAAElFTkSuQmCC';
const textureLoader = new THREE.TextureLoader();
textureLoader.magFilter = THREE.NearestFilter;


const atlasTexture = textureLoader.load(base64Atlas);
atlasTexture.magFilter = THREE.NearestFilter;
atlasTexture.minFilter = THREE.NearestFilter;

const material = new THREE.MeshLambertMaterial({ map: atlasTexture, vertexColors: true, transparent: true, alphaTest: 0.1 });

// Texture Atlas UV Mapping (5 textures: Grass, Dirt, Stone, Wood, Brick)
// 0: Grass, 1: Dirt, 2: Stone, 3: Wood, 4: Brick
function getUV(type, face) {
    let index = 0; // default Grass
    if (type === BLOCK.GRASS) {
        if (face === 'top') index = 0;
        else if (face === 'bottom') index = 1;
        else index = 0; // Simplified to just grass everywhere to fit atlas limitation
    } else if (type === BLOCK.DIRT) {
        index = 1;
    } else if (type === BLOCK.STONE) {
        index = 2;
    } else if (type === BLOCK.WOOD) {
        index = 3;
    } else if (type === BLOCK.BRICK || type === BLOCK.LEAVES || type === BLOCK.SAND) {
        // Fallbacks for now since python atlas script didn't generate all 7, just 5.
        // Let's map LEAVES to Grass and SAND to Dirt.
        index = (type === BLOCK.LEAVES) ? 0 : 1;
    }

    // Atlas is 80x16. 5 sprites of 16x16.
    const uStep = 1 / 5;
    const uMin = index * uStep;
    const uMax = (index + 1) * uStep;
    const vMin = 0;
    const vMax = 1;

    return [
        new THREE.Vector2(uMin, vMin), // bottom left
        new THREE.Vector2(uMax, vMin), // bottom right
        new THREE.Vector2(uMin, vMax), // top left
        new THREE.Vector2(uMax, vMax)  // top right
    ];
}



const imgMap = {
    1: base64Atlas,
    2: base64Atlas,
    3: base64Atlas,
    4: base64Atlas,
    5: base64Atlas,
    6: '' // Sand doesn't have an icon yet, we'll use color in UI
};
// --- Engine Architecture ---

const WORLD_SIZE = 32;
const WORLD_HEIGHT = 64;
const TPS = 20;

const BLOCK = { AIR: 0, GRASS: 1, DIRT: 2, STONE: 3, WOOD: 4, LEAVES: 5, SAND: 6 };
const BLOCK_HARDNESS = { 0: 0, 1: 0.6, 2: 0.5, 3: 1.5, 4: 1.0, 5: 0.2, 6: 0.5 };

// 3D Array storage [x][y][z]
const worldData = new Uint8Array(WORLD_SIZE * WORLD_HEIGHT * WORLD_SIZE);
const lightData = new Uint8Array(WORLD_SIZE * WORLD_HEIGHT * WORLD_SIZE); // 0-15
const meshes = {};

const geometry = new THREE.BoxGeometry(1, 1, 1);
const blockGroup = new THREE.Group();
scene.add(blockGroup);

function getIndex(x, y, z) {
    return x * WORLD_HEIGHT * WORLD_SIZE + y * WORLD_SIZE + z;
}

function inBounds(x, y, z) {
    return x >= 0 && x < WORLD_SIZE && y >= 0 && y < WORLD_HEIGHT && z >= 0 && z < WORLD_SIZE;
}

function getBlock(x, y, z) {
    if (!inBounds(x, y, z)) return BLOCK.AIR;
    return worldData[getIndex(x, y, z)];
}

function setBlock(x, y, z, type) {
    if (!inBounds(x, y, z)) return;
    worldData[getIndex(x, y, z)] = type;
    calculateLighting();
    rebuildMesh();
}

const simplex = new SimplexNoise();
const simplex3D = new SimplexNoise(); // For caves

function generateWorld() {
    for (let x = 0; x < WORLD_SIZE; x++) {
        for (let z = 0; z < WORLD_SIZE; z++) {
            let surfaceY = Math.floor(simplex.noise2D(x * 0.05, z * 0.05) * 6) + 30;

            for (let y = 0; y < WORLD_HEIGHT; y++) {
                let type = BLOCK.AIR;
                if (y === surfaceY) type = BLOCK.GRASS;
                else if (y < surfaceY && y > surfaceY - 3) type = BLOCK.DIRT;
                else if (y <= surfaceY - 3) type = BLOCK.STONE;

                // 3D Perlin Caves
                if (y < surfaceY && y > 2) {
                    let caveNoise = simplex3D.noise3D(x * 0.1, y * 0.1, z * 0.1);
                    if (caveNoise > 0.4) type = BLOCK.AIR;
                }

                worldData[getIndex(x, y, z)] = type;
            }

            // Trees
            if (getBlock(x, surfaceY, z) === BLOCK.GRASS && Math.random() > 0.95 && x > 2 && x < WORLD_SIZE-2 && z > 2 && z < WORLD_SIZE-2) {
                let h = 4;
                for (let i = 1; i <= h; i++) worldData[getIndex(x, surfaceY + i, z)] = BLOCK.WOOD;
                for (let lx = -1; lx <= 1; lx++) {
                    for (let lz = -1; lz <= 1; lz++) {
                        for (let ly = 0; ly <= 1; ly++) {
                            if (Math.abs(lx) + Math.abs(lz) + ly === 3) continue;
                            if (lx === 0 && lz === 0 && ly === 0) continue;
                            worldData[getIndex(x + lx, surfaceY + h + ly, z + lz)] = BLOCK.LEAVES;
                        }
                    }
                }
            }
        }
    }

    // Add some sand for physics test
    worldData[getIndex(10, 45, 10)] = BLOCK.SAND;
    worldData[getIndex(10, 46, 10)] = BLOCK.SAND;

    calculateLighting();
    rebuildMesh();
}

function calculateLighting() {
    lightData.fill(0);
    const queue = [];
    for (let x = 0; x < WORLD_SIZE; x++) {
        for (let z = 0; z < WORLD_SIZE; z++) {
            let light = 15;
            for (let y = WORLD_HEIGHT - 1; y >= 0; y--) {
                if (getBlock(x, y, z) !== BLOCK.AIR && getBlock(x,y,z) !== BLOCK.LEAVES) {
                    break;
                }
                lightData[getIndex(x, y, z)] = light;
                queue.push({x, y, z, l: light});
            }
        }
    }

    let iter = 0;
    while(queue.length > 0 && iter < 10000) {
        iter++;
        let n = queue.shift();
        if (n.l <= 1) continue;

        const dirs = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
        for (let d of dirs) {
            let nx = n.x + d[0], ny = n.y + d[1], nz = n.z + d[2];
            if (inBounds(nx, ny, nz) && getBlock(nx, ny, nz) === BLOCK.AIR) {
                let idx = getIndex(nx, ny, nz);
                if (lightData[idx] < n.l - 1) {
                    lightData[idx] = n.l - 1;
                    queue.push({x: nx, y: ny, z: nz, l: n.l - 1});
                }
            }
        }
    }
}


function rebuildMesh() {
    // Clear old
    while(blockGroup.children.length > 0){
        let child = blockGroup.children[0];
        blockGroup.remove(child);
        child.geometry.dispose();
        // Don't dispose material, it's shared
    }

    const positions = [];
    const normals = [];
    const uvs = [];
    const colors = [];
    const indices = [];
    let indexOffset = 0;

    // Directions: +x, -x, +y, -y, +z, -z
    const dirs = [
        { d: [1,0,0], n: [1,0,0], face: 'right', v: [[0.5,-0.5,-0.5],[0.5,-0.5,0.5],[0.5,0.5,-0.5],[0.5,0.5,0.5]] },
        { d: [-1,0,0], n: [-1,0,0], face: 'left', v: [[-0.5,-0.5,0.5],[-0.5,-0.5,-0.5],[-0.5,0.5,0.5],[-0.5,0.5,-0.5]] },
        { d: [0,1,0], n: [0,1,0], face: 'top', v: [[-0.5,0.5,0.5],[0.5,0.5,0.5],[-0.5,0.5,-0.5],[0.5,0.5,-0.5]] },
        { d: [0,-1,0], n: [0,-1,0], face: 'bottom', v: [[-0.5,-0.5,-0.5],[0.5,-0.5,-0.5],[-0.5,-0.5,0.5],[0.5,-0.5,0.5]] },
        { d: [0,0,1], n: [0,0,1], face: 'front', v: [[-0.5,-0.5,0.5],[0.5,-0.5,0.5],[-0.5,0.5,0.5],[0.5,0.5,0.5]] },
        { d: [0,0,-1], n: [0,0,-1], face: 'back', v: [[0.5,-0.5,-0.5],[-0.5,-0.5,-0.5],[0.5,0.5,-0.5],[-0.5,0.5,-0.5]] }
    ];

    for (let x = 0; x < WORLD_SIZE; x++) {
        for (let y = 0; y < WORLD_HEIGHT; y++) {
            for (let z = 0; z < WORLD_SIZE; z++) {
                let type = getBlock(x, y, z);
                if (type !== BLOCK.AIR) {

                    let l = lightData[getIndex(x,y,z)] / 15.0;
                    if(l < 0.2) l = 0.2; // AO base

                    // Face Culling Loop
                    for (let f of dirs) {
                        let nx = x + f.d[0];
                        let ny = y + f.d[1];
                        let nz = z + f.d[2];
                        let nType = getBlock(nx, ny, nz);

                        // Render face if touching Air or Leaves (transparent)
                        if (nType === BLOCK.AIR || nType === BLOCK.LEAVES) {
                            // Add 4 vertices
                            for (let v of f.v) {
                                positions.push(x + v[0], y + v[1], z + v[2]);
                                normals.push(f.n[0], f.n[1], f.n[2]);
                                colors.push(l, l, l); // Apply lighting
                            }

                            // Add UVs
                            let faceUVs = getUV(type, f.face);
                            uvs.push(faceUVs[0].x, faceUVs[0].y, faceUVs[1].x, faceUVs[1].y, faceUVs[2].x, faceUVs[2].y, faceUVs[3].x, faceUVs[3].y);

                            // Add 2 triangles (6 indices)
                            indices.push(indexOffset, indexOffset+1, indexOffset+2);
                            indices.push(indexOffset+2, indexOffset+1, indexOffset+3);
                            indexOffset += 4;
                        }
                    }
                }
            }
        }
    }

    const chunkGeometry = new THREE.BufferGeometry();
    chunkGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    chunkGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    chunkGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    chunkGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    chunkGeometry.setIndex(indices);

    const chunkMesh = new THREE.Mesh(chunkGeometry, material);
    blockGroup.add(chunkMesh);
}

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

generateWorld();

// --- Dropped Entities ---
const entities = [];
const itemGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);

function spawnEntity(x, y, z, type) {
    const mesh = new THREE.Mesh(itemGeometry, materials[type]);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    entities.push({ mesh: mesh, type: type, vx: (Math.random()-0.5)*5, vy: 2, vz: (Math.random()-0.5)*5 });
}

// --- Physics & Ticks (20 TPS) ---
const TICK_RATE = 1000 / TPS;
let lastTick = performance.now();

function updateTicks() {
    let now = performance.now();
    if (now - lastTick > TICK_RATE) {
        lastTick = now;

        let changed = false;
        for (let x = 0; x < WORLD_SIZE; x++) {
            for (let z = 0; z < WORLD_SIZE; z++) {
                for (let y = 1; y < WORLD_HEIGHT; y++) {
                    let type = getBlock(x, y, z);
                    if (type === BLOCK.SAND && getBlock(x, y - 1, z) === BLOCK.AIR) {
                        worldData[getIndex(x, y, z)] = BLOCK.AIR;
                        worldData[getIndex(x, y - 1, z)] = BLOCK.SAND;
                        changed = true;
                    }
                }
            }
        }
        if (changed) {
            calculateLighting();
            rebuildMesh();
        }

        for (let i = entities.length - 1; i >= 0; i--) {
            let e = entities[i];
            e.vy -= 0.5;

            let dx = camera.position.x - e.mesh.position.x;
            let dy = camera.position.y - e.mesh.position.y;
            let dz = camera.position.z - e.mesh.position.z;
            let dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            if (dist < 3) {
                e.vx += (dx / dist) * 1.0;
                e.vy += (dy / dist) * 1.0;
                e.vz += (dz / dist) * 1.0;
            }

            e.mesh.position.x += e.vx * (TICK_RATE/1000);
            e.mesh.position.y += e.vy * (TICK_RATE/1000);
            e.mesh.position.z += e.vz * (TICK_RATE/1000);

            e.mesh.rotation.y += 0.1;

            let floorY = Math.floor(e.mesh.position.y);
            if (getBlock(Math.floor(e.mesh.position.x), floorY, Math.floor(e.mesh.position.z)) !== BLOCK.AIR) {
                e.mesh.position.y = floorY + 1.15;
                e.vy *= -0.5;
                e.vx *= 0.8;
                e.vz *= 0.8;
            }

            if (dist < 1) {
                scene.remove(e.mesh);
                pickupItem(e.type);
                entities.splice(i, 1);
            }
        }
    }
}


// Crafting Logic
let craftGrid = [null, null, null, null];
let craftResult = null;

const RECIPES = [
    { in: [BLOCK.WOOD, null, null, null], out: BLOCK.WOOD, outCount: 4 } // Fake recipe just to show it works
];

function updateCrafting() {
    craftResult = null;
    let sig = craftGrid.map(i => i ? i.type : null);

    // Very basic exact match (requires exact placement in grid)
    for (let r of RECIPES) {
        if (r.in[0] === sig[0] && r.in[1] === sig[1] && r.in[2] === sig[2] && r.in[3] === sig[3]) {
            craftResult = { type: r.out, count: r.outCount };
            break;
        }
    }
}

// --- Inventory & UI Logic ---
let inventory = new Array(36).fill(null);
let selectedSlot = 0;
let isInventoryOpen = false;

function pickupItem(type) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i] && inventory[i].type === type && inventory[i].count < 64) {
            inventory[i].count++;
            updateUI();
            return;
        }
    }
    for (let i = 0; i < inventory.length; i++) {
        if (!inventory[i]) {
            inventory[i] = {type: type, count: 1};
            updateUI();
            return;
        }
    }
}

inventory[0] = {type: BLOCK.DIRT, count: 64};
inventory[1] = {type: BLOCK.WOOD, count: 16};
inventory[2] = {type: BLOCK.SAND, count: 64};
inventory[3] = {type: BLOCK.STONE, count: 32};


let movingSlotIdx = null;

function updateUI() {
    const hotbarDiv = document.getElementById('hotbar-slots');
    if (!hotbarDiv) return;
    hotbarDiv.innerHTML = '';

    function createSlot(item, idx, clickHandler) {
        let slot = document.createElement('div');
        slot.className = 'slot';
        if (idx === selectedSlot && idx < 9) slot.classList.add('active');
        if (movingSlotIdx === idx) slot.style.borderColor = 'red';

        slot.onclick = clickHandler;

        if (item) {
            if (imgMap[item.type]) slot.style.backgroundImage = `url(${imgMap[item.type]})`;
            else if (item.type === BLOCK.SAND) slot.style.backgroundColor = '#D2B48C';

            let countLabel = document.createElement('div');
            countLabel.className = 'count';
            countLabel.innerText = item.count;
            slot.appendChild(countLabel);
        }
        return slot;
    }

    function handleSlotClick(idx) {
        if (!isInventoryOpen) {
            selectedSlot = idx;
            updateUI();
            return;
        }

        if (movingSlotIdx === null) {
            if (inventory[idx]) movingSlotIdx = idx;
        } else {
            // Swap
            let temp = inventory[idx];
            inventory[idx] = inventory[movingSlotIdx];
            inventory[movingSlotIdx] = temp;
            movingSlotIdx = null;
        }
        updateUI();
    }

    for (let i = 0; i < 9; i++) {
        hotbarDiv.appendChild(createSlot(inventory[i], i, () => handleSlotClick(i)));
    }

    const invGrid = document.getElementById('inv-grid');
    if (invGrid && isInventoryOpen) {
        invGrid.innerHTML = '';
        for (let i = 9; i < 36; i++) {
            invGrid.appendChild(createSlot(inventory[i], i, () => handleSlotClick(i)));
        }

        // Crafting Grid
        const craftGridDiv = document.getElementById('craft-grid');
        craftGridDiv.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            let slot = document.createElement('div');
            slot.className = 'slot';
            let item = craftGrid[i];
            if (item) {
                if (imgMap[item.type]) slot.style.backgroundImage = `url(${imgMap[item.type]})`;
                else if (item.type === BLOCK.SAND) slot.style.backgroundColor = '#D2B48C';

                let countLabel = document.createElement('div');
                countLabel.className = 'count';
                countLabel.innerText = item.count;
                slot.appendChild(countLabel);
            }
            slot.onclick = () => {
                if (movingSlotIdx !== null) {
                    craftGrid[i] = inventory[movingSlotIdx];
                    inventory[movingSlotIdx] = null;
                    movingSlotIdx = null;
                    updateCrafting();
                    updateUI();
                } else if (craftGrid[i]) {
                    // Put back in inventory
                    pickupItem(craftGrid[i].type);
                    craftGrid[i] = null;
                    updateCrafting();
                    updateUI();
                }
            };
            craftGridDiv.appendChild(slot);
        }

        // Crafting Result
        const craftResultDiv = document.getElementById('craft-result');
        craftResultDiv.innerHTML = '';
        if (craftResult) {
            if (imgMap[craftResult.type]) craftResultDiv.style.backgroundImage = `url(${imgMap[craftResult.type]})`;
            else if (craftResult.type === BLOCK.SAND) craftResultDiv.style.backgroundColor = '#D2B48C';

            let countLabel = document.createElement('div');
            countLabel.className = 'count';
            countLabel.innerText = craftResult.count;
            craftResultDiv.appendChild(countLabel);

            craftResultDiv.onclick = () => {
                pickupItem(craftResult.type); // Give result
                // Consume ingredients
                for (let i=0; i<4; i++) {
                    if (craftGrid[i]) {
                        craftGrid[i].count--;
                        if (craftGrid[i].count <= 0) craftGrid[i] = null;
                    }
                }
                updateCrafting();
                updateUI();
            };
        } else {
            craftResultDiv.style.backgroundImage = '';
            craftResultDiv.style.backgroundColor = '';
        }
    }
}


// --- Player/Camera Logic ---
const player = { height: 1.6, speed: 4.0, jumpForce: 7.0, velocity: new THREE.Vector3(), onGround: false };
camera.position.set(WORLD_SIZE/2, WORLD_HEIGHT, WORLD_SIZE/2);
const gravity = -15.0;
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();

let moveForward = 0, moveRight = 0;
let isLookTouching = false, previousTouch = { x: 0, y: 0 };


// --- Controls: D-Pad ---
let moveDir = { forward: 0, back: 0, left: 0, right: 0 };

function bindDPad(id, key) {
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener('touchstart', (e) => { e.preventDefault(); moveDir[key] = 1; });
    el.addEventListener('touchend', (e) => { e.preventDefault(); moveDir[key] = 0; });
}
bindDPad('dpad-up', 'forward');
bindDPad('dpad-down', 'back');
bindDPad('dpad-left', 'left');
bindDPad('dpad-right', 'right');

// Replace moveForward / moveRight
// in animate: let moveForward = moveDir.forward - moveDir.back;
// let moveRight = moveDir.right - moveDir.left;



// Interaction: Tap to place, Long Press to Break
let touchStartTimer = 0;
let isTouchingScreen = false;
let touchStartPosition = {x: 0, y: 0};

document.addEventListener('touchstart', (e) => {
    if(e.target.closest('#dpad') || e.target.closest('#action-buttons') || e.target.closest('#inventory-ui') || e.target.closest('.ui-layer')) return;
    if(e.touches[0].clientX < window.innerWidth / 2) return; // ignore left side (trackpad is right side)

    isLookTouching = true;
    previousTouch.x = e.touches[0].clientX; previousTouch.y = e.touches[0].clientY;

    touchStartTimer = performance.now();
    isTouchingScreen = true;
    touchStartPosition = {x: e.touches[0].clientX, y: e.touches[0].clientY};

    // Start break interval
    const target = getTargetBlock();
    if (target) {
        let type = getBlock(target.x, target.y, target.z);
        let timeReq = BLOCK_HARDNESS[type] * 1000;
        if (timeReq < 200) timeReq = 400; // minimum

        breakInterval = setTimeout(() => {
            if (isTouchingScreen) {
                setBlock(target.x, target.y, target.z, BLOCK.AIR);
                spawnEntity(target.x, target.y, target.z, type);
                // Also trigger haptic feedback if possible
                if (navigator.vibrate) navigator.vibrate(50);
                isTouchingScreen = false; // Prevent build on touchend
            }
        }, timeReq);
    }
}, {passive: false});

document.addEventListener('touchmove', (e) => {
    if(!isLookTouching) return;
    e.preventDefault();
    const touch = e.touches[0];

    // If we move too much, cancel break
    let dist = Math.abs(touch.clientX - touchStartPosition.x) + Math.abs(touch.clientY - touchStartPosition.y);
    if (dist > 10) {
        clearTimeout(breakInterval);
        isTouchingScreen = false;
    }

    let movementX = touch.clientX - previousTouch.x, movementY = touch.clientY - previousTouch.y;
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.setFromQuaternion(camera.quaternion);
    euler.y -= movementX * 0.007; euler.x -= movementY * 0.007;
    euler.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, euler.x));
    camera.quaternion.setFromEuler(euler);
    previousTouch.x = touch.clientX; previousTouch.y = touch.clientY;
}, {passive: false});

document.addEventListener('touchend', (e) => {
    isLookTouching = false;
    clearTimeout(breakInterval);

    if (isTouchingScreen && performance.now() - touchStartTimer < 200) {
        // Fast tap -> Place block
        const target = getTargetBlock();
        if (target) {
            let slotItem = inventory[selectedSlot];
            if (slotItem && slotItem.count > 0) {
                let tx = target.x + target.nx;
                let ty = target.y + target.ny;
                let tz = target.z + target.nz;

                if (!(Math.abs(tx - camera.position.x) < 0.8 && Math.abs(tz - camera.position.z) < 0.8 &&
                    ty < camera.position.y && ty > camera.position.y - player.height)) {
                    setBlock(tx, ty, tz, slotItem.type);
                    slotItem.count--;
                    if (slotItem.count === 0) inventory[selectedSlot] = null;
                    updateUI();
                }
            }
        }
    }
    isTouchingScreen = false;
});

document.getElementById('btn-jump').addEventListener('touchstart', (e) => { e.preventDefault(); if (player.onGround) player.velocity.y = player.jumpForce; });

function getTargetBlock() {
    let rayPos = camera.position.clone();
    let rayDir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);

    for(let d=0; d<5; d+=0.1) {
        let p = rayPos.clone().add(rayDir.clone().multiplyScalar(d));
        let bx = Math.floor(p.x + 0.5);
        let by = Math.floor(p.y + 0.5);
        let bz = Math.floor(p.z + 0.5);

        if (getBlock(bx, by, bz) !== BLOCK.AIR) {
            let back = p.clone().sub(rayDir.clone().multiplyScalar(0.1));
            let nx = 0, ny = 0, nz = 0;
            if (Math.floor(back.x + 0.5) < bx) nx = -1;
            else if (Math.floor(back.x + 0.5) > bx) nx = 1;
            else if (Math.floor(back.y + 0.5) < by) ny = -1;
            else if (Math.floor(back.y + 0.5) > by) ny = 1;
            else if (Math.floor(back.z + 0.5) < bz) nz = -1;
            else if (Math.floor(back.z + 0.5) > bz) nz = 1;

            return { x: bx, y: by, z: bz, nx, ny, nz };
        }
    }
    return null;
}

const outlineGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.01, 1.01, 1.01));
const outlineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
const highlightBox = new THREE.LineSegments(outlineGeometry, outlineMaterial);
highlightBox.visible = false;
scene.add(highlightBox);

let breakingBlock = null;
let breakStartTime = 0;
let breakInterval = null;







// Toggle Inventory
document.getElementById('btn-inv').addEventListener('click', (e) => {
    e.preventDefault();
    isInventoryOpen = !isInventoryOpen;
    document.getElementById('inventory-ui').style.display = isInventoryOpen ? 'block' : 'none';
    updateUI();
});

function checkAABB(x, y, z) {
    const minX = x - 0.3, maxX = x + 0.3;
    const minY = y - player.height, maxY = y + 0.2;
    const minZ = z - 0.3, maxZ = z + 0.3;

    let minBx = Math.floor(minX + 0.5), maxBx = Math.floor(maxX + 0.5);
    let minBy = Math.floor(minY + 0.5), maxBy = Math.floor(maxY + 0.5);
    let minBz = Math.floor(minZ + 0.5), maxBz = Math.floor(maxZ + 0.5);

    for (let bx = minBx; bx <= maxBx; bx++) {
        for (let by = minBy; by <= maxBy; by++) {
            for (let bz = minBz; bz <= maxBz; bz++) {
                if (getBlock(bx, by, bz) !== BLOCK.AIR) return true;
            }
        }
    }
    return false;
}

function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.1);

    updateTicks();

    player.velocity.y += gravity * delta;

    let nextY = camera.position.y + player.velocity.y * delta;
    if (checkAABB(camera.position.x, nextY, camera.position.z)) {
        player.velocity.y = 0;
        player.onGround = true;
    } else {
        camera.position.y = nextY;
        player.onGround = false;
    }

    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.setFromQuaternion(camera.quaternion);
    let rot = euler.y;


    let moveFwd = moveDir.forward - moveDir.back;
    let moveRht = moveDir.right - moveDir.left;
    let moveZ = (Math.cos(rot) * -moveFwd - Math.sin(rot) * moveRht) * player.speed * delta;
    let moveX = (Math.sin(rot) * -moveFwd + Math.cos(rot) * moveRht) * player.speed * delta;


    if (!checkAABB(camera.position.x + moveX, camera.position.y, camera.position.z)) {
        camera.position.x += moveX;
    }
    if (!checkAABB(camera.position.x, camera.position.y, camera.position.z + moveZ)) {
        camera.position.z += moveZ;
    }

    const target = getTargetBlock();
    if (target) {
        highlightBox.position.set(target.x, target.y, target.z);
        highlightBox.visible = true;
    } else highlightBox.visible = false;

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

setTimeout(updateUI, 100);
animate();
