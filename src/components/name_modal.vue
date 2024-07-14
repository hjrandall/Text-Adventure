<template>
    <Teleport to="body">
        <div class="modal" v-if="getName">
          <div class="flexyboy">
            <h3> create your character name</h3>
            <input id="nameField" v-model="name" type="text" maxlength="20">
            <button class="btn" @click="updateName">Set Name</button>
          </div>
        </div>
    </Teleport>

</template>

<script>
  
  export default {
    name: 'nameModal',
    props: {
        getName:{
            type: Boolean,
            required: true
        },
    },
    methods:{
      updateName() {
        this.$emit('update-name', this.name) 
        console.log(this.name)
    },
  },computed: {
  },
    data(){
          return {
            name:""
          }
    }
  }
  </script>
  <style scoped>
  .flexyboy{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .8);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    font-family: "MedievalSharp", cursive;
    font-weight: 400;
    font-style: normal;
    font-size: 1.7rem;
}
.modal div {
    background-color: rgba(224, 205, 103, 1);
    padding: 50px;
    border-radius: 10px;
    display:flex;
    flex-flow: column nowrap
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
      width: 60%;

      
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
  #nameField{
    margin-bottom: 20px;
    border-radius: 12px;
    width: 80%;
    line-height: 2rem;
    text-align: center;
  }

</style>