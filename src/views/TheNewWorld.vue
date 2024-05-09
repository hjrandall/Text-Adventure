<template>
    <div >
      <characterSheet
          :character="character"
          :inventory="Inventory"
          :Enemy="enemy"
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
  import characterSheet from '../components/Header.vue'
  
  export default {
    name: 'TheNewWorld',
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
      if(scene.died){
        this.character ={maxHealth: 20,currentHealth:20,AC: 1,}
        this.Inventory = {gold: 10,axe:true}
      }
      if (scene.setCharacter){
          this.character = Object.assign(this.character, scene.setCharacter)
      }
      if (scene.nextScene == 0.1){
          nextsceneID = this.lastSceneID
      }
      if (this.enemy.currentHealth && this.enemy.currentHealth <=0  ){
        nextsceneID = scene.nextScene[2]
        this.enemy = {name: null,AC: null,maxHealth:null,currentHealth:null}
      }
      if (this.character.currentHealth<= 0){
        nextsceneID = 1.0
      }
          
          this.lastSceneID = this.currentScene.id
          this.currentScene = this.sceneNodes.find(sceneNode => sceneNode.id === nextsceneID)
          this.rolling = false
          this.diceNum = 20
  
      },
      showOption(scene){
        return scene.requiredCharacter == null || scene.requiredCharacter(this.character)
      },
      async rollDice(dc){
        if(dc.health && this.enemy.name == null ){
            this.enemy = {
                name: dc.name,
                AC: dc.dc,
                maxHealth:dc.health,
                currentHealth:dc.health
            } 

            }
          this.rolling = true
          this.diceNum = null
          const minInclusive = 1;
          const maxInclusive = 20;
          const randomInclusive = Math.floor(Math.random() * (maxInclusive - minInclusive + 1)) + minInclusive;
          await this.timeout(3000);
          this.diceNum = randomInclusive
          await this.timeout(500);
          var dcCheck = false
          var totalDamage=0
          var vid, i;
          
          if (dc.against == "player"){
              if (randomInclusive <= (dc.dc + this.character.AC)){
                  dcCheck = true
                  
                  vid = document.getElementById("myVideo");
                  vid.play()
              }else{
                  vid = document.getElementById("myVideo2");
                  vid.play()
                  for( i=0; i<dc.diceDamage; i++){
                        totalDamage += Math.floor(Math.random() * (6 - 1 + 1)) + 1;  
                }
               
                this.character.currentHealth = this.character.currentHealth - totalDamage
                
              }
          }
          else{
               if (randomInclusive >= dc.dc){
                  dcCheck =true
  
                  vid = document.getElementById("myVideo");
                  vid.play()
                if(dc.health){
                    for( i=0; i<this.playerLevel; i++){
                        totalDamage += Math.floor(Math.random() * (6 - 1 + 1)) + 1;
                    }
                    this.enemy.currentHealth = this.enemy.currentHealth - totalDamage
            }
            
              }
              else{
                  vid = document.getElementById("myVideo2");
                  vid.play()
              }
          }
          
          await this.timeout(3000);
          vid.currentTime = 0
          return dcCheck
      },
      timeout(ms) {
         return new Promise(resolve => setTimeout(resolve, ms));
  },
  },
    data(){
          return {
            character : {maxHealth: 20,currentHealth:20,AC: 15,},
            Inventory : {gold: 10,axe:true},
            diceNum: 20,
            success:false,
            failure:false,
            rolling:false,
            lastSceneID:0,
            playerLevel:1,
            enemy:{name: null,AC: null,maxHealth:null,currentHealth:null} ,
            currentScene: {
                id:0,
                text: 'You are a young human barbarian who lives in a dying fishing town named Bayshore on the edge of the continent Valoria. Your town is on the verge of being taken by the Stoneheart Kingdom due to unpaid taxes. When all hope seems to be lost, one fisherman claims to have met people from a continent not yet discovered. He continues by saying there are treasures galore in the unknown world ripe for the taking. Your town gathers together to decide if they should send someone to discover the new world in hopes of returning with the funds needed to restore Bayshore to its old glory.',
                options: [
                    {
                        text: 'Volunteer to venture to the new world.',
                        nextScene:1.1
                    },
                    {
                        text: 'Stay quiet and do nothing.',
                        nextScene: 1.2
                    }
  
                ]
            },
            sceneNodes : [
            {
                id:0,
                text: 'You are a young human barbarian who lives in a dying fishing town named Bayshore on the edge of the continent Valoria. Your town is on the verge of being taken by the Stoneheart Kingdom due to unpaid taxes. When all hope seems to be lost, one fisherman claims to have met people from a continent not yet discovered. He continues by saying there are treasures galore in the unknown world ripe for the taking. Your town gathers together to decide if they should send someone to discover the new world in hopes of returning with the funds needed to restore Bayshore to its old glory.',
                options: [
                    {
                        text: 'Volunteer to venture to the new world.',
                        nextScene:1.1
                    },
                    {
                        text: 'Stay quiet and do nothing.',
                        nextScene: 1.2
                    }
  
                ]
            },
            {
                id:1.0,
                text: 'You have taken too much damage and have died.',
                options: [
                {
                        text: 'Restart from begining',
                        died: true,
                        nextScene: 1.1
                    },
                    {
                        text: 'Restart from last scene',
                        nextScene: 0.1
                    },
  
                ]
            },
            {
                id:1.1,
                text: "With you volunteering, the town unanimously decides to send you to the new world in hopes of treasure. You gather your trusty axe, 10 gold, and travel to the dock. You are met by a rough old man who smells like he hasn't bathed in the past century. He gestures for you to board the ship and says, 'Eh, matey, glad to have you aboard.' As you board the ship, a sense of duty and hope fill your body. As the boat pushes off from the dock, you look back to the town you once called home and see everyone bidding you farewell.",
                options: [
                    {
                        text: 'Wave goodbye with tears in your eyes',
                        nextScene: 1.3
                    },
                    {
                        text: 'Grit your teeth and make an emotionless face toward the town',
                        nextScene: 1.4
                    }
  
                ]
            },
            {
                id:1.2,
                text: 'The town decides it is too risky and does not send someone to venture into the new world. Seven months later, the army of the StoneHeart Kingdom comes to your town demanding the money they "rightfully" deserve. However, your town cannot pay the funds and everyone is hanged for their treason.',
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
                text: 'The town cheers even louder, seeing your devoted dedication to the cause, and you hear the sounds of their cheers all the way until the city disappears over the horizon.',
                options: [
                    {
                        text: 'Continue',
                        nextScene: 1.7
                    },
                ]
            },
            {
                id:1.4,
                text: "The town's cheers turn quickly into boos as they see that you are a heartless barbarian. They begin to open fire on the boat in an attempt to make you pay for your heartlessness.",
                options: [
                    {
                        text: 'Take cover',
                        nextScene: [1.5,1.6],
                        dc: {   against:"player",
                                dc: 2,
                                diceDamage:1
                            }
                    },
                    {
                        text: 'Stand out on the edge of the ship like a man and let them take their shot',
                        nextScene: [1.5,1.6],
                        dc: {   against:"player",
                                dc: 0,
                                diceDamage:1
                            }
                    },
                ]
            },
            {
                id:1.5,
                text: 'The town is unable to hit you before you disappear over the horizon.',
                options: [
                  {
                          text: 'Continue',
                          nextScene: 1.7
                      },
                ]
            },
            {
                id:1.6,
                text: 'The town is able to hit you before you disappear over the horizon, dealing some damage to you.',
                options: [
                  {
                          text: 'Continue',
                          nextScene: 1.7
                      },
                ]
            },
            {
                id:1.7,
                text: 'After just a few days on the rickety old ship, you hear an alarming siren that wakes you from your afternoon slumber. You rush to your feet and climb to the main deck. As you shuffle onto the main deck, you are slightly blinded by the sunlight and raise your hand to shade your eyes. "Shes coming!" screams the captain. "Shes coming for me!" Moments later, the ship is violently rattled by what you can only guess to be a large creature. Make a Dexterity saving throw.',
                options: [
                  {
                          text: 'Roll Dice',
                          nextScene: [1.8,1.9],
                          dc:{   against:"other",
                                dc: 10
                            }
                      },
                ]
            },
            {
                id:1.8,
                text: 'You successfully keep your balance and stand ready for whatever may come your way.',
                options: [
                  {
                          text: 'Continue',
                          nextScene: 2,
                      },
                ]
            },
            {
                id:1.9,
                text: 'You drank one too many beers before boarding the ship and are not able to steady yourself, sending you prone onto the ship floor.',
                options: [
                  {
                          text: 'Continue',
                          nextScene: 2,
                      },
                ]
            },
            {
                id:2,
                text: 'All seems to go quiet for a moment when you see, out of the corner of your eye, a slimy pink tentacle peek its head over the side of the boat and begin to stretch out onto the main deck. Soon after, five more slimy pink tentacles appear and grasp the ship, holding it in place. Then, as if a sea geyser had erupted, a spray of water flies into the sky as high as the ship itself, and when the water disperses, there lies a gigantic squid with its beady, one eye staring down at you.',
                options: [
                        {
                          text: 'Attack with great axe',
                          nextScene: [2.1,2.2,2.3],
                          dc:{against:"enemy",
                                dc: 8 ,
                                health:10, 
                                name: "Giant Squid"
                            }
                      },
                      {
                          text: 'Ready an action',
                          nextScene: 2.4,
                          
                      },
                      {
                          text: 'Go back to bed',
                          nextScene: 2.5,
                        
                      }
                ]
            },
            {
                id:2.1,
                text: 'With your great axe in hand you slam it down dealing damage to the giant squid. The squid sreiks in pain as it raises one of its tentacles and swipes at you in retaliation',
                options: [
                        {
                          text: 'limbo underneath the tentacle swipe',
                          nextScene: [2.11,2.12],
                          dc: { against:"player",
                                dc: 1,
                                diceDamage:1
                            }
                      },
                      {
                          text: 'Hunker down',
                          nextScene: [2.13,2.14],
                          dc: { against:"player",
                                dc: 0,
                                diceDamage:1
                            }
                          
                      },
                    ]
                    },{
                id:2.11,
                text: 'All those years as the towns raining limbo champion comes in handy as you dodge the squids attack. You now stand ready to take an action.',
                options: [
                        {
                          text: 'Attack with great axe',
                          nextScene: [2.1,2.2,2.3],
                          dc:{against:"enemy",
                                dc: 8 ,
                                health:10, 
                                name: "Giant Squid"
                            }
                      },
                      {
                          text: 'climb onto a tentacle, run up to the head of the squid, leap into the air and strike the squid in the eye ',
                          nextScene: [2.1,2.2,2.3],
                          dc:{against:"enemy",
                                dc: 8 ,
                                health:10, 
                                name: "Giant Squid"
                            }
                          
                      },
                      
                ]
            },{
                id:2.12,
                text: 'You didnt quite go low enough and get slammed by the squids tentacle taking damage. You brush off the squid goo, pick yourself off the floor and stand ready to take an action.',
                options: [
                        {
                          text: 'Attack with great axe',
                          nextScene: [2.1,2.2,2.3],
                          dc:{against:"enemy",
                                dc: 8 ,
                                health:10, 
                                name: "Giant Squid"
                            }
                      },
                      {
                          text: 'climb onto a tentacle run up to the head of the squid leap into the air and strike the squid in the eye ',
                          nextScene: [2.1,2.2,2.3],
                          dc:{against:"enemy",
                                dc: 8 ,
                                health:10, 
                                name: "Giant Squid"
                            }
                          
                      },
                      
                ]
            },{
                id:2.13,
                text: 'You hunker down and are able to deflect the squids tentacle and now stand ready to take an action',
                options: [
                        {
                          text: 'Attack with great axe',
                          nextScene: [2.1,2.2,2.3],
                          dc:{against:"enemy",
                                dc: 8 ,
                                health:10, 
                                name: "Giant Squid"
                            }
                      },
                      {
                          text: 'climb onto a tentacle, run up to the head of the squid, leap into the air and strike the squid in the eye ',
                          nextScene: [2.1,2.2,2.3],
                          dc:{against:"enemy",
                                dc: 8 ,
                                health:10, 
                                name: "Giant Squid"
                            }
                          
                      },
                      
                ]
            },{
                id:2.14,
                text: 'You hunker down but the squid clips your legs sending you flying to the side taking damage. You pick yourself back up, brush the dust off and with a stern look on your face you stand ready to take an action',
                options: [
                        {
                          text: 'Attack with great axe',
                          nextScene: [2.1,2.2,2.3],
                          dc:{against:"enemy",
                                dc: 8 ,
                                health:10, 
                                name: "Giant Squid"
                            }
                      },
                      {
                          text: 'climb onto a tentacle, run up to the head of the squid, leap into the air and strike the squid in the eye ',
                          nextScene: [2.1,2.2,2.3],
                          dc:{against:"enemy",
                                dc: 8 ,
                                health:10, 
                                name: "Giant Squid"
                            }
                          
                      },
                      
                ]
            },
            {
                id:2.2,
                text: 'You bring your great axe up into the air and slam it down barely missing the giant squid. The squid seems to chuckle as it swipes its tentacle at you in retaliation',
                options: [
                        {
                          text: 'limbo underneath the tentacle swipe',
                          nextScene: [2.11,2.12],
                          dc: { against:"player",
                                dc: 1,
                                diceDamage:1
                            }
                      },
                      {
                          text: 'Hunker down',
                          nextScene: [2.13,2.14],
                          dc: { against:"player",
                                dc: 0,
                                diceDamage:1
                            }
                          
                      },
                ]
            },
            {
                id:2.3,
                text: 'With your last blow to the squid with your great axe it seems to make the squid release its grip on the ship. You see the squids head slumps back until it slapps the face of the water. You rush over to the side of the boat and see the squid slowly drift into the abys. YOU KILLED THE SQUID!',
                options: [
                        {
                          text: 'Continue',
                          nextScene: 2.31,
                          
                      },
                      
                ]
            },
            {
                id:2.31,
                text: '"Squidy!!!" screams the captain "You were too young!. The captain then comes over to you with tear filled eyes" how could you? How could you do that to squidy?!?!?"',
                options: [
                        {
                          text: 'He kinda had it coming',
                          nextScene: 2.32,
                      },{
                          text: 'My condolences captain',
                          nextScene: 2.33,
                      },{
                          text: 'You knew that guy?',
                          nextScene: 2.34,
                      },     
                ]
            },
            {
                id:2.32,
                text: 'The captain glares into your soul as anger fills his eyes. He stirnly walks over to you and puts his face close to yours to where you can feel his breath of your mouth. In a surprisingly gentle but strong voice the captain says "You know nothing about this majestic beast"',
                options: [
                        {
                          text: 'If you like it so much why dont you dive in after it',
                          nextScene: 2.34,
                      },{
                          text: 'I hit a nerve I am sorry, please do forgive',
                          nextScene: 2.33,
                      },  
                ]
            },
            {
                id:2.33,
                text: 'The captain  extends both his arms out and embraces you. "Thank you, young scalywag" wept the captain" the captain lets go of you and slowly makes his way back to his chambers',
                options: [
                        {
                          text: 'Continue',
                          nextScene: 2.6,
                      }    
                ]
            },
            {
                id:2.34,
                text: '"SHE, SHE WAS MY FRINED!" bellowed the captain. In a sobbing rage the captains runs towards the end of the deck while screaming "Im coming for you!" he then leaps off the ship head first into the sea never to be seen again',
                options: [
                        {
                          text: 'Continue',
                          nextScene: 2.6,
                      }    
                ]
            },
            {
                id:2.4,
                text: 'You get into your fighting stance, both hands gripping your great axe. You stare the giant squid down for what seems to be an eternity when the captain calmy walks over to the squids head and begins to pet it. " this is squidy" the captain proudly states "she is here to take me away. I am done with my sailing life and im ready to settle down with squidy". Your jaw drops as you watch the captain hop on top of the squids head. the squid then releases the boat and slowly slumps back into the water. You look over the side of the ship to see that the captain is riding the squid as if it was a jet ski',
                options: [
                        {
                          text: 'Cry happy tears for the captain',
                          nextScene: 2.6,
                      },
                      {
                          text: 'stand there in utter disbelief',
                          nextScene: 2.6,
                      }    
                ]
            },
            {
                id:2.5,
                text: 'You really didnt want to fight today and are still a little grogy from being woke up from your slumber. You casually make your way down to your chambers and fall back asleep. A couple days later when you wake up from your nap you notice that the captain is no where to be found. Some say he went off to live with squid and others say he threw himself overboard. I guess you will never know',
                options: [
                        {
                          text: 'Continue',
                          nextScene: 2.6,
                      }    
                ]
            },
            {
                id:2.6,
                text: 'A week has passed sense the incident with the squid when you hear "Land hoooooooooooooooo!!!" the ship docks and you are greeting with a thick busy green forest with two faded path ways.One goin to the leftish and the other to the rightish',
                options: [
                        {
                          text: 'go leftish',
                          nextScene: 2.6,
                      },
                      {
                          text: 'go rightish',
                          nextScene: 2.6,
                      }        
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
      top:17%;
      left: 25%;
      z-index: 1;
      width: 50%;
      max-height:230px;
  }
  .failure1{
      position: absolute;
      top:16%;
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
    font-family:Georgia, 'Times New Roman', Times, serif;
    font-size: 1.7rem;
  }
  .rollDice{
      transform: rotate(3600deg);
      transition-duration: 4000ms;
  }
  .staticDice{
      background-image: url('../../public/blue_d20.png') ;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
  }
  .die{
      
      width: 130px;
      height: 130px;
      color: white;
      font-family: 'medival';
      font-size: large;
      text-align: center;
  }
  .dieText{
      color: white;
      font-family: "MedievalSharp", cursive;
      font-weight: 400;
      font-style: normal;
      font-size: 1.6rem;
      text-align: center;
      padding-top: 43%;
  }
  .container{
      max-width: 700px;
      min-width: 400px;
      background-color: rgba(224, 205, 103, .85);
      padding: 10px;
      margin: 20px;
      border:solid;
      border-radius: 5px;
      border-color: #5F3B2B;
      border-width: 2px;
      box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.7);
      text-align: center;
      color: #131312 ;
      line-height: 1.8rem;
  }
  
  .button-grid {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      margin-top: 10px;
      width: 60%;
  }
  
  .btn {
      position: relative; /* Required for the pseudo-element */
      background-color: rgba(0, 0, 0, 0.85);
      border-radius: 5px;
      border:black .1px solid;
      padding: 5px 10px;
      color: white;
      outline: none;
     
      z-index: 7;
      font-family: "MedievalSharp", cursive;
      font-weight: 400;
      font-style: normal;
      font-size: 1.7rem;
      cursor: pointer;
      display: inline-block;
      margin-bottom: 10px;
  }
  
  .btn::before {
      content: '';
      position: absolute;
      border: none; /* Reset border */
      outline: none;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('../../public/fire.gif');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0;
      transition: opacity .7s ease-in-out;
      z-index: -1; /* Ensure the pseudo-element is behind the button content */
  }
  
  .btn:hover::before {
      opacity: 1;
  }
  </style>
  