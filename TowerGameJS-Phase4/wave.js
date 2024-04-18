
class Wave {

  constructor(game, waveNumber) {
    this.game = game;
    this.wave = waveNumber;
    this.spawnOver = false;
  }

  run() {


    while (this.game.gameTime > this.referenceTime && !this.spawnOver) {


      this.spawnOver = true;
      break;

    }

  }


  isWaveOver() {
    if (!this.game.enemies[0] && this.spawnOver) {
      waveIncrement = 6;
      return true
    } else {
      return false
    }
  }




  generateWaves() {
    let waves = []; //array of waves
    let waveIncrement = 20; //time between start of game and first wave (can be skipped w/ start button)
    let enemyNumArray = [ //array that tells you the number of each type of enemy for each wave
      [0, 0, 0, 0, 0, 2, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 2, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],

    ];

    for (let i = 0; i < enemyNumArray.length; i++) {
      for (let j = 0; j < enemyNumArray[i].length; j++) {
        for (let k = 0; k < enemyNumArray[i][j]; k++) {
          this.waves[i][j].push
        }
      }
    }
    // for (let enemyType = 0; enemyType < numEnemiesArray.length; enemyType++) {
    //   let numEnemies = numEnemiesArray[enemyType];
    //   let enemyIncrement = baseEnemyIncrement / (waveIndex + 1);
    //   let packetIncrement = basePacketIncrement * (waveIndex + 1);
    //   if (numEnemies > 0) {
    //     packets.push({ //creates a packet for each enemytype
    //       "enemy": {
    //         "enemy": eval(`Enemy${enemyType + 1}`), // Dynamically select the enemy class
    //         "additionalEnemyArguments": [1]
    //       },
    //       "num": numEnemies,
    //       "enemyIncrement": enemyIncrement,
    //       "packetIncrement": packetIncrement,
    //     });
    //   }
    // }

    // waves.push({//fills the wave with the packets
    //   "packets": packets,
    //   "name": `Wave ${waveIndex}`,
    //   "waveIncrement": waveIndex > 1 ? 6 : waveIncrement //basically this just sets the time between waves to 6 once wave 1 is done (otherwise it would remain at 20)
    // });

  }
}