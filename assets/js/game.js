//Game states
//"WIN" - Player robot has defeated all enemy robots
// *Fight all enemy robots
// *Defeat each enemy robot
//"LOSE" - Player robot's health is zero or less

var fightOrSkip = function() {
    // ask user if they'd like to fight or skip using  function
    var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLocaleLowerCase();
    // if user picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm user wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerInfo.money = playerInfo.money - 10;
        return true;
      }
    }
    return false;
};

var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;
    // randomly change turn order
    if (Math.random() > 0.5) {
      isPlayerTurn = false;
    }
    while (playerInfo.health > 0 && enemy.health > 0) {
      if (isPlayerTurn) {
        // ask user if they'd like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
          // if true, leave fight by breaking loop
          break;
        }
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        // remove enemy's health by subtracting the amount we set in the damage variable
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
          playerInfo.name +
            " attacked " +
            enemy.name +
            ". " +
            enemy.name +
            " now has " +
            enemy.health +
            " health remaining."
        );
        // check enemy's health
        if (enemy.health <= 0) {
          window.alert(enemy.name + " has died!");

          // award player money for winning
          playerInfo.money = playerInfo.money + 20;

          // leave while() loop since enemy is dead
          break;
        } 
        else {
          window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        // player gets attacked first
      } 
      else {
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        // remove enemy's health by subtracting the amount we set in the damage variable
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
          enemy.name +
            " attacked " +
            playerInfo.name +
            ". " +
            playerInfo.name +
            " now has " +
            playerInfo.health +
            " health remaining."
        );

        // check player's health
        if (playerInfo.health <= 0) {
          window.alert(playerInfo.name + " has died!");
          // leave while() loop if player is dead
          break;
        } 
        else {
          window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
        
      }
      // switch turn order for next round
      isPlayerTurn = !isPlayerTurn;
    }
    
};


var startGame = function() {

    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++){
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1));

    
            var pickedEnemyObj = enemyInfo[i];

            pickedEnemyObj.health = randomNumber(40, 60); 

            fight(pickedEnemyObj);

            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {

                var storeConfirm = window.confirm("the fight is over, visit the shop before the next round?");
                
                if (storeConfirm) {
                    shop();
                }
            }
    }

        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
    
        }
    }
    endGame();
};

var endGame = function () {
    window.alert("the game has now ended. Let's see how you did!");

    var highScore = localStorage.getItem("highScore");
    if(highScore === null) {
        highScore = 0;
    }

    if (playerInfo.money > highScore) {
        localStorage.setItem("highScore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the highscore of " + playerInfo.money + " !");

    }

    else {
        alert(playerInfo.name + " has not beaten the highscore of " + highScore + ". Maybe next time!");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function (){
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );

        shopOptionPrompt = parseInt(shopOptionPrompt)

    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");
            break;

        default:
            window.alert("you did not pick a vaild option. Try again.");

            shop();
            break;
    }
};

var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1 ) + min);

    return value;
}

var getPlayerName = function() {
    var name = "";

    while(name === "" || name === null) {
        name = prompt("what is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            this.attack +=6;
            this.money -=7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

console.log(playerInfo);

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Rodo Trumble",
        attack: randomNumber(10, 14)
    }
]

console.log(enemyInfo);


startGame();