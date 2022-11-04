const selectionButtons = document.querySelectorAll('[data-selection]')
const yourScore= document.querySelector('[data-your-score]')
const compScore= document.querySelector('[data-comp-score]')
const finalColumn = document.querySelector('[data-final-column]')
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌',
        beats: 'paper'
    },
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', ()=>{
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find( selection => selection.name === selectionName)
        makeSelection(selection)
    })
});

function makeSelection(selection){
    let computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const compWinner = isWinner(computerSelection, selection);
    addSelectionResult(computerSelection, compWinner)
    addSelectionResult(selection, yourWinner)
    if(yourWinner) incrementScore(yourScore);
    if(compWinner) incrementScore(compScore)
}

function incrementScore(scoreSpan){
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner){
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if(winner) div.classList.add('winner');
    finalColumn.after(div)
}

function isWinner(selection, opponentSelection){
    return selection.beats === opponentSelection.name
}
function randomSelection(){
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}