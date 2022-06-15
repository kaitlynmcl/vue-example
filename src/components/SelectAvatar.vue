<template>
  <div class="simple-app">
    <h1>Select your avatar:</h1>
    <select v-model="selectedOption" @change="fetchUsers">
      <option :value="null" disabled>Select Avatar</option>
      <option v-for="(item, index) in options" :value="item.name" :key="index">
        {{ item.name }}
      </option>
    </select>

    <div v-for="match in matches" v-bind:key="match.id">
      <h1>{{ match.name }}</h1>
      <ul>
        <li>
          {{ match.address.street }}, {{ match.address.suite }}, {{ match.address.city }}
        </li>
        <li>{{ match.phone }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return { matches: [], options: [], selectedOption: null };
  },
  mounted() {
    this.loadOptions();
  },
  methods: {
    fetchUsers: async function (event) {
      let input = event.target.value;
      console.log(input.toLowerCase());
      const url = "https://jsonplaceholder.typicode.com/users";
      await axios
        .get(url)
        .then((result) => {
          this.team = result.data;

          let matches = [];
          this.team.filter((teamMember) => {
            teamMember.name === input ? matches.push(teamMember) : "no";
          });
          this.matches = matches;
          console.log(this.matches, "im matches");
        })
        .catch((error) => console.log(error));
    },
    loadOptions() {
      const url = "https://jsonplaceholder.typicode.com/users";
      axios.get(url).then((options) => {
        this.options = options.data;
        console.log(this.options);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
