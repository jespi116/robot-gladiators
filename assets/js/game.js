//Game states
//"WIN" - Player robot has defeated all enemy robots
// *Fight all enemy robots
// *Defeat each enemy robot
//"LOSE" - Player robot's health is zero or less

var fight = function(enemy) {
    
    while(enemy.health > 0 && playerInfo.health > 0){

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    console.log(promptFight);

    if (promptFight === "skip" || promptFight === "SKIP") {
         
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
     
        if (confirmSkip) {
            
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
       
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money", playerInfo.money);
            break;

        }
    
    }

    if (promptFight === "fight" || promptFight === "FIGHT") {
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);

        console.log(
        playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            playerInfo.money = playerInfo.money + 20;
            break;
        }

        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);

        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
                } 

            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }

        }
    else {
        window.alert("you did not pick a vaild option. Try again.");
    }
    }
}
//fight();
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + " .");
    }
    else {
        window.alert("you've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function (){
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter one: 'REFILL', 'UPGRADE', OR 'LEAVE' to make a choice."
    );

    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;

        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");

            break;

        default:
            window.alert("you did not pick a vaild option. Try again.");

            shop();
            break;
    }
}

var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1 ) + min);

    return value;
}

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
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