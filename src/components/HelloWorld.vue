<template>
  <div >
    <div id="diceBox">
        <div id="diceContainer" >
            <div :class="{rollDice: rolling, die: true}">
                <p class="dieText">{{ diceNum }}</p>
            </div>
        </div>
        <button @click="rollDice">roll dice</button>
    </div>
    <p class="container" id="mainText">{{ currentScene.text}}</p>
    <div id="option-buttons" class="button-grid">
        <button @click="changeScene(scene)" v-for="(scene,index) in currentScene.options" :key="index" v-show="showOption(scene)" class="btn"> {{ scene.text }}</button>
    </div>

  </div>
</template>

<script>

export default {
  name: 'StoryBox',
  props: {
  },
  methods:{
    changeScene(scene){
      if (scene.died){
        this.Character = {health:20,AC:16,gold:10}
      }
    //   if (scene.dc){
        
    //   }
      if (scene.setCharacter){
        this.Character = Object.assign(this.Character, scene.setCharacter)
      }
      this.lastSceneID = this.currentScene.id
      this.currentScene = this.sceneNodes.find(sceneNode => sceneNode.id === scene.nextScene)

    },
    showOption(scene){
      return scene.requiredCharacter == null || scene.requiredCharacter(this.Character)
    },
    rollDice(){
        this.rolling = true
        const minInclusive = 1;
        const maxInclusive = 20;
        const randomInclusive = Math.floor(Math.random() * (maxInclusive - minInclusive + 1)) + minInclusive;
        setTimeout(() => {
            this.diceNum = randomInclusive
        }, 900); // 1500 milliseconds = 1.5 second
        setTimeout(() => {
            this.rolling = false
        }, 3000); // 3000 milliseconds = 3 second


    }
  },
  data(){
        return {
          Character : {health: 20,AC: 16,gold: 10},
          Inventory : {},
          diceNum: 20,
          rolling:false,
          lastSceneID:0,
          currentScene: {
              id:0,
              text: 'You are a young human barbarian who lives in a dying fishing town named bayshore on the edge of the continent valoria. Your town is on the verge on being taken by the stoneheart kingdom you are under due to un paid taxes. When all hope seems to be lost one fisherman begins to claim to have met people from a continent not yet to have been discovered. He continued by claiming that there are treasures galore in the other land ripe for the taking. Your town gets together to decide on if they should send someone to go discover the new world in hopes of returning with the funds to restore bashore to its old glory.',
              options: [
                  {
                      text: 'Volunteere to venture to the new world',
                      nextScene:1.1
                  },
                  {
                      text: 'Stay quite and do nothing',
                      nextScene: 1.2
                  }

              ]
          },
          sceneNodes : [
          {
              id:0,
              text: 'You are a young human barbarian who lives in a dying fishing town named bayshore on the edge of the continent valoria. Your town is on the verge on being taken by the stoneheart kingdom you are under due to un paid taxes. When all hope seems to be lost one fisherman begins to claim to have met people from a continent not yet to have been discovered. He continued by claiming that there are treasures galore in the other land ripe for the taking. Your town gets together to decide on if they should send someone to go discover the new world in hopes of returning with the funds to restore bashore to its old glory.',
              options: [
                  {
                      text: 'Volunteere to venture to the new world',
                      nextScene:1.1
                  },
                  {
                      text: 'Stay quite and do nothing',
                      nextScene: 1.2
                  }

              ]
          },
          {
              id:1.0,
              text: 'You have taken too much damage and have died',
              options: [
              {
                      text: 'Restart from begining',
                      died: true,
                      nextScene: 1.0
                  },
                  {
                      text: 'Restart from last choice',
                      nextScene: this.lastSceneID
                  },

              ]
          },
          {
              id:1.1,
              text: 'With you volunteering, the town comes to a unanimouse decision to send you off the the new world in hopes of treasure. you gather your trusty axe, some clothes and provisions and make your way to the dock. You are met by a rough old man who smells like he hasnt bathed in the past century. He gestures you to board the ship and says "ehh matey glad to have you aboard". As you board the ship a sense of duty and hope fill your body. As the boat pushes off from the dock you look back to the town you once called home and see the whole town waving you good by.',
              options: [
                  {
                      text: 'Waive Goodbye with tears in your eye',
                      nextScene: 1.3
                  },
                  {
                      text: 'Make an emotionless stare towards the town',
                      nextScene: 1.4
                  }

              ]
          },
          {
              id:1.2,
              text: 'The town decides it is too risky and does not venture to the new world. 7 months later the army of the StoneHeart kingdom come to town demanding the money they "rightfully" deserve. Your town however can not pay the funs and are all hung for their treason',
              options: [
                  {
                      text: 'Restart',
                      died: true,
                      nextScene: 0
                  },
              ]
          },
          {
              id:1.3,
              text: 'Your town cheers even louder seeing your devote dedication to the cause and the sound of their cheers fades as you get farther and farther away untill the city disapeers over the horizon.',
              options: [
                  {
                      text: 'Continue',
                      nextScene: 1.6
                  },
              ]
          },
          {
              id:1.4,
              text: 'Your towns cheers turn quickly into boos as they see that you are a heartless barbarian. They begin to open fire on the boat in attempts to make you pay',
              options: [
                  {
                      text: 'Take cover',
                      nextScene: 1.5,
                      dc:  ("player AC", 2)
                  },
                  {
                      text: 'Stand out on the edge of the ship like a man and let them take their shot',
                      nextScene: 1.5,
                      dc: ("player AC", 0)
                  },
              ]
          },
          {
              id:1.5,
              text: 'Your town is unable hit you before you disapear over the horizon',
              options: [
                {
                        text: 'Continue',
                        nextScene: 1.6
                    },
              ]
          },
          {
              id:1.5,
              text: 'Your town is able hit you before you disapear over the horizon dealing some damage',
              options: [
                {
                        text: 'Continue',
                        nextScene: 1.6
                    },
              ]
          },
          {
              id:1.6,
              text: 'After just a few days on the old rickety ship you hear an alarming siren that wakes you in the night. You rush to your feet and go up to the top deck to see what the comosion is. "Shes coming!" screams the captain "Shes coming for me!". Moments later you feel the ship get rattled by what you can only guess to be a large creature. Make a dex saving throw.',
              options: [
                {
                        text: 'Roll Dice',
                        nextScene: 1.0,
                        dc:10
                    },
              ]
          }
          ]
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#diceBox{
    display: flex;
    justify-content: center;
    flex-flow: column nowrap;
    align-items: center;
}
#diceContainer{
    height: 200px;
}
#mainText{
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.rollDice{
    transform: rotate(2160deg);
    transition-duration: 3s;
    
}
.die{
    background-image: url('../../public/d20-red-trans (1).png') ;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 130px;
    height: 130px;
    color: white;
    font-family: sans-serif;
    font-size: large;
    text-align: center;
}
.dieText{
    color: white;
    font-family: sans-serif;
    font-size: large;
    text-align: center;
    padding-top: 40%;
}
.container{
    width: 800px;
    background-color: white;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px 2px;
    text-align: center;
}

.button-grid {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    margin-top: 10px;
}

.btn {
    background-color: hsl(200, 100%, 50%);
    border: 1px solid hsl(200, 100%, 50%);
    border-radius: 5px ;
    padding: 5px 10px;
    color: white;
    outline: none;
}
.btn:hover {
    border-color: black;
}
</style>
