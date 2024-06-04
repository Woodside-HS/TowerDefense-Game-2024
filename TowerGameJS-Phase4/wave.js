class Wave {

  constructor(game, waveNumber) {
    this.game = game; // Reference to the main game object
    this.waveNumber = waveNumber; // Identifies the current wave number
    this.spawnOver = false; // Flag to check if spawning is complete
    this.j = this.spawnEnemies(); // Initiates the spawning of enemies
  }

  run() {
    // Method to update wave state, to be implemented
  }

  spawnEnemies() {
    let spawnedEnemies = 0; // Counter for the number of enemies spawned
    let numberEnemy = 1; // Helper variable to manage spawn timing
    let unSpawnedEnemies = towerGame.waves[this.waveNumber]; // Array of enemies yet to be spawned for this wave

    if (this.waveNumber <= 20) { // Limit waves to 20
      if (towerGame.numWave >= towerGame.waves.length) {
        towerGame.gameState = new GameState3(towerGame, "win"); // Change game state to win if all waves are completed
      } else {
        if (!this.spawnOver) { // Check if spawning is not yet over
          while (unSpawnedEnemies.length > 0) { // Continue spawning while there are enemies left
            let count = 0;
            for (let i = 0; i < unSpawnedEnemies.length; i++) {
              if (unSpawnedEnemies[i] == 0) {
                count++; // Count how many enemy types are fully spawned
              }
            }
            if (count < 10) { // If less than 10 types of enemies are fully spawned
              let randomEnemyType = Math.floor(Math.random() * 10); // Select a random enemy type to spawn

              if (unSpawnedEnemies[randomEnemyType] > 0) { // Check if there are still enemies of this type left to spawn
                setTimeout(() => {
                  towerGame.enemies.push(new Enemy(towerGame, randomEnemyType)); // Spawn the enemy
                  spawnedEnemies++; // Increment the spawn counter
                }, (1200 - this.waveNumber * 20) * numberEnemy); // Delay spawning based on wave number and enemy count
                numberEnemy++; // Increment helper variable for spawn timing
                unSpawnedEnemies[randomEnemyType]--; // Decrement the count of this enemy type left to spawn
              }
            } else {
              setTimeout(() => {
                this.spawnOver = true; // Set spawn over flag after a delay
              }, 2400);
              break; // Exit the loop if 10 types of enemies are fully spawned
            }
          }
        }
      }
    }
  }
}