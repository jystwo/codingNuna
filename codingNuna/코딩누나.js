//랜덤번호 지정
//유저가 번호를 입력 그리고 go 버튼 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다.
//랜덤번호 < 유저번호 --- DOwn!
//랜덤번호 < 유저번호 --- Up!
//리셋버튼 누르면 리셋
//5번의ㅣ 기회를 쓰면 게임끝
//범위 밖 또는 이미 입력한 숫자 누르면 알려주고 기회를 깍지 않는다


let comNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){userInput.value=""});

function pickRandomNum(){
  comNum = Math.floor(Math.random() * 100)+1;
  console.log("정답", comNum);
}

function play() {
  let userValue = userInput.value;

  if(userValue<1 || userValue>100){
    resultArea.textContent="1과 100 사이 숫자 입력해주세요";
    return;
  }

  if(history.includes(userValue)){
    resultArea.textContent="이미 입력한 숫자. 다른 숫자 입력하세요"
    return;
  }
chances --;
chanceArea.textContent= `남은기회:${chances}번`;
console.log("chance", chances);

  if (userValue < comNum) {
    resultArea.textContent = "Up!!";
  } else if (userValue > comNum) {
    resultArea.textContent = "Down!!";
  } else {
    resultArea.textContent = "맞췄습니다!!";
    gameOver = true;
  }

  history.push(userValue);

  if(chances < 1){
    gameOver = true;
  }
  if(gameOver == true){
    playButton.disabled = true;
  }
}

function reset(){
  userInput.value ="";
  pickRandomNum();
  resultArea.textContent = "결과가 나온다"
  gameOver = false;
  playButton.disabled = false;
  chances = 5;
  chanceArea.textContent= `남은기회:${chances}번`;
  history = [];

}

pickRandomNum();