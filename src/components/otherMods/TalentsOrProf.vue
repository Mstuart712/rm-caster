<template>
  <div>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Extras</h5>
            <form>
                <div class="mb-3">
                    <input v-model="state.items" v-on:keypress="numbersOnly" type="number" class="form-control" id="items">
                    <div class="form-text">Items</div>
                </div>
                <div class="mb-3">
                    <input v-model="state.talents" v-on:keypress="numbersOnly" type="number" class="form-control" id="talents">
                    <div class="form-text">Talents/Professions</div>
                </div>
                <div class="mb-3">
                    <input v-model="state.penalties" v-on:keypress="numbersOnly" type="number" class="form-control" id="penalties">
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
        eloquence: false
     });
    const { numbersOnly, defaultNullToZero } = useValidation();
    const modAccess = "extras";


    watch(
      () => [state.items, state.talents, state.penalties, state.eloquence],
      () => {
        if(state.talents == "" || state.talents == undefined) {
          state.talents = 0;
        }
        if(state.items == "" || state.items == undefined) {
          state.items = 0;
        }
        if(state.penalties == "" || state.penalties == undefined) {
          state.penalties = 0;
        }
        myCharacter.setExtras(modAccess, state.items, state.talents, state.penalties, state.eloquence, props.characterId);
        initComponent()
      }
    )

    const calcMod = () => {
      state.result = parseFloat(state.items) + parseFloat(state.talents) - parseFloat(state.penalties);
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
      defaultNullToZero
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
