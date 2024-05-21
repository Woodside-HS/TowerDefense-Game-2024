
class Wave {

  constructor(game, waveNumber) {
    this.game = game;
    this.waveNumber = waveNumber;
    this.spawnOver = false;
    this.j = this.spawnEnemies();

  }

  run() {

  }
  spawnEnemies() {
    let spawnedEnemies = 0;
    let numberEnemy = 1;
    let unSpawnedEnemies = towerGame.waves[this.waveNumber];

    for(let i = 0; i < towerGame.waves[this.waveNumber].length; i ++){
       if(towerGame.numWave < towerGame.waves.length){

       } else {
         towerGame.gameState = new GameState3(towerGame, "win");
       }
   }

    if (!this.spawnOver) {
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
            }, (800-this.waveNumber*20) * numberEnemy + 600);
            numberEnemy++;
            unSpawnedEnemies[randomEnemyType]--;
          }
        } else {
          setTimeout(() => {
          this.spawnOver = true;
        }, 1200);
          break;
        }
      }
    }
  }
}
