const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const tileSize = 64;
const numRays = canvas.width;
const fov = Math.PI / 3;
const halfFov = fov / 2;
const maxDepth = 20;
const angleStep = fov / numRays;

let player = {
    x: 2 * tileSize,
    y: 2 * tileSize,
    angle: 0,
    speed: 2,
    turnSpeed: Math.PI / 60
};

function castRay(angle) {
    let rayX = player.x;
    let rayY = player.y;

    while (true) {
        rayX += Math.cos(angle);
        rayY += Math.sin(angle);

        const mapX = Math.floor(rayX / tileSize);
        const mapY = Math.floor(rayY / tileSize);

        if (map[mapY][mapX] === 1) {
            const distance = Math.sqrt((rayX - player.x) ** 2 + (rayY - player.y) ** 2);
            return { rayX, rayY, distance };
        }
    }
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numRays; i++) {
        const rayAngle = player.angle - halfFov + i * angleStep;
        const ray = castRay(rayAngle);

        const distance = ray.distance * Math.cos(rayAngle - player.angle);
        const wallHeight = (tileSize * canvas.height) / distance;

        // Draw ceiling
        for (let y = 0; y < (canvas.height / 2) - (wallHeight / 2); y++) {
            const shade = 255 - Math.min(255, (distance / maxDepth) * 255);
            context.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
            context.fillRect(i, y, 1, 1);
        }

        // Draw wall
        const color = 255 - Math.min(255, distance * 255 / maxDepth);
        context.fillStyle = `rgb(${color}, ${color}, ${color})`;
        context.fillRect(i, (canvas.height / 2) - (wallHeight / 2), 1, wallHeight);

        // Draw floor
        for (let y = (canvas.height / 2) + (wallHeight / 2); y < canvas.height; y++) {
            const shade = 255 - Math.min(255, (distance / maxDepth) * 255);
            context.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
            context.fillRect(i, y, 1, 1);
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

gameLoop();
