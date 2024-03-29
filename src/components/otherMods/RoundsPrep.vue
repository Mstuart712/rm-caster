<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Level - Spell</h5>
        <form>
          <div class="mb-3">
            <input v-model="state.spellLevel" @focusout="zeroValidation(state.spellLevel, validChecks, 'spellLevel')"
              v-on:keypress="numbersOnly" type="string" class="form-control"
              :class="validChecks.spellLevel ? '' : 'is-invalid'" id="spellLevel">
            <div id="validationspellLevel" class="invalid-feedback">
              Must have value of at least 0.
            </div>
            <div class="form-text">Spell Level.</div>
          </div>
          <div class="mb-3">
            <input v-model="state.roundsOfPrep"
              @focusout="zeroValidation(state.roundsOfPrep, validChecks, 'roundsOfPrep')" v-on:keypress="numbersOnly"
              type="string" class="form-control" :class="validChecks.roundsOfPrep ? '' : 'is-invalid'"
              id="roundsOfPrep">
            <div id="validationroundsOfPrep" class="invalid-feedback">
              Must have value of at least 0.
            </div>
            <div class="form-text">Rounds of Prep.</div>
          </div>
          <div class="mb-3">
            <input type="checkbox" id="isInstant" v-model="state.isInstant" />
            <label class="left-margin-5" for="isInstant"> Instant Cast</label>
          </div>
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
import { useValidation } from '../../helpers/validation.js';

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
    const validChecks = reactive({
      spellLevel: true,
      roundsOfPrep: true
    }); 
    const { numbersOnly, zeroValidation } = useValidation();
    const currentSelection = reactive({ result: "Spell Level" });
    const modAccess = "spellPrep";


    watch(
      () => [state.spellLevel, state.isInstant, state.roundsOfPrep],
      () => {
        if (state.spellLevel !== "") {
          validChecks.spellLevel = true;
        }
        if (state.roundsOfPrep !== "") {
          validChecks.roundsOfPrep = true;
        }
        if (state.spellLevel !== "" && state.spellLevel !== undefined && state.roundsOfPrep !== "" && state.roundsOfPrep !== undefined) {
          state.spellLevel = parseInt(state.spellLevel, 10)
          state.roundsOfPrep = parseInt(state.roundsOfPrep, 10)
          myCharacter.setSpellPrep(modAccess, state.spellLevel, state.roundsOfPrep, state.isInstant, props.characterId);
          initComponent()
        }
      }
    )

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
      let spellPrepObj = myCharacter.getSpellModObj(props.characterId, modAccess);
      state.isInstant = spellPrepObj.isInstant;
      state.roundsOfPrep = spellPrepObj.roundsPrep;
      state.spellLevel = spellPrepObj.spellLevel;
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
      spellDiff,
      numbersOnly,
      zeroValidation,
      validChecks
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
.left-margin-5 {
  margin-left: 5px;
}
</style>
