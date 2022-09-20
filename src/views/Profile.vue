
<template>
  <div class="container-fluid">
     <Navbar></Navbar>
     <div class="row">
     <div class="col">
       <CurrentUserTask></CurrentUserTask>
     </div>
     </div>


    </div>
    
        
    </template>
    




<script>

import CurrentUserTask from '../components/CurrentUserTask.vue'
export default {
  name: "Profile",
  components: {
    CurrentUserTask
  },
  
}
</script>