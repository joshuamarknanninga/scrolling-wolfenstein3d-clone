const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const tileSize = 64;
const fov = Math.PI / 4; // Field of view
const numRays = canvas.width;
const maxDepth = 600;

const player = {
    x: 300,
    y: 300,
    angle: 0,
    speed: 2,
    turnSpeed: 0.05
};

// Load textures for the sky, floor, and walls
const wallTexture = new Image();
wallTexture.src = "/assets/walltexture.jpg";

const floorTexture = new Image();
floorTexture.src = "/assets/thefloor.jpg";

const skyTexture = new Image();
skyTexture.src = "/assets/nightsky.jpg";

// 2D map layout
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];

// Function to check if all textures are loaded before starting the game
function checkTexturesLoaded() {
    if (wallTexture.complete && floorTexture.complete && skyTexture.complete) {
        gameLoop();
    }
}

// Ensure all textures are loaded before starting the game
wallTexture.onload = checkTexturesLoaded;
floorTexture.onload = checkTexturesLoaded;
skyTexture.onload = checkTexturesLoaded;

// Function to render the scene (sky, floor, walls)
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Render the sky
    for (let i = 0; i < canvas.width; i++) {
        const skyX = Math.floor((i / canvas.width) * skyTexture.width);
        context.drawImage(skyTexture, skyX, 0, 1, skyTexture.height, i, 0, 1, canvas.height / 2);
    }

    // Render the floor
    for (let i = 0; i < canvas.width; i++) {
        const floorX = Math.floor((i / canvas.width) * floorTexture.width);
        context.drawImage(floorTexture, floorX, 0, 1, floorTexture.height, i, canvas.height / 2, 1, canvas.height / 2);
    }

    // Render walls using raycasting
    for (let i = 0; i < numRays; i++) {
        const rayAngle = (player.angle - fov / 2) + (i / numRays) * fov;
        let distance = 0;
        let hitWall = false;

        while (!hitWall && distance < maxDepth) {
            distance += 1;
            const rayX = player.x + Math.cos(rayAngle) * distance;
            const rayY = player.y + Math.sin(rayAngle) * distance;

            const mapX = Math.floor(rayX / tileSize);
            const mapY = Math.floor(rayY / tileSize);

            if (map[mapY][mapX] > 0) {
                hitWall = true;
                const wallHeight = (tileSize / distance) * 300;

                // Calculate texture slice for the wall
                const textureX = Math.floor((rayX % tileSize) / tileSize * wallTexture.width);
                const wallSlice = context.createImageData(1, wallHeight);

                // Draw the wall texture slice
                const textureY = Math.floor((canvas.height / 2 - wallHeight / 2) / wallTexture.height);
                context.drawImage(
                    wallTexture,
                    textureX,
                    textureY,
                    1,
                    wallTexture.height,
                    i,
                    (canvas.height / 2) - wallHeight / 2,
                    1,
                    wallHeight
                );
            }
        }
    }
}

// Function to check for player collision with walls
function isColliding(newX, newY) {
    const mapX = Math.floor(newX / tileSize);
    const mapY = Math.floor(newY / tileSize);
    return map[mapY][mapX] > 0;
}

// Function to update player movement and rotation
function update() {
    let newX = player.x;
    let newY = player.y;

    if (keys['ArrowUp']) {
        newX += Math.cos(player.angle) * player.speed;
        newY += Math.sin(player.angle) * player.speed;
    }
    if (keys['ArrowDown']) {
        newX -= Math.cos(player.angle) * player.speed;
        newY -= Math.sin(player.angle) * player.speed;
    }
    if (!isColliding(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }
    if (keys['ArrowLeft']) {
        player.angle -= player.turnSpeed;
    }
    if (keys['ArrowRight']) {
        player.angle += player.turnSpeed;
    }
}

// Main game loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

const keys = {};
document.addEventListener('keydown', function(e) {
    keys[e.key] = true;
});
document.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});
