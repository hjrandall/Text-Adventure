<template>
  <div >
    <characterSheet
        :character="character"
        :inventory="Inventory"
        ></characterSheet>
    <div class="Main-body">
        <div  id="diceBox" >
            <video id="myVideo" class="success1" >
                <source src="/success.webm" type="video/webm">
            </video>
            <video id="myVideo2" class="failure1" >
                <source src="/failure.webm" type="video/webm">
            </video>
            <div v-show="currentScene.options[0].dc" id="diceContainer" >
                <div :class="{rollDice: rolling,staticDice:true, die: true}">
                    <p class="dieText">{{ diceNum }}</p>
                </div>
            </div>
        </div>
        <p class="container" id="mainText">{{ currentScene.text}}</p>
        <div id="option-buttons" class="button-grid">
            <button @click="changeScene(scene)" v-for="(scene,index) in currentScene.options" :key="index" v-show="showOption(scene)" class="btn"> {{ scene.text }}</button>
        </div>
    </div>

  </div>
</template>

<script>
import characterSheet from './Header.vue'

export default {
  name: 'StoryBox',
  components:{
    characterSheet
  },
  props: {
  },
  methods:{
   async changeScene(scene){
        var dcCheck
        var nextsceneID =scene.nextScene
        if (scene.dc){
            dcCheck = await this.rollDice(scene.dc)
            if (dcCheck){
                nextsceneID = scene.nextScene[0]
        }else{
            nextsceneID = scene.nextScene[1]
        }
    }
    if (scene.died){
        this.Character = {health:20,AC:16,gold:10}
    }
    if (scene.setCharacter){
        this.Character = Object.assign(this.Character, scene.setCharacter)
    }
    if (scene.nextScene == 0.1){
        scene.nextScene = this.lastSceneID
    }
        
        this.lastSceneID = this.currentScene.id
        this.currentScene = this.sceneNodes.find(sceneNode => sceneNode.id === nextsceneID)
        this.rolling = false
        this.diceNum = 20

    },
    showOption(scene){
      return scene.requiredCharacter == null || scene.requiredCharacter(this.Character)
    },
    async rollDice(dc){
        this.rolling = true
        this.diceNum = null
        const minInclusive = 1;
        const maxInclusive = 20;
        const randomInclusive = Math.floor(Math.random() * (maxInclusive - minInclusive + 1)) + minInclusive;
        await this.timeout(3000);
        this.diceNum = randomInclusive
        await this.timeout(1400);
        var dcCheck = false
        if (dc[0]== "player AC"){
            if (randomInclusive <= (dc[1] + this.Character.AC)){
                dcCheck = true
                
                let vid = document.getElementById("myVideo");
                vid.play()
            }else{
                let vid = document.getElementById("myVideo2");
                vid.play()
            }
        }
        else{
             if (randomInclusive >= dc[1]){
                dcCheck =true

                let vid = document.getElementById("myVideo");
                vid.play()
            }
            else{
                let vid = document.getElementById("myVideo2");
                vid.play()
            }
        }
        
        await this.timeout(2500);
        return dcCheck
    },
    timeout(ms) {
       return new Promise(resolve => setTimeout(resolve, ms));
},
},
  data(){
        return {
          Character : {maxHealth: 20,currentHealth:20,AC: 16,},
          Inventory : {gold: 10},
          diceNum: 20,
          success:false,
          failure:false,
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
                      nextScene: 1.1
                  },
                  {
                      text: 'Restart from last choice',
                      nextScene: 0.1
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
                      nextScene: [1.5,1.6],
                      dc:  ["player AC", 2]
                  },
                  {
                      text: 'Stand out on the edge of the ship like a man and let them take their shot',
                      nextScene: [1.5,1.6],
                      dc: ["player AC", 0]
                  },
              ]
          },
          {
              id:1.5,
              text: 'Your town is unable to hit you before you disapear over the horizon',
              options: [
                {
                        text: 'Continue',
                        nextScene: 1.7
                    },
              ]
          },
          {
              id:1.6,
              text: 'Your town is able to hit you before you disapear over the horizon dealing some damage',
              options: [
                {
                        text: 'Continue',
                        nextScene: 1.7
                    },
              ]
          },
          {
              id:1.7,
              text: 'After just a few days on the old rickety ship you hear an alarming siren that wakes you in the night. You rush to your feet and go up to the top deck to see what the comosion is. "Shes coming!" screams the captain "Shes coming for me!". Moments later you feel the ship get rattled by what you can only guess to be a large creature. Make a dex saving throw.',
              options: [
                {
                        text: 'Roll Dice',
                        nextScene: [1.8,1.9],
                        dc:["other", 21]
                    },
              ]
          },
          {
              id:1.8,
              text: 'You succesfully keep your balance and stand ready to battle',
              options: [
                {
                        text: 'Continue',
                        nextScene: 1.9,
                    },
              ]
          },
          {
              id:1.9,
              text: 'You drank 1 too many beers before boarding the ship and are not able to stable your self sending you prone onto the ship',
              options: [
                {
                        text: 'Continue',
                        nextScene: 1.9,
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
.Main-body{
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    height: 80vh;
    
}
.success1{
    position: absolute;
    top:20%;
    left: opx;
    z-index: 1;
    width: 50%;
    max-height:230px;
}
.failure1{
    position: absolute;
    top:22%;
    z-index: 1;
    width: 100%;
    max-height:250px;
}
#diceBox{
    display: flex;
    justify-content: center;
    align-items: center;
}

#mainText{
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.rollDice{
    transform: rotate(3600deg);
    transition-duration: 4000ms;
}
.staticDice{
    background-image: url('../../public/D20_die_roll.png') ;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
.die{
    
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
    padding-top: 49%;
    padding-right:6%;
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
    width: 800px;
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
    z-index: 7;
}
.btn:hover {
    border-color: black;
}
</style>
