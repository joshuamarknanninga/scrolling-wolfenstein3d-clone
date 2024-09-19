const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Load the wall texture
const wallTexture = new Image();
wallTexture.src = "/assets/walltexture.jpg";

// Player details
const player = {
    x: 300,
    y: 300,
    angle: 0,
    speed: 2,
    turnSpeed: 0.05
};

const tileSize = 64;
const fov = Math.PI / 4; // Field of view
const numRays = canvas.width;
const maxDepth = 600;

// 2D map layout
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];

// Raycasting function
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

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

                // Draw the wall with texture mapping
                const textureX = Math.floor((rayX % tileSize) / tileSize * wallTexture.width);
                const wallSlice = context.createImageData(1, wallHeight);
                for (let y = 0; y < wallHeight; y++) {
                    const textureY = Math.floor((y / wallHeight) * wallTexture.height);
                    const colorIndex = (textureY * wallTexture.width + textureX) * 4;
                    wallSlice.data[y * 4 + 0] = wallTexture.data[colorIndex];
                    wallSlice.data[y * 4 + 1] = wallTexture.data[colorIndex + 1];
                    wallSlice.data[y * 4 + 2] = wallTexture.data[colorIndex + 2];
                    wallSlice.data[y * 4 + 3] = 255;
                }
                context.putImageData(wallSlice, i, (canvas.height / 2) - wallHeight / 2);
            }
        }
    }
}

function isColliding(newX, newY) {
    const mapX = Math.floor(newX / tileSize);
    const mapY = Math.floor(newY / tileSize);
    return map[mapY][mapX] > 0;
}

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

wallTexture.onload = function() {
    gameLoop();
};
