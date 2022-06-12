<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Power Points</h5>
        <form>
          <div class="mb-3">
            <input v-model="totalPPLeft.result" @focusout="atLeastZeroValidation(totalPPLeft)"
              v-on:keypress="numbersOnly" type="string" class="form-control"
              :class="totalPPLeft.isValid ? '' : 'is-invalid'" id="ppLeft">
            <div id="validationppLeft" class="invalid-feedback">
              Must have value of at least 0.
            </div>
            <div class="form-text">Total Power Points Left.</div>
          </div>
          <div class="mb-3">
            <input v-model="totalPP.result" @focusout="atLeastZeroValidation(totalPP)" v-on:keypress="numbersOnly"
              type="string" class="form-control" :class="totalPP.isValid ? '' : 'is-invalid'" id="ppTotal">
            <div id="validationppTotal" class="invalid-feedback">
              Must have value of at least 0.
            </div>
            <div class="form-text">Total Power Points.</div>
          </div>
        </form>
        <span class="badge bg-danger">{{state.result}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, watch } from 'vue'
import { useCharacterLoader } from '../character/CharacterLoader.js'
import { useValidation } from '../../helpers/validation.js';

export default {
  name: 'PowerPointsUsed',
  props: { 
    powerPoints: Object,
    characterId: String
  },
  setup(props) {
    const modAccess = "powerPoints";
    const state = reactive({ result: 0 })
    const totalPPLeft = reactive({
      result: 0,
      isValid: true
    });
    const totalPP = reactive({
      result: 0,
      isValid: true
    });
    const ppPercent = reactive({ result: 0 });
    const { setSpellModTotals, getSpellModObj, findCharacter, setNewByCharacterId, getSpellModTotal, getOldSpellMod, setOldModByCharacterId } = useCharacterLoader();
    const { numbersOnly, atLeastZeroValidation } = useValidation();
    const currentCharacter = findCharacter(props.characterId)

    watch(
      () => [totalPPLeft.result, totalPP.result],
      () => {
        if (totalPPLeft.result !== "") {
          totalPPLeft.isValid = true;
        }
        if (totalPP.result !== "") {
          totalPP.isValid = true;
        }
        if (totalPPLeft.result !== "" && totalPPLeft.result !== undefined && totalPP.result !== "" && totalPP.result !== undefined) {
          setSpellModTotals(modAccess, totalPP.result, totalPPLeft.result, props.characterId);
          initComponent();
        }
      }
    )

    const calcMod = (newPpPercent) => {
      newPpPercent = Math.round(newPpPercent)
      for(const item of props.powerPoints.tableList) {
        if(newPpPercent >= item.min && newPpPercent <= item.max){
            state.result = item.modifiers[currentCharacter.casterTypeIndex];
        } else if(newPpPercent < 26) {
            state.result = 0;
        }
      }
      addModifierTotal(state.result + parseFloat(getOldSpellMod(props.characterId, modAccess) * -1));
      setOldModByCharacterId(modAccess, state.result, props.characterId);
    };
    
    const addModifierTotal = (modValue) => {
      setNewByCharacterId(props.characterId, getSpellModTotal(props.characterId) + modValue);
    };

    const setModifier = () => {
      setSpellModTotals(modAccess, totalPP.result, totalPPLeft.result, props.characterId);
      ppPercent.result = 100 - (100 * totalPPLeft.result)/totalPP.result;
      calcMod(parseFloat(ppPercent.result))
    }

    const initComponent = async () => {
      let powerPointState = getSpellModObj(props.characterId, modAccess);
      if(powerPointState.total != null && powerPointState.totalLeft != null) {
        totalPP.result = powerPointState.total
        totalPPLeft.result = powerPointState.totalLeft
        setModifier();
      }
    }

    onMounted(initComponent)

    return {
      setModifier,
      calcMod,
      state,
      totalPPLeft,
      totalPP,
      ppPercent,
      numbersOnly,
      atLeastZeroValidation
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
