<template>
  <div v-if="widgetReady">
    <div class="row">
      <div class="col-lg-12">
        <h3>Edit Stats</h3>
        <stats :id="id"></stats>
      </div>
    </div>
  </div>
</template>

<script>
import modifications from '../../assets/modifications.json'
import characterMods from '../../assets/character.json'
import CasterType from './CasterType.vue'
import Stats from './Stats.vue'

export default {
  name: 'CharacterEdit',
  components: { Stats, CasterType },
  props: {  },
  data() { 
    return {
      widgetReady: false,
      mods: modifications,
      myCharacter: characterMods,
      id: ""
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.widgetReady = true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
