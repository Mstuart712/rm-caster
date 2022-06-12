<template>
  <div>
    <div class="container">
      <div class="card" style="width: 24rem;">
        <div class="card-body">
          <h5 class="card-title">Character Menu</h5>
          <ul class="list-group list-group-horizontal">
            <li @click="editStats()" class="list-group-item link-hover">Edit Character</li>
            <li @click="castSpells()" class="list-group-item link-hover">Spell Casting</li>
            <li @click="fastAttack()" class="list-group-item link-hover">Fast Attack</li>
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

    function fastAttack() {
      router.push({ path: '/character/' + route.params.id + '/fast-attack' })
    }

    return {
      castSpells,
      editStats,
      fastAttack
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .link-hover {
    cursor: pointer;
  }
  .container {
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>
