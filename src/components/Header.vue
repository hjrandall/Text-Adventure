<template>
    <div id="header" >
      <div class="base">
        <div v-show="inventory.gold" id="gold">{{ inventory.gold }}</div>

      </div >
      <div class="base">
        <div id="ac">16</div>
        <div class="health-bar">
            <div class="health" :style="{ width: healthPercentage }"></div>
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
        
    },
    methods:{
  },computed: {
    healthPercentage() {
      return `${(this.currentHealth / this.maxHealth) * 98.3}%`;
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
  margin-top: 5%;
  margin-right: 10px;
  overflow: hidden; /* Hide overflow */
}
.health{
  height: 38%;
  margin-top: 3px;
  margin-left: 9px;
  margin-right: 8px;
  background-color: green; /* Change color based on your preference */
}
#ac{
    height: 60%; /* Adjust height if needed */
    width: 50px;
    margin-top: 3%;
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
  </style>
  