<template>
  <div class="simple-app">
    <h1>Select your avatar:</h1>
    <select v-model="selectedOption" @change="fetchUsers"> <!-- prepopulates dropdown with v-model & @change event -->
      <option :value="null" disabled>Select Avatar</option> 
      <option v-for="(item, index) in options" :value="item.name" :key="index">
        {{ item.name }}
      </option>
    </select>

    <div v-for="match in matches" v-bind:key="match.id"> <!-- populates ui with content fetched from api based on the name that matches -->
      <h1>{{ match.name }}</h1>
      <ul>
        <li>
          {{ match.address.street }}, {{ match.address.suite }} <br />
          {{ match.address.city }}, {{ match.address.zipcode }}
        </li>
        <li><span class="avatar__header">Phone: </span>{{ match.phone }}</li> 
        <li><span class="avatar__header">Website: </span>{{ match.website }}</li>
        <li>{{ match.company.name }}, {{ match.company.catchPhrase }}</li>
        <li>{{ match.company.bs }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {            // data function that establishes initial reactive state of component instance
      matches: [],      // no uses of reactivity api or vuex due to size/simplicity of app
      options: [], 
      selectedOption: null, 
      errored: false
    };
  },
  mounted() {
    this.loadOptions();
  },
  methods: {
    fetchUsers: async function (event) {
      let input = event.target.value;
      console.log(input.toLowerCase());
      const url = "https://jsonplaceholder.typicode.com/users";
      await axios // axios as recommended by the docs, simple to install and automatically transforms data to json 
        .get(url)
        .then((result) => {
          this.team = result.data;  // instantiates team to result.data; instantiation with this keyword occurs throught the app

          let matches = [];
          this.team.filter((teamMember) => {
            teamMember.name === input ? matches.push(teamMember) : "no";
          });
          this.matches = matches;
          console.log(this.matches, "im matches");
        })
        .catch((error) =>     // basic api error handling, tracks error state
          console.log(error),
          this.errored = true
        ); 
    },
    loadOptions: async function () {      // async, await to enable asynchronous, promise-based behavior to improve readibility and consistency across app
      const url = "https://jsonplaceholder.typicode.com/users";
      await axios
        .get(url)
        .then((options) => {
          this.options = options.data;
          console.log(this.options);
        })
        .catch((error) =>     // basic api error handling, tracks error state
          console.log(error),
          this.errored = true
        );  
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

li {
  list-style-type: none;
}
a {
  color: #42b983;
}
</style>
