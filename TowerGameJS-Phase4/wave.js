
class Wave {

  constructor(game, waveJson) {
    this.game = game;
    this.waveJson = waveJson;
    this.enemyId = [0, 0];
    this.referenceTime = this.game.gameTime + this.waveJson.waveIncrement;
    this.spawnOver = false;
  }

  run() {
    while (this.game.gameTime > this.referenceTime && !this.spawnOver) {
      if (this.enemyId[0] < this.waveJson.packets.length) {
        if (this.enemyId[1] < this.waveJson.packets[this.enemyId[0]].num) {
          this.game.enemies.push(this.enemySelector(this.game, this.waveJson.packets[this.enemyId[0]].enemy))
          this.referenceTime += this.waveJson.packets[this.enemyId[0]].enemyIncrement
          this.enemyId[1] += 1
        } else {
          this.referenceTime += this.waveJson.packets[this.enemyId[0]].packetIncrement
          this.enemyId[1] = 0
          this.enemyId[0] += 1
        }
      } else {
        this.spawnOver = true
        break
      }
    }

  }

  isWaveOver() {
    if (!this.game.enemies[0] && this.spawnOver) {
      return true
    } else {
      return false
    }
  }
  //parses JSON
  enemySelector(game, enemyJSON) {
    // if we found a valid cell to start the enemy
    //create an array of the arguments for the enemy class
    var args = [null, game].concat(enemyJSON.additionalEnemyArguments)
    //apply the argument array to the specified enemy class
    var tempEnemy = enemyJSON.enemy.bind.apply(enemyJSON.enemy, args)
    return new tempEnemy

  }
}


function generateWaves() {
  let waves = []; //array of waves
  let baseNumEnemies = 10; // Base number of enemies for the first wave
  let enemyIncrementPerWave = 5; // How much the number of enemies increases per wave
  let baseEnemyIncrement = 1; // Base time between enemy spawns
  let basePacketIncrement = 1; // Base time between packets (a packet is a small group of enemies appearing at once within a wave
  //waves have multiple packets
  let waveIncrement = 20; //time between start of game and first wave (can be skipped w/ start button)

  for (let waveIndex = 1; waveIndex <= 14; waveIndex++) { //loops through waves
    let packets = []; //each wave has an array of packets, each of which will be filled w/ a few enemies
    let numEnemies = baseNumEnemies + (waveIndex - 1) * enemyIncrementPerWave;
    let enemyIncrement = baseEnemyIncrement / waveIndex; // Example of increasing difficulty
    let packetIncrement = basePacketIncrement * waveIndex; // Example of increasing difficulty
    if (waveIndex > 1) {
      waveIncrement = 6; //basically this just sets the time between waves to 6 once wave 1 is done (otherwise it would remain at 20)
    }

    // Assuming 3 types of enemies for simplicity, you can adjust as needed
    for (let enemyType = 1; enemyType <= 3; enemyType++) {
      packets.push({ //creates a packet for each enemytype
        "enemy": {
          "enemy": eval(`Enemy${enemyType}`), // Dynamically select the enemy class
          "additionalEnemyArguments": [1], // Example argument, adjust as needed—IGNORE THIS
          // Add "enemyPosition" if needed
        },
        "num": Math.round(numEnemies / 3), // Distribute the total number of enemies across the packets within the wave
        "enemyIncrement": enemyIncrement,
        "packetIncrement": packetIncrement
      });
    }

    waves.push({ //fills the wave with the packets
      "packets": packets,
      "name": `Wave ${waveIndex}`, //will fix later to add actual wave names
      "waveIncrement": waveIncrement //time between waves
    });
  }

  return waves; //returns the waves array that has now been filled with waves
}

AllWaves = generateWaves();


















//so yeah,theres stuff here
//AllWaves is an array of waves. each wave has a name and a wave increment. the wave increment is the amount of time before a wave begins.
//waves are seperated into packets. each packet specifies the enemy type, enemy increment, packet increment, and number of enemies.
//enemyIncrement is amount of time between two enemy spawns. if enemy increment is less than 1, multiple enemies will spawn at the same time.
//packetIncrement is the amount of time that must pass before the next packet can begin.
//num is the number of enemies that will be spawned before the packet is over
//enemy is a JSON object that specifes the exact type of enemy to be spawned and is parsed by the enemySelector function
//enemy contains enemy, enemyPosition, and additionalEnemyArguments.
//enemy within enemy specifies the enemy class to be called
//enemyPosition is a 2d array that spefies the area in whicch an enemt will be randomly spawned
//the numbers are formated as fractions of the total grid with the smaller number coming first
//additionalEnemyArguments specifies any additional arguments that might be added to an enemy class
// AllWaves = [
//   {
//     "packets": [
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy1,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 10,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy2,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 15,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy3,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 1,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       }
//     ],
//     "name": "Rookie Rampage (1)",
//     "waveIncrement": 20
//   },
//   {
//     "packets": [
//       {
//         "enemy": {
//           "enemy": Enemy1,
//           "enemyPosition": [
//             [
//               0, 1
//             ],
//             [
//               0, .5
//             ]
//           ],
//           "additionalEnemyArguments": [
//             1
//           ]
//         },
//         "num": 10,
//         "enemyIncrement": .25,
//         "packetIncrement": 2
//       },
//       {
//         "enemy": {
//           "enemy": Enemy3,
//           "enemyPosition": [
//             [
//               0, 1
//             ],
//             [
//               0, .5
//             ]
//           ],
//           "additionalEnemyArguments": [
//             0
//           ]
//         },
//         "num": 3,
//         "enemyIncrement": .75,
//         "packetIncrement": 1
//       }
//     ],
//     "name": "Novice Nemesis (2)",
//     "waveIncrement": 6
//   },
//   {
//     "packets": [
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy1,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 10,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy2,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 5,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy3,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 1,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       }
//     ],
//     "name": "Apprentice Assault (3)",
//     "waveIncrement": 6
//   },
//   {
//     "packets": [
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy1,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 10,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy2,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 5,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy3,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 1,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       }
//     ],
//     "name": "Skillful Skirmish (4)",
//     "waveIncrement": 6
//   },
//   {
//     "packets": [
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy1,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 10,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy2,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 5,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy3,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 1,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       }
//     ],
//     "name": "Adept Annihilation (5)",
//     "waveIncrement": 6
//   },
//   {
//     "packets": [
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy1,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 10,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy2,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 5,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy3,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 1,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       }
//     ],
//     "name": "Elite Eruption (6)",
//     "waveIncrement": 6
//   },
//   {
//     "packets": [
//       {
//         "enemy": {
//           "enemy": Enemy1,
//           "enemyPosition": [
//             [
//               0, 1
//             ],
//             [
//               0, .5
//             ]
//           ],
//           "additionalEnemyArguments": [
//             1
//           ]
//         },
//         "num": 1,
//         "enemyIncrement": .01,
//         "packetIncrement": .01
//       },
//       {
//         "enemy": {
//           "enemy": Enemy2,
//           "enemyPosition": [
//             [
//               0, 1
//             ],
//             [
//               0, .5
//             ]
//           ],
//           "additionalEnemyArguments": [
//             1
//           ]
//         },
//         "num": 1,
//         "enemyIncrement": .01,
//         "packetIncrement": .01
//       },
//       {
//         "enemy": {
//           "enemy": Enemy3,
//           "enemyPosition": [
//             [
//               0, 1
//             ],
//             [
//               0, .5
//             ]
//           ],
//           "additionalEnemyArguments": [
//             1
//           ]
//         },
//         "num": 1,
//         "enemyIncrement": .01,
//         "packetIncrement": .01
//       },
//       {
//         "enemy": {
//           "enemy": Enemy4,
//           "enemyPosition": [
//             [
//               0, 1
//             ],
//             [
//               0, .5
//             ]
//           ],
//           "additionalEnemyArguments": [
//             1
//           ]
//         },
//         "num": 1,
//         "enemyIncrement": .01,
//         "packetIncrement": .01
//       },
//       {
//         "enemy": {
//           "enemy": Enemy5,
//           "enemyPosition": [
//             [
//               0, 1
//             ],
//             [
//               0, .5
//             ]
//           ],
//           "additionalEnemyArguments": [
//             0
//           ]
//         },
//         "num": 1,
//         "enemyIncrement": .01,
//         "packetIncrement": .01
//       }
//     ],
//     "name": "Masterful Mayhem (7)",
//     "waveIncrement": 6
//   },
//   {
//     "packets": [
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy2,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 600,
//         "enemyIncrement": .03 * 5,
//         "packetIncrement": 3
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy1,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 100,
//         "enemyIncrement": .05,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy3,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 100,
//         "enemyIncrement": .1,
//         "packetIncrement": 1
//       }
//     ],
//     "name": "Prodigy Pandemonium (8)",
//     "waveIncrement": 6
//   },
//   {
//     "packets": [
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy4,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 120,
//         "enemyIncrement": .05,
//         "packetIncrement": 3
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy5,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 60,
//         "enemyIncrement": .025,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy1,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 70,
//         "enemyIncrement": .2,
//         "packetIncrement": 1
//       }
//     ],
//     "name": "Virtuoso Vortex (9)",
//     "waveIncrement": 0
//   },
//   {
//     "packets": [
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy1,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 6660,
//         "enemyIncrement": .006,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy2,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 660,
//         "enemyIncrement": .06,
//         "packetIncrement": 2
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy3,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 60,
//         "enemyIncrement": .6,
//         "packetIncrement": 3
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy2,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 660,
//         "enemyIncrement": .06,
//         "packetIncrement": 2
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy1,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 6660,
//         "enemyIncrement": .006,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy3,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 66660,
//         "enemyIncrement": .006,
//         "packetIncrement": 1
//       }
//     ],
//     "name": "Supreme Siege (10)",
//     "waveIncrement": 0
//   },
//   {
//     "packets": [
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy1,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 1,
//         "enemyIncrement": 10,
//         "packetIncrement": 10
//       }
//     ],
//     "name": "Legendary Laceration (11)",
//     "waveIncrement": 10
//   },
//   {
//     "packets": [
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy4,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 500,
//         "enemyIncrement": .07,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy3,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 500,
//         "enemyIncrement": .07,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy4,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 1000,
//         "enemyIncrement": .005,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy3,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 1000,
//         "enemyIncrement": .005,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy4,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 2000,
//         "enemyIncrement": .003,
//         "packetIncrement": 1
//       }
//     ],
//     "name": "Mythical Maelstrom (12)",
//     "waveIncrement": 7
//   },
//   {
//     "packets": [
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy5,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 100000,
//         "enemyIncrement": .001,
//         "packetIncrement": 0
//       }
//     ],
//     "name": "Cosmic Cataclysm (13)",
//     "waveIncrement": 2
//   },
//   {
//     "packets": [
//       {
//         "enemy": {//this specifies the information about the enemy
//           "enemy": Enemy5,
//           "additionalEnemyArguments": [//
//             1
//           ]
//         },
//         "num": 1000000,
//         "enemyIncrement": .0001,
//         "packetIncrement": 0
//       }
//     ],
//     "name": "Galactic Gambit (14)",
//     "waveIncrement": 2
//   },
//   {
//     "packets": [
//       {
//         "enemy": {
//           "enemy": Enemy5,
//           "enemyPosition": [
//             [
//               0, 1
//             ],
//             [
//               0, 1
//             ]
//           ],
//           "additionalEnemyArguments": [
//             1
//           ]
//         },
//         "num": Infinity,
//         "enemyIncrement": .000001,
//         "packetIncrement": 1
//       },
//       {
//         "enemy": {
//           "enemy": Enemy,
//           "enemyPosition": [
//             [
//               0, 1
//             ],
//             [
//               0, .5
//             ]
//           ],
//           "additionalEnemyArguments": [
//             0
//           ]
//         },
//         "num": 10,
//         "enemyIncrement": 1,
//         "packetIncrement": 1
//       }
//     ],
//     "name": "Eternal Celestial Showdown (∞)",
//     "waveIncrement": 30,
//     "info": "this wave should always be the last wave"
//   }
// ]
AllWaves = [
  {
    "packets": [
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy1,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 10,
        "enemyIncrement": 1,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy2,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 15,
        "enemyIncrement": 1,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy3,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 1,
        "enemyIncrement": 1,
        "packetIncrement": 1
      }
    ],
    "name": "Rookie Rampage (1)",
    "waveIncrement": 20
  },
  {
    "packets": [
      {
        "enemy": {
          "enemy": Enemy1,
          "enemyPosition": [
            [
              0, 1
            ],
            [
              0, .5
            ]
          ],
          "additionalEnemyArguments": [
            1
          ]
        },
        "num": 10,
        "enemyIncrement": .25,
        "packetIncrement": 2
      },
      {
        "enemy": {
          "enemy": Enemy3,
          "enemyPosition": [
            [
              0, 1
            ],
            [
              0, .5
            ]
          ],
          "additionalEnemyArguments": [
            0
          ]
        },
        "num": 3,
        "enemyIncrement": .75,
        "packetIncrement": 1
      }
    ],
    "name": "Novice Nemesis (2)",
    "waveIncrement": 6
  },
  {
    "packets": [
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy1,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 10,
        "enemyIncrement": 1,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy2,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 5,
        "enemyIncrement": 1,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy3,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 1,
        "enemyIncrement": 1,
        "packetIncrement": 1
      }
    ],
    "name": "Apprentice Assault (3)",
    "waveIncrement": 6
  },
  {
    "packets": [
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy1,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 10,
        "enemyIncrement": 1,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy2,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 5,
        "enemyIncrement": 1,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy3,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 1,
        "enemyIncrement": 1,
        "packetIncrement": 1
      }
    ],
    "name": "Skillful Skirmish (4)",
    "waveIncrement": 6
  },
  {
    "packets": [
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy1,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 10,
        "enemyIncrement": 1,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy2,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 5,
        "enemyIncrement": 1,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy3,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 1,
        "enemyIncrement": 1,
        "packetIncrement": 1
      }
    ],
    "name": "Adept Annihilation (5)",
    "waveIncrement": 6
  },
  {
    "packets": [
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy1,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 10,
        "enemyIncrement": 1,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy2,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 5,
        "enemyIncrement": 1,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy3,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 1,
        "enemyIncrement": 1,
        "packetIncrement": 1
      }
    ],
    "name": "Elite Eruption (6)",
    "waveIncrement": 6
  },
  {
    "packets": [
      {
        "enemy": {
          "enemy": Enemy1,
          "enemyPosition": [
            [
              0, 1
            ],
            [
              0, .5
            ]
          ],
          "additionalEnemyArguments": [
            1
          ]
        },
        "num": 1,
        "enemyIncrement": .01,
        "packetIncrement": .01
      },
      {
        "enemy": {
          "enemy": Enemy2,
          "enemyPosition": [
            [
              0, 1
            ],
            [
              0, .5
            ]
          ],
          "additionalEnemyArguments": [
            1
          ]
        },
        "num": 1,
        "enemyIncrement": .01,
        "packetIncrement": .01
      },
      {
        "enemy": {
          "enemy": Enemy3,
          "enemyPosition": [
            [
              0, 1
            ],
            [
              0, .5
            ]
          ],
          "additionalEnemyArguments": [
            1
          ]
        },
        "num": 1,
        "enemyIncrement": .01,
        "packetIncrement": .01
      },
      {
        "enemy": {
          "enemy": Enemy4,
          "enemyPosition": [
            [
              0, 1
            ],
            [
              0, .5
            ]
          ],
          "additionalEnemyArguments": [
            1
          ]
        },
        "num": 1,
        "enemyIncrement": .01,
        "packetIncrement": .01
      },
      {
        "enemy": {
          "enemy": Enemy5,
          "enemyPosition": [
            [
              0, 1
            ],
            [
              0, .5
            ]
          ],
          "additionalEnemyArguments": [
            0
          ]
        },
        "num": 1,
        "enemyIncrement": .01,
        "packetIncrement": .01
      }
    ],
    "name": "Masterful Mayhem (7)",
    "waveIncrement": 6
  },
  {
    "packets": [
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy2,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 600,
        "enemyIncrement": .03 * 5,
        "packetIncrement": 3
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy1,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 100,
        "enemyIncrement": .05,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy3,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 100,
        "enemyIncrement": .1,
        "packetIncrement": 1
      }
    ],
    "name": "Prodigy Pandemonium (8)",
    "waveIncrement": 6
  },
  {
    "packets": [
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy4,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 120,
        "enemyIncrement": .05,
        "packetIncrement": 3
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy5,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 60,
        "enemyIncrement": .025,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy1,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 70,
        "enemyIncrement": .2,
        "packetIncrement": 1
      }
    ],
    "name": "Virtuoso Vortex (9)",
    "waveIncrement": 0
  },
  {
    "packets": [
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy1,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 6660,
        "enemyIncrement": .006,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy2,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 660,
        "enemyIncrement": .06,
        "packetIncrement": 2
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy3,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 60,
        "enemyIncrement": .6,
        "packetIncrement": 3
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy2,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 660,
        "enemyIncrement": .06,
        "packetIncrement": 2
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy1,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 6660,
        "enemyIncrement": .006,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy3,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 66660,
        "enemyIncrement": .006,
        "packetIncrement": 1
      }
    ],
    "name": "Supreme Siege (10)",
    "waveIncrement": 0
  },
  {
    "packets": [
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy1,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 1,
        "enemyIncrement": 10,
        "packetIncrement": 10
      }
    ],
    "name": "Legendary Laceration (11)",
    "waveIncrement": 10
  },
  {
    "packets": [
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy4,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 500,
        "enemyIncrement": .07,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy3,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 500,
        "enemyIncrement": .07,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy4,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 1000,
        "enemyIncrement": .005,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy3,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 1000,
        "enemyIncrement": .005,
        "packetIncrement": 1
      },
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy4,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 2000,
        "enemyIncrement": .003,
        "packetIncrement": 1
      }
    ],
    "name": "Mythical Maelstrom (12)",
    "waveIncrement": 7
  },
  {
    "packets": [
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy5,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 100000,
        "enemyIncrement": .001,
        "packetIncrement": 0
      }
    ],
    "name": "Cosmic Cataclysm (13)",
    "waveIncrement": 2
  },
  {
    "packets": [
      {
        "enemy": {//this specifies the information about the enemy
          "enemy": Enemy5,
          "additionalEnemyArguments": [//
            1
          ]
        },
        "num": 1000000,
        "enemyIncrement": .0001,
        "packetIncrement": 0
      }
    ],
    "name": "Galactic Gambit (14)",
    "waveIncrement": 2
  },
  {
    "packets": [
      {
        "enemy": {
          "enemy": Enemy5,
          "enemyPosition": [
            [
              0, 1
            ],
            [
              0, 1
            ]
          ],
          "additionalEnemyArguments": [
            1
          ]
        },
        "num": Infinity,
        "enemyIncrement": .000001,
        "packetIncrement": 1
      },
      {
        "enemy": {
          "enemy": Enemy,
          "enemyPosition": [
            [
              0, 1
            ],
            [
              0, .5
            ]
          ],
          "additionalEnemyArguments": [
            0
          ]
        },
        "num": 10,
        "enemyIncrement": 1,
        "packetIncrement": 1
      }
    ],
    "name": "Eternal Celestial Showdown (∞)",
    "waveIncrement": 30,
    "info": "this wave should always be the last wave"
  }
]
