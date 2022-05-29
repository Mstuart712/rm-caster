<template>
  <div>
    <div class="card" style="max-width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Result Box</h5>
            <form @submit.prevent="addNewSpellTotal">
                <div class="mb-3">
                    <label for="spellInput" class="form-label">Spell Total</label>
                    <input v-model="newTotal" type="string" class="form-control" id="spellInput" aria-describedby="resultHelp">
                    <div id="resultHelp" class="form-text">Final modified spell number.</div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import { useCharacterLoader } from './character/CharacterLoader.js'

export default {
  name: 'ResultBox',
  props: { 
    characterId: String
  },
  setup(props) {
    const { getSpellModTotal, setNewModByCharacterId, getModifiedTotal } = useCharacterLoader();
    const widgetReady = false;
    const newTotal = 0;

    function addNewSpellTotal() {
      setNewModByCharacterId(props.characterId, getSpellModTotal(props.characterId) + parseFloat(this.newTotal) + parseFloat(50))
      console.log("mod total: ", getSpellModTotal(props.characterId))
      console.log("mod total: ", getModifiedTotal(props.characterId))
    }

    return {
      addNewSpellTotal,
      widgetReady,
      newTotal
    };
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
