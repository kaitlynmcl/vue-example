<template>
  <div class="employee">
    <div class="employee__select">
      <h1 class="employee__name">Select your employee:</h1>
      <select
        v-model="selectedOption"
        @change="fetchUsers"
        class="employee__pink-theme"
      >
        <!-- prepopulates dropdown with v-model & @change event -->
        <option :value="null" disabled>Select Employee:</option>
        <option
          v-for="(item, index) in options"
          :value="item.name"
          :key="index"
        >
          {{ item.name }}
        </option>
      </select>
    </div>

    <div class="employee__info" v-for="match in matches" v-bind:key="match.id">
      <!-- populates ui with content fetched from api based on the name that matches -->
      <div class="employee__text">
        <h1 class="employee__name">{{ match.name }}</h1>
        <ul>
          <li>
            <span class="employee__header">Address: </span>
            {{ match.address.street }}, {{ match.address.suite }} <br />
            {{ match.address.city }}, {{ match.address.zipcode }}
          </li>
          <li>
            <span class="employee__header">Phone: </span>{{ match.phone }}
          </li>
          <li>
            <span class="employee__header">Website: </span>{{ match.website }}
          </li>
          <li>
            <span class="employee__header">Company: </span
            >{{ match.company.name }}
          </li>
          <li>
            <span class="employee__header">Catch Phrase: </span
            >{{ match.company.catchPhrase }}
          </li>
          <li>
            <span class="employee__header">Job Description: </span
            >{{ match.company.bs }}
          </li>
        </ul>
      </div>

      <div class="employee__image"> <!-- placeholder image, if img were available in api --> 
        <figure v-lazyload>

          <img
            :data-url="imgUrl"
            class="employee__img"
            alt=""
          />
                    <ImageSpinner class="image__spinner" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ImageSpinner from './ImageSpinner.vue';
import LazyLoadDirective from "../directives/LazyLoadDirective";

export default {
  directives: {
    lazyload: LazyLoadDirective
  },
  name: "ImageItem",
  components: {
    ImageSpinner
  },
  props: {
    source: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      // data function that establishes initial reactive state of component instance
      matches: [], // no uses of reactivity api or vuex due to size/simplicity of app
      options: [],
      selectedOption: null,
      errored: false,
      imgUrl: '',
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
          this.team = result.data; // instantiates team to result.data; instantiation with this keyword occurs throught the app

          let matches = [];
          this.team.filter((teamMember) => {
            teamMember.name === input ? matches.push(teamMember) : "no";
          });
          this.matches = matches;
          this.imgUrl = 'https://picsum.photos/600/415';
          console.log(this.matches, "im matches");
        })
        .catch(
          (
            error // basic api error handling, tracks error state
          ) => console.log(error),
          (this.errored = true)
        );
    },
    loadOptions: async function () {
      // async, await to enable asynchronous, promise-based behavior to improve readibility and consistency across app
      const url = "https://jsonplaceholder.typicode.com/users";
      await axios
        .get(url)
        .then((options) => {
          this.options = options.data;
          console.log(this.options);
        })
        .catch(
          (
            error // basic api error handling, tracks error state
          ) => console.log(error),
          (this.errored = true)
        );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.employee {
  max-width: 1200px;
  margin: 6rem auto 2rem;

  figure {
    margin-inline-start: 0rem;
    margin-inline-end: 0rem;
  }

  h1 {
    margin-block-start: 0em;
  }

  li {
    list-style-type: none;
    padding: 5px 0px 10px;
    text-transform: capitalize;
  }

  ul {
    padding-inline-start: 0em;
  }

  select {
    font: 400 12px/1.3;
    -webkit-appearance: none;
    font-weight: bold;
    appearance: none;
    color: var(--baseFg);
    border: 1px solid var(--baseFg);
    line-height: 1;
    outline: 0;
    padding: 0.65em 2.5em 0.55em 0.75em;
    border-radius: var(--radius);
    background-color: var(--baseBg);
    background-image: linear-gradient(var(--baseFg), var(--baseFg)),
      linear-gradient(-135deg, transparent 50%, var(--accentBg) 50%),
      linear-gradient(-225deg, transparent 50%, var(--accentBg) 50%),
      linear-gradient(var(--accentBg) 42%, var(--accentFg) 42%);
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
    background-size: 1px 100%, 20px 22px, 20px 22px, 20px 100%;
    background-position: right 20px center, right bottom, right bottom,
      right bottom;
  }

  &__header {
    font-weight: bold;
    display: block;
    padding: 0rem 0rem 0.25rem;
  }

  &__img {
    border-radius: 25px;
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 3;
  }

  &__image {
    @media screen and (max-width: 1050px) {
      order: 1;
      margin: 0rem;
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 1050px) {
      flex-wrap: wrap;
      margin: 0rem 1rem;
    }
  }

  &__name {
    color: #4741b8;
  }

  &__pink-theme {
    --radius: 25px;
    --baseFg: #4741b8;
    --baseBg: #fff;
    --accentFg: #4741b8;
    --accentBg: #fff;
  }

  &__select {
    margin: 2rem 0rem 3rem;

    @media screen and (max-width: 1050px) {
      margin: 2rem 1rem 3rem;
    }
  }

  &__text {
    @media screen and (max-width: 1050px) {
      flex: 0 0 100%;
      order: 2;
    }
  }
}
</style>
