


import ancientsData from "../js/data/ancients";
import {brownCards, blueCards, greenCards } from "../js/data/mythicCards/index";

let ancient;
let difficulty;
let greenCardsCount;
let brownCardsCount;
let blueCardsCount;
let greenDeck = [];
let brownDeck = [];
let blueDeck = [];
let firstStageGreenCount;
let firstStageBrownCount;
let firstStageBlueCount;
let secondStageGreenCount;
let secondStageBrownCount;
let secondStageBlueCount;
let thirdStageGreenCount;
let thirdStageBrownCount;
let thirdStageBlueCount;
let firstStageDeck = [];
let secondStageDeck = [];
let thirdStageDeck = [];


const step2 = document.querySelector('.step-2');
const step3 = document.querySelector('.step-3');
const step4 = document.querySelector('.step-4');
const stage1 = document.querySelector('.stage-1');
const stage2 = document.querySelector('.stage-2');
const stage3 = document.querySelector('.stage-3');
const shuffleBtn = document.querySelector('.shuffle-btn');
const deckCard = document.querySelector('.deck-back');
const resultCard = document.querySelector('.deck-result');

document.addEventListener('click', function(e){
    if(e.target.classList.contains('ancient-item')){
        if(document.querySelector('.ancient-item.active')){
            document.querySelector('.ancient-item.active').classList.remove('active')
        }
        e.target.classList.add('active')
        ancient = e.target.dataset.item;
        if(document.querySelector('.difficulty-item.active')){
            difficulty = '';
            document.querySelector('.difficulty-item.active').classList.remove('active')
        }
        if(step2.classList.contains('hidden')){
            step2.classList.remove('hidden')
        }
        if(!step3.classList.contains('hidden')){
            step3.classList.add('hidden')
        }
        if(!step4.classList.contains('hidden')){
            step4.classList.add('hidden')
        }
        if(shuffleBtn.classList.contains('hidden')){
            shuffleBtn.classList.remove('hidden')
        }
        
    }
    if(e.target.classList.contains('difficulty-item')){
        if(document.querySelector('.difficulty-item.active')){
            document.querySelector('.difficulty-item.active').classList.remove('active')
        }
        e.target.classList.add('active')
        difficulty = e.target.dataset.item;
        if(step3.classList.contains('hidden')){
            step3.classList.remove('hidden')
        }

        if(!step4.classList.contains('hidden')){
            step4.classList.add('hidden')
        }
        if(shuffleBtn.classList.contains('hidden')){
            shuffleBtn.classList.remove('hidden')
        }
        deckCard.style.backgroundImage = `url('${deckCard.dataset.bg}')`;
        resultCard.removeAttribute("style");
        setStages()
        
    }
    if(e.target === shuffleBtn){
        shuffleBtn.classList.add('hidden')
        if(step4.classList.contains('hidden')){
            step4.classList.remove('hidden')
        }
        createFilteresDecks();
        createStageDeck(firstStageGreenCount, firstStageBrownCount, firstStageBlueCount, firstStageDeck)
        createStageDeck(secondStageGreenCount, secondStageBrownCount, secondStageBlueCount, secondStageDeck)
        createStageDeck(thirdStageGreenCount, thirdStageBrownCount, thirdStageBlueCount, thirdStageDeck)
        
    }
    if(e.target.classList.contains('deck-back')){
        
        if(firstStageDeck.length > 0){
            showCard(firstStageDeck, stage1)
        } else if(secondStageDeck.length > 0){
            showCard(secondStageDeck, stage2)
        } else if(thirdStageDeck.length > 0){
            showCard(thirdStageDeck, stage3)
            if(thirdStageDeck.length === 0){
                e.target.removeAttribute("style");
            }
        } 
       
    }
})

function setStages(){
    const data = ancientsData.find(getAncientData)
    stage1.querySelector('.green').textContent = data.firstStage.greenCards;
    stage1.querySelector('.brown').textContent = data.firstStage.brownCards;
    stage1.querySelector('.blue').textContent = data.firstStage.blueCards;
    stage2.querySelector('.green').textContent = data.secondStage.greenCards;
    stage2.querySelector('.brown').textContent = data.secondStage.brownCards;
    stage2.querySelector('.blue').textContent = data.secondStage.blueCards;
    stage3.querySelector('.green').textContent = data.thirdStage.greenCards;
    stage3.querySelector('.brown').textContent = data.thirdStage.brownCards;
    stage3.querySelector('.blue').textContent = data.thirdStage.blueCards;
    firstStageGreenCount = data.firstStage.greenCards;
    firstStageBrownCount = data.firstStage.brownCards;
    firstStageBlueCount = data.firstStage.blueCards;
    secondStageGreenCount = data.secondStage.greenCards;
    secondStageBrownCount = data.secondStage.brownCards;
    secondStageBlueCount = data.secondStage.blueCards;
    thirdStageGreenCount = data.thirdStage.greenCards;
    thirdStageBrownCount = data.thirdStage.brownCards;
    thirdStageBlueCount = data.thirdStage.blueCards;

    greenCardsCount = data.firstStage.greenCards + data.secondStage.greenCards +  data.thirdStage.greenCards;
    brownCardsCount = data.firstStage.brownCards + data.secondStage.brownCards +  data.thirdStage.brownCards;
    blueCardsCount = data.firstStage.blueCards + data.secondStage.blueCards +  data.thirdStage.blueCards;

}
function getAncientData(item){
    return item.id === ancient;
}

function createFilteresDecks(){
    if(difficulty === 'veryeasy'){
        //get easy and normal
        createColorDeck(greenCardsCount, greenCards, greenDeck, 'get', ['easy', 'normal'])
        createColorDeck(brownCardsCount, brownCards, brownDeck, 'get', ['easy', 'normal'])
        createColorDeck(blueCardsCount, blueCards, blueDeck, 'get', ['easy', 'normal'])
    }
    if(difficulty === 'easy'){
        //remove hard
        createColorDeck(greenCardsCount, greenCards, greenDeck, 'remove', ['hard'])
        createColorDeck(brownCardsCount, brownCards, brownDeck, 'remove', ['hard'])
        createColorDeck(blueCardsCount, blueCards, blueDeck, 'remove', ['hard'])
    }
    if(difficulty === 'normal'){
        createColorDeck(greenCardsCount, greenCards, greenDeck)
        createColorDeck(brownCardsCount, brownCards, brownDeck)
        createColorDeck(blueCardsCount, blueCards, blueDeck)
    }
    if(difficulty === 'hard'){
        //remove easy
        createColorDeck(greenCardsCount, greenCards, greenDeck, 'remove', ['easy'])
        createColorDeck(brownCardsCount, brownCards, brownDeck, 'remove', ['easy'])
        createColorDeck(blueCardsCount, blueCards, blueDeck, 'remove', ['easy'])
    }
    if(difficulty === 'veryhard'){
        //hard and normal
        createColorDeck(greenCardsCount, greenCards, greenDeck, 'get', ['hard', 'normal'])
        createColorDeck(brownCardsCount, brownCards, brownDeck, 'get', ['hard', 'normal'])
        createColorDeck(blueCardsCount, blueCards, blueDeck, 'get', ['hard', 'normal'])
    }
    
}
function createColorDeck(count, cardsArray, resultDeck, action, types){
    if(count>0){
        let colorArray = [...cardsArray];
        if(action && action === 'remove'){
            for(let t = 0; t < types.length; t++){
                
                colorArray = colorArray.filter(function( obj ) {
                    return obj.difficulty !== types[t];
                });
            }
            for(let i = count; i > 0; i--){
                count--;
                let randomItem = Math.floor(Math.random()*colorArray.length);
                resultDeck.push(colorArray[randomItem].cardFace)
                colorArray.splice(randomItem, 1)
            }
        } else if(action && action === 'get'){
            let firstArray = []
            let secondArray = []
            for(let t = 0; t < types.length; t++){
                let newArray = colorArray.filter(function( obj ) {
                    return obj.difficulty === types[t];
                });
                if(t === 0){
                    Array.prototype.push.apply(firstArray, newArray);
                }
                if(t === 1){
                    Array.prototype.push.apply(secondArray, newArray);
                }
               
            }
            for(let i = count; i > 0; i--){
                count--;
                if(firstArray.length>0){
                    let randomItem = Math.floor(Math.random()*firstArray.length);
                    resultDeck.push(firstArray[randomItem].cardFace)
                    firstArray.splice(randomItem, 1)
                } else {
                    let randomItem = Math.floor(Math.random()*secondArray.length);
                    resultDeck.push(secondArray[randomItem].cardFace)
                    secondArray.splice(randomItem, 1)
                }
            }
        } else {
            for(let i = count; i > 0; i--){
                count--;
                let randomItem = Math.floor(Math.random()*colorArray.length);
                resultDeck.push(colorArray[randomItem].cardFace)
                colorArray.splice(randomItem, 1)
            }
        }
        
    }
}
function createStageDeck(greenCount, brownCount, blueCount, stageResultDeck){
    if(greenCount>0){
        for(let i = greenCount; i > 0; i--){
            greenCount--;
            let randomItem = Math.floor(Math.random()*greenDeck.length);
            stageResultDeck.push(`green/${greenDeck[randomItem]}`)
            greenDeck.splice(randomItem, 1)
        }
    }
    if(brownCount>0){
        for(let i = brownCount; i > 0; i--){
            brownCount--;
            let randomItem = Math.floor(Math.random()*brownDeck.length);
            stageResultDeck.push(`brown/${brownDeck[randomItem]}`)
            brownDeck.splice(randomItem, 1)
        }
    }
    if(blueCount>0){
        for(let i = blueCount; i > 0; i--){
            blueCount--;
            let randomItem = Math.floor(Math.random()*blueDeck.length);
            stageResultDeck.push(`blue/${blueDeck[randomItem]}`)
            blueDeck.splice(randomItem, 1)
        }
    }
}
function showCard(deck, stage){
    let randomItem = Math.floor(Math.random()*deck.length);
    let color = deck[randomItem].split('/')[0];
    let currentNumber = Number(stage.querySelector(`.${color}`).innerText);
    stage.querySelector(`.${color}`).textContent = currentNumber - 1;
        resultCard.style.backgroundImage = `url('images/content/assets/MythicCards/${deck[randomItem]}')`
        deck.splice(randomItem, 1)
}

