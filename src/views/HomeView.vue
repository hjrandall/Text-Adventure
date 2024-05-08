<template>
    <div id="homePage">
      <img src="/dragoncon.png" alt="battle axe" width="550px" height="550px">
    <nav>
        <button class="campaigns" @click="router.push({name:'TheNewWorld'})">The new world</button>
    </nav>
  
    </div>
  </template>
  <script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter();
 
  </script>
  
  <style>
  #homePage{
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  
  }
  .campaigns-grid {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      margin-top: 10px;
  }
  p{
    font-family: "MedievalSharp", cursive;
      font-weight: 400;
      font-style: normal;
      font-size: 1.4rem;
      color: white;
  }
  .campaigns {
      text-decoration: none;
      position: relative; /* Required for the pseudo-element */
      background-color: rgba(0, 0, 0, 0.85);
      border-radius: 5px;
      border:black .1px solid;
      padding: 5px 10px;
      color: white;
      outline: none;
      margin-right: 15px;
      z-index: 7;
      font-family: "MedievalSharp", cursive;
      font-weight: 400;
      font-style: normal;
      font-size: 1.4rem;
      cursor: pointer;
      display: inline-block;
      margin-bottom: 10px;
  }
  
  .campaigns::before {
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
  
  .campaigns:hover::before {
      opacity: 1;
  }
  </style>
  