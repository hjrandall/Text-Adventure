<template>
    <div id="header" >
      <div class="flexyBoy">
        <div id="inventory" class="base">
          <div v-show="inventory.gold" id="gold">{{ inventory.gold }}</div>
          <div v-show="inventory.bronze_key" id="bronze_key">{{ inventory.bronze_key }}</div>
          <img v-show="inventory.axe" src="/battleAxe.png" alt="battle axe">
        </div >
        <img id="bag" src="brown_bag.png"  alt="brown bag" width="55" height="55">
      </div>
      <div>
        <div class="base">
          <div id="ac">{{ this.character.AC }}</div>
          <div>
            <h1>Young barbarian(you)</h1>
            <div class="health-bar">
                <div class="health" :style="{ width: characterHealthPercentage }"></div>
              </div>
          </div>
        </div>
        <div v-show="this.Enemy.name" class="base">
          <div id="ac">12</div>
          <div>
            <h1>{{ this.Enemy.name }}</h1>
            <div class="health-bar">
                <div class="health" :style="{ width: enemyHealthPercentage }"></div>
              </div>
          </div>
      </div>

      </div>
    </div>
</template>
  
  <script>
  
  export default {
    name: 'character-sheet',
    props: {
        character:{
            type: Object,
            required: true
        },
        inventory:{
            type: Object,
            required: true
        },
        Enemy:{
          type: Object,
          required:true
        }
        
    },
    methods:{
  },computed: {
    characterHealthPercentage() {
      var multiplyer = 97
      if(window.innerWidth < 1000){
        multiplyer = 98.5
      }
      if(this.character.currentHealth <=0){
        return '0%'
      }
      return `${(this.character.currentHealth / this.character.maxHealth) * multiplyer}%`;
    },
    enemyHealthPercentage() {
      var multiplyer = 97
      if(window.innerWidth < 1000){
        multiplyer = 98.5
      }
      if(this.Enemy.currentHealth <=0){
        return '0%'
      }
      return `${(this.Enemy.currentHealth / this.Enemy.maxHealth) * multiplyer}%`;
    }
  },
    data(){
          return {
          }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  *{
    font-family: "MedievalSharp", cursive;
    font-weight: 400;
    font-style: normal;
    font-size: large;
  }
  h1{
    border: 2px solid #ffffff; /* Border color */
    border-radius: 5px; /* Border radius */
    padding: 5px 10px; /* Padding around the title */
    background-color: rgba(0, 0, 0, 0.5); /* Background color with transparency */
    color: #ffffff; /* Text color */
    display: inline-block;
    margin-left: 5px;
    margin-bottom: 0;
  }
  #bag{
    margin-top: 60px;
    margin-left: -20px;
  }
  .flexyBoy{
    display: flex;
    flex: row nowrap;
  }
  #header{
    display: flex;
    flex: row nowrap;
    justify-content: space-between;
    width: 100vw;
    height: 100px;
  }
  .base{
    height: 90%;
    display: flex;
    flex-flow: row nowrap;
  }
  .health-bar {
    background-image: url('../../public/hbar.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  width: 500px; /* Adjust this width according to your design */
  height: 40%; /* Adjust height if needed */
  margin-right: 5px;
  overflow: hidden; /* Hide overflow */
}
.health{
  height: 38%;
  margin-top: 3px;
  margin-left: 9px;
  margin-right: 5px;
  background-color: #618f39; /* Change color based on your preference */
}
#ac{
    height: 60%; /* Adjust height if needed */
    width: 50px;
    margin-top: 7%;
    background-image: url('../../public/shield.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    color: rgb(13, 14, 8);
    text-align: center;
    font-size:x-large;
    padding-top: 10px;
    padding-right: 2px;
}
#gold{
  background-image: url('../../public/gold_coins.webp');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width:50px ;
    text-align: center;
    padding-top: 35px;

}
#bronze_key{
    background-image: url('../../public/Bronze_key.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width:50px ;
    text-align: center;
    padding-top: 45px;
}
#inventory{
  border: black double 4px;
  border-radius: 5px;
  margin-left: 5px;
  margin-top: 5px;
}
@media screen and (max-width: 1000px) {
  .health-bar{
    width: 350px;
    
  }
  .health{
    height: 30%;
    margin-top: 7px;
    margin-left: 3px;
    margin-right: 2px;
  }
}

  </style>
  