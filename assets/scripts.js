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

// Load wall texture (ensure it's loaded before using it)
const wallTexture = new Image();
wallTexture.src = "/assets/walltexture.jpg";

// 2D map layout
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];

// Check if wallTexture is loaded
wallTexture.onload = function() {
    gameLoop();
};

// Function to render the scene (sky, floor, walls)
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Render the sky (top half of the canvas)
    context.fillStyle = '#87CEEB'; // Light blue for sky
    context.fillRect(0, 0, canvas.width, canvas.height / 2);

    // Render the floor (bottom half of the canvas)
    context.fillStyle = '#555555'; // Dark gray for floor
    context.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

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

                // Shading for walls based on distance
                const shade = Math.max(0, 255 - distance * 0.1);
                context.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;

                context.fillRect(i, (canvas.height / 2) - wallHeight / 2, 1, wallHeight);
            }
        }
    }
}

// Function to check if player collides with a wall
function isColliding(newX, newY) {
    const mapX = Math.floor(newX / tileSize);
    const mapY = Math.floor(newY / tileSize);
    return map[mapY][mapX] > 0;
}

// Update player movement and rotation
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

// Game loop to update and render continuously
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
