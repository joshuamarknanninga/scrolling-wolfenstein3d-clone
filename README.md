# Maze 3D Game

This project is a 3D maze game built using **Three.js**. The game features a randomly generated maze, a skybox, and smooth movement controls (including diagonal movement). The maze is fully enclosed, ensuring no way out.

## Features

- **3D Maze Generation**: A random maze is generated using recursive backtracking, ensuring there are no exits.
- **Cube-based Skybox**: The game includes a realistic skybox using six images to cover the environment.
- **Infinite Floor**: A repeated floor texture gives the appearance of an infinite floor.
- **Diagonal Movement**: Players can move forward, backward, strafe, and rotate the camera smoothly. Diagonal movement is supported.
- **No Exits**: The maze is completely enclosed, making it impossible to escape.

## How to Run

1. Clone or download this repository.
2. Place the required texture files in the `/assets/` directory (see the list below).
3. Open the `index.html` file in your browser to play the game.

### Required Texture Files

Make sure you have the following textures in the `/assets/` folder:

- `walltexture.jpg`: Texture used for maze walls.
- `thefloor.jpg`: Texture used for the floor.
- `sky_ft.jpg`: Front face of the skybox.
- `sky_bk.jpg`: Back face of the skybox.
- `sky_up.jpg`: Top face of the skybox.
- `sky_dn.jpg`: Bottom face of the skybox.
- `sky_rt.jpg`: Right face of the skybox.
- `sky_lf.jpg`: Left face of the skybox.

> You can find free skybox textures online or use placeholders for testing.

## Movement Controls

| Key              | Action                            |
|------------------|-----------------------------------|
| `Arrow Up`       | Move forward                      |
| `Arrow Down`     | Move backward                     |
| `Arrow Left`     | Strafe left                       |
| `Arrow Right`    | Strafe right                      |
| `a`              | Turn left                         |
| `d`              | Turn right                        |
| `Arrow Up + Right`| Move diagonally forward-right      |
| `Arrow Down + Left`| Move diagonally backward-left    |

## Maze Generation

The maze is generated using the **Recursive Backtracking** algorithm. This ensures a fully enclosed maze with no way out. Each new session will generate a different random maze.

### Maze Dimensions

The current maze is generated with dimensions of **21x21**.  
You can adjust the maze size by modifying the `generateMaze` function in the `scripts.js` file.

```javascript
const maze = generateMaze(21, 21); // Adjust width and height as needed
Technologies Used
Three.js: A popular JavaScript 3D library, used to render the 3D environment.
HTML5: Used for structuring the game.
JavaScript: For logic, maze generation, and movement controls.
Known Issues / Future Enhancements
Enhanced Maze Generation: The current maze algorithm could be optimized for more complex mazes.
Collision Detection: While collision with walls is functional, adding an additional layer of physics or enhanced movement could make the game more realistic.
Objective: Add goals to the maze, like finding a key or a timed challenge.
Installation and Usage
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/maze-3d-game.git
Install dependencies (if any):

bash
Copy code
npm install
Run the game by opening the index.html file in a web browser or using a local server (e.g., Live Server in VSCode):

bash
Copy code
live-server
License
This project is open source and available under the MIT License.

Notes for VSCode
If you are using VSCode, I recommend using the Live Server extension to run the game. You can install it from the VSCode marketplace and then right-click the index.html file and choose "Open with Live Server".

Example VSCode Live Server Workflow:
Install the Live Server extension.
Open the project in VSCode.
Right-click the index.html file.
Select Open with Live Server.
The game will open in your default browser.
