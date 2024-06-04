
class Wave {

  constructor(game, waveNumber) { //each wave is an object
    this.game = game; //passing in the game for reference
    this.waveNumber = waveNumber; //each new wave, a new wave object is created; this variable tells us which one we are on
    this.spawnOver = false;
    this.j = this.spawnEnemies();

  }

  run() {

  }
  spawnEnemies() {
    let spawnedEnemies = 0; //initial number of enemies
    let numberEnemy = 1;
    let unSpawnedEnemies = towerGame.waves[this.waveNumber];
    if (this.waveNumber <= 20) {
      if (towerGame.numWave >= towerGame.waves.length) {
        towerGame.gameState = new GameState3(towerGame, "win");
      } else {

        if (!this.spawnOver) { //spawns enemies
          while (unSpawnedEnemies.length > 0) {
            let count = 0;
            for (let i = 0; i < unSpawnedEnemies.length; i++) {
              if (unSpawnedEnemies[i] == 0) {
                count++;
              }
            }
            if (count < 10) {
              let randomEnemyType = Math.floor(Math.random() * 10);

              if (unSpawnedEnemies[randomEnemyType] > 0) {
                setTimeout(() => {
                  towerGame.enemies.push(new Enemy(towerGame, randomEnemyType));
                  spawnedEnemies++;
                }, (1200 - this.waveNumber * 20) * numberEnemy);
                numberEnemy++;
                unSpawnedEnemies[randomEnemyType]--;
              }
            } else {
              setTimeout(() => {
                this.spawnOver = true;
              }, 2400);
              break;
            }
          }
        }
      }

    }
  }
}
