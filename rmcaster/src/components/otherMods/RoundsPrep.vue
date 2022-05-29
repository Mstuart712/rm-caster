<template>
  <div>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Level - Spell</h5>
            <form @submit.prevent="setModifier">
                <div class="mb-3">
                    <input v-model="state.spellLevel" type="string" class="form-control" id="spellLevel">
                    <div class="form-text">Spell Level.</div>
                </div>
                <div class="mb-3">
                    <input v-model="state.roundsOfPrep" type="string" class="form-control" id="roundsOfPrep">
                    <div class="form-text">Rounds of Prep.</div>
                </div>
                <div class="mb-3">
                  <input type="checkbox" id="isInstant" v-model="state.isInstant" />
                  <label for="isInstant"> Instant Cast</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <span class="badge bg-danger">{{state.result}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, watch } from 'vue'
import { userCharacter } from '../../stores/character';
import prepRounds from '../../assets/prepRounds.json'

export default {
  name: 'RoundsPrep',
  props: { 
    characterId: String
  },
  setup(props) {
    const myCharacter = userCharacter();
    const state = reactive({ 
        result: 0,
        level: myCharacter.getValue(props.characterId, "level"),
        spellLevel: 0,
        difference: 0,
        isInstant: false,
        roundsOfPrep: 0
     });
    const currentSelection = reactive({ result: "Spell Level" });

    const spellDiff = () => {
      return parseFloat(state.level) - parseFloat(state.spellLevel);
    };

    const calcMod = () => {
      let difference = state.difference > 9 ? 9 : state.difference;
      let prep = state.roundsOfPrep > 9 ? 9 : state.roundsOfPrep;

      if(difference < -21) {
        difference = -21;
      }

      if(prep < 0) {
        prep = 0;
      }
      
      if (state.isInstant) {
        state.result = prepRounds.results.instantCast.modifiers[difference + 21][0];
      } else {
        state.result = prepRounds.results.nonInstantCast.modifiers[difference + 21][prep];
      }
      addModifierTotal(state.result + parseFloat(myCharacter.getValue(props.characterId, "oldRoundsPreppedMod") * -1));
      myCharacter.setValue("oldRoundsPreppedMod", state.result, props.characterId);
    };

    const addModifierTotal = (modValue) => {
      myCharacter.setNew(myCharacter.total(props.characterId) + modValue, props.characterId); 
    };

    function setModifier() {
      state.difference = spellDiff();
      calcMod();
    }

    const initComponent = async () => {
      setModifier();
    }

    onMounted(initComponent)

    window.stores = { myCharacter };

    return {
      addModifierTotal,
      setModifier,
      calcMod,
      state,
      currentSelection,
      myCharacter,
      spellDiff
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.spell-types {
    min-width: 250px;
    margin-bottom: 10px;
}
</style>
