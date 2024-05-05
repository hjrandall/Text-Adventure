const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
let state = {}

function startGame(){
    state= {}
    showTextNode(1)
}

function showTextNode(textNodeIndex){
    const textnode = textNodes.find(textnode => textnode.id === textNodeIndex)
    textElement.innerText = textnode.text
    while ( optionButtonsElement.firstChild){
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textnode.options.forEach(option => {
        if (showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
        
    });
}
function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}
function selectOption(option){
    const nextTextNodeID = option.nextText
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeID)
}

const textNodes = [
    {
        id:1,
        text: 'You wake up in a strange place and you see a jar of blue goo near you',
        options: [
            {
                text: 'take goo',
                setState: {bluegoo:true},
                nextText: 2
            },
            {
                text: 'leave the goo',
                nextText: 2
            }

        ]
    },
    {
        id:2,
        text: 'You venture forth and search for answers when you stumble apon a merchant',
        options: [
            {
                text: 'Trade the goo for the sword',
                requiredState: function(currentState) {
                    return currentState.bluegoo;
                },
                setState: {bluegoo:false, sword: true},
                nextText: 3
            },
            {
                text: 'Trade the goo for the sword',
                requiredState: function(currentState) {
                    return currentState.bluegoo;
                },
                setState: {bluegoo:false, shield: true},
                nextText: 3
            },
            {
                text: 'Ignore the merchant',
                nextText: 3
            },
        ]
    },
    {
        id:3,
        text: 'You did it! congrats',
        options: [
            {
                text: 'Do a little dance',
            },
        ]
    }
]
startGame()