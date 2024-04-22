
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
    let unSpawnedEnemies = towerGame.waves[this.waveNumber];
    if(!this.spawnOver){
      while(unSpawnedEnemies.length > 0){
        let count = 0;
        for(let i = 0; i < unSpawnedEnemies.length; i ++){
          if(unSpawnedEnemies[i] == 0){
            count++;
          }
        }
        if(!count == 10){
        let randomEnemyType = Math.floor(Math.random*10)+1;
      
        if(unSpawnedEnemies[randomEnemyType] > 0){
          setTimeout(() => {
            towerGame.enemies.push(new Enemy(towerGame, unSpawnedEnemies));
          }, 1200*numberEnemy+600);
          numberEnemy++;
          unSpawnedEnemies[randomEnemyType]--;
        }
      }else{
        this.spawnOver = true;
      }
      }
      this.spawnOver = true;
    }
  }
}