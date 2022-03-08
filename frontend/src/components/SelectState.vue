<template>
  <div class="hello">
    <h1>Select the States </h1>
    <input type='text' v-model='state' @input='filterStates' @change="initMap(state)">
    <div v-if="filteredStates">

        <option v-for="filteredState in filteredStates" v-bind:key="filteredState" @click="setState(filteredState)"> {{filteredState.toString()}}</option>
 
    </div>
    <!-- <vue-google-maps
      style="width:100%;"
      :api-key="AIzaSyDTY-MHM7QfupExthP5m5oKoBuWZRY2BXg"
    ></vue-google-maps> -->

    <div id="map"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import Loader from '@googlemaps/js-api-loader'
// import VueGoogleMaps from "@point-hub/vue-google-maps";

export default {
  name: 'SelectState',
  components:{
    // VueGoogleMaps
  },
  data: function() {
    return {
    filteredStates: [],
    state: ''
    }},

  methods:{
    filterStates(){
      var api= `http://localhost:4000/graphql?query={filterStates(name:"${this.state}"){name}}`
      
      fetch(api).then(async response =>{
        const data = await response.json()
        
        var result=data.data.filterStates
        var res= []
        result.forEach(element => {
          res.push(element.name)
        });
        console.log(result)
        this.filteredStates=res
        return this.filteredStates
      }).catch(error => console.log(error))
        
      },

    setState(stateselected){
      this.state=stateselected
      this.filteredStates=[]
    },
    initMap(state) {
      const loader = new Loader({apikey: apiKey})
      loader.load()
      console.log("google map inited",state)
      new google.maps.Map(document.getElementById("map"),{
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
  })
      
  
}
     
    }
}


</script>


