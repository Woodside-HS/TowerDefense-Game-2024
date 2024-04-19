
class Wave {

  constructor(game, waveNumber) {
    this.game = game;
    this.waveNumber = waveNumber;
    this.spawnOver = false;
    this.j = this.spawnEnemies();
  }

  run() {
    
  }
  spawnEnemies(){
    let numberEnemy = 1;
    if(!this.spawnOver){
      for (let i = 0; i < 10; i++) {

        for (let j = 0; j < towerGame.waves[this.waveNumber][i]; j++) {
          setTimeout(() => {
            towerGame.enemies.push(new Enemy(towerGame, i));
          }, 600*numberEnemy+600);
          numberEnemy++;
        }
      }
      this.spawnOver = true;
    }
  }
}