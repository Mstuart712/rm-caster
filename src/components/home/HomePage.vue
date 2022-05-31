<template>
  <div>
      <h1>Home Page</h1>
      <button @click="createCharacter()" type="button" class="btn btn-primary margin-bottom-10">Create Character</button>
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-12 margin-bottom-10" v-for="character in myCharacter.characters" :key="character.id">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{character.name}}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Level: {{character.level}}</h6>
              <p class="card-text"></p>
              <button @click="editCharacter(character.id)" type="button" class="btn btn-primary btn-sm margin-right-10">Edit</button>
              <button @click="deleteCharacter(character.id)" type="button" class="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { userCharacter } from '../../stores/character';
import { reactive } from 'vue';
import router from '../../router';

export default {
  name: 'HomePage',
  props: {  },
  setup() {
    const myCharacter = userCharacter();
    const state = reactive({ result: 0 });
    const currentSelection = reactive({ result: "Free Hands" });
    

    function createCharacter() {
      const newCharId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      myCharacter.create(newCharId);
    }

    function deleteCharacter(index) {
      myCharacter.remove(index);
    }

    function editCharacter(index) {
      router.push({ path: '/character/' + index + '/edit-stats' })
    }

    window.stores = { myCharacter };

    return {
      myCharacter,
      createCharacter,
      deleteCharacter,
      editCharacter,
      state,
      currentSelection
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .margin-right-10 {
    margin-right: 10px;
  }
  .margin-bottom-10 {
    margin-bottom: 10px;
  }
</style>
