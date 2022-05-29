<template>
  <div>
    <div class="container">
      <h1>Character Dashboard</h1>
      <div class="card" style="width: 18rem;">
          <div class="card-body">
              <h5 class="card-title">Character Menu</h5>
              <ul class="list-group">
                <li @click="editStats()" class="list-group-item link-hover">Edit Character</li>
                <li @click="castSpells()" class="list-group-item link-hover">Spell Casting</li>
              </ul>
          </div>
      </div>
    </div>
    <div class="container">
        <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

export default {
  name: 'CharacterDash',
  props: {
    id: String,
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter()

    //This should be refactored whenever I figureout how the vue router works
    function castSpells() {
      router.push({ path: '/character/' + route.params.id + '/cast-spells' })
    }

    function editStats() {
      router.push({ path: '/character/' + route.params.id + '/edit-stats' })
    }

    return {
      castSpells,
      editStats
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .link-hover {
    cursor: pointer;
  }
</style>
