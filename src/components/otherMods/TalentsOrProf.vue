<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Extras</h5>
        <form>
          <div class="mb-3">
            <input v-model="state.ranks" @focusout="zeroValidation(state.ranks, validChecks, 'ranks')"
              v-on:keypress="numbersOnly" type="number" class="form-control"
              :class="validChecks.ranks ? '' : 'is-invalid'" id="ranks">
            <div id="validationranks" class="invalid-feedback">
              Must have value of at least 0.
            </div>
            <div class="form-text">Ranks in Spell List</div>
          </div>
          <div class="mb-3">
            <input v-model="state.items" @focusout="zeroValidation(state.items, validChecks, 'items')"
              v-on:keypress="numbersOnly" type="number" class="form-control"
              :class="validChecks.items ? '' : 'is-invalid'" id="items">
            <div id="validationitems" class="invalid-feedback">
              Must have value of at least 0.
            </div>
            <div class="form-text">Items</div>
          </div>
          <div class="mb-3">
            <input v-model="state.talents" @focusout="zeroValidation(state.talents, validChecks, 'talents')"
              v-on:keypress="numbersOnly" type="number" class="form-control"
              :class="validChecks.talents ? '' : 'is-invalid'" id="talents">
            <div id="validationtalents" class="invalid-feedback">
              Must have value of at least 0.
            </div>
            <div class="form-text">Talents/Professions</div>
          </div>
          <div class="mb-3">
            <input v-model="state.penalties" @focusout="zeroValidation(state.penalties, validChecks, 'penalties')"
              v-on:keypress="numbersOnly" type="number" class="form-control"
              :class="validChecks.penalties ? '' : 'is-invalid'" id="penalties">
            <div id="validationpenalties" class="invalid-feedback">
              Must have value of at least 0.
            </div>
            <div class="form-text">Penalties (put positive numbers in)</div>
          </div>
          <div class="mb-3">
            <input type="checkbox" id="eloquence" v-model="state.eloquence" />
            <label class="left-margin-5" for="eloquence"> Eloquence</label>
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
import { useValidation } from '../../helpers/validation.js';

export default {
  name: 'TalentsOrProf',
  props: { 
    characterId: String
  },
  setup(props) {
    const myCharacter = userCharacter();
    const state = reactive({ 
        result: 0,
        items: 0,
        talents: 0,
        penalties: 0,
        ranks: 0,
        eloquence: false
    });
    const validChecks = reactive({
      items: true,
      talents: true,
      penalties: true,
      ranks: true
    }); 
    const { numbersOnly, zeroValidation } = useValidation();
    const modAccess = "extras";


    watch(
      () => [state.items, state.talents, state.penalties, state.eloquence, state.ranks],
      () => {
        if (state.items !== "") {
          validChecks.items = true;
        }
        if (state.talents !== "") {
          validChecks.talents = true;
        }
        if (state.penalties !== "") {
          validChecks.penalties = true;
        }
        if (state.ranks !== "") {
          validChecks.ranks = true;
        }
        if (state.ranks !== "" && state.ranks !== undefined && state.talents !== "" && state.talents !== undefined && state.items !== "" && state.items !== undefined && state.penalties !== "" && state.penalties !== undefined) {
          state.talents = parseInt(state.talents, 10)
          state.items = parseInt(state.items, 10)
          state.penalties = parseInt(state.penalties, 10)
          state.ranks = parseInt(state.ranks, 10)
          myCharacter.setExtras(modAccess, state.items, state.talents, state.penalties, state.eloquence, state.ranks, props.characterId);
          initComponent()
        }
      }
    )

    const calcMod = () => {
      state.result = parseFloat(state.items) + parseFloat(state.talents) + parseFloat(state.ranks) - parseFloat(state.penalties);
      state.result = state.eloquence ? state.result + 25 : state.result;
      addModifierTotal(state.result + parseFloat(myCharacter.getValue(props.characterId, "oldExtras") * -1));
      myCharacter.setValue("oldExtras", state.result, props.characterId);
    };

    const addModifierTotal = (modValue) => {
      myCharacter.setNew(myCharacter.total(props.characterId) + modValue, props.characterId); 
    };

    function setModifier() {
      calcMod();
    }

    const initComponent = async () => {
      let spellPrepObj = myCharacter.getSpellModObj(props.characterId, modAccess);
      state.items = spellPrepObj.items;
      state.talents = spellPrepObj.talents;
      state.penalties = spellPrepObj.penalties;
      state.eloquence = spellPrepObj.eloquence;
      state.ranks = spellPrepObj.ranks;
      setModifier();
    }

    onMounted(initComponent)

    window.stores = { myCharacter };

    return {
      addModifierTotal,
      setModifier,
      calcMod,
      state,
      myCharacter,
      numbersOnly,
      validChecks,
      zeroValidation
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
