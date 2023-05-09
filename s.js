let inputDir = {x: 0, y: 0};
const moveSound =  new Audio('snake move.mp3');
const musicSound = new Audio('music.mp3');
const gameOver = new Audio('game end.mp3');
const eatSound = new Audio('eat.mp3');
const gameSound = new Audio('game end.mp3');
let speed = 5;
let lastPaintTime = 0;
let snakeArr  = [
    {x: 13 , y: 15}
];
food = {x: 8, y: 8};
let score = 0;
function main(ctime){
window.requestAnimationFrame(main);
//console.log(ctime)
if ((ctime - lastPaintTime)/1000 < 1/speed){
    return;
}
lastPaintTime = ctime;
gameEngine();


}
function isCollide(snake) {
    // if snake is collide on itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if u bump into the wall
        if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
            return true;
        }
    
}
function gameEngine(){
// part1: updating the sanke array and food
if (isCollide(snakeArr)) {
    musicSound.pause();
    gameOver.play();
    inputDir ={x: 0, y: 0};
    alert("Game Over , Enter Any ket to Play Again!");
    snakeArr =[{x: 13, y: 15}];
    musicSound.play();
    score = 0;
}
  // if u eaten the food increase the score and regenerate the food
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    eatSound.play();
    score += 1;
    scoreBox.innerHTML ="score: "+ score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b =  16;
    food = {x: Math.round(a+(b-a)* Math.random()),y: Math.round(a+(b-a)* Math.random())}
 
}
// moving the snake
for (let i = snakeArr.length-2; i>= 0; i--) {
    snakeArr[i+1] = {...snakeArr[i]};
}
snakeArr[0].x  += inputDir.x;
snakeArr[0].y  +=inputDir.y;



// display the snake and food 
    board.innerHTML= "";
    snakeArr.forEach((e , index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index==0) {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
        
    });
    
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
        
}

         
// main logic start here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
inputDir =  {x: 0, y: 1} // start the game
moveSound.play(); // for sount blank
musicSound.play();
  switch (e.key) {
     case "ArrowUp":
     console.log("ArrowUp")
             inputDir.x = 0;
                inputDir.y = -1;
                break;
                case "ArrowLeft":
                    console.log("ArrowLeft");
                    inputDir.x = -1;
                    inputDir.y  =  0;
                    break;
                    case "ArrowRight":
                   console.log("ArrowRight");
            inputDir.x = 1 ;
            inputDir.y = 0 ;
            break;
         case "ArrowDown":
                console.log("ArrowDown");
                        inputDir.x = 0 ;
                        inputDir.y = 1;
                        break;
      default:
          break;
          
  }                       
});