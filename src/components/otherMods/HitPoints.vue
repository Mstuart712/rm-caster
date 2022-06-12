<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Hit Points</h5>
        <form>
          <div class="mb-3">
            <input v-model="totalHPLeft.result" @focusout="atLeastZeroValidation(totalHPLeft)" v-on:keypress="
            numbersOnly" type="string" class="form-control" :class="totalHPLeft.isValid ? '' : 'is-invalid'"
              id="hpLeft">
            <div id="validationhpLeft" class="invalid-feedback">
              Must have value of at least 0.
            </div>
            <div class="form-text">Total Hit Points Left.</div>
          </div>
          <div class="mb-3">
            <input v-model="totalHP.result" @focusout="atLeastZeroValidation(totalHP)" v-on:keypress=" numbersOnly"
              type="string" class="form-control" :class="totalHP.isValid ? '' : 'is-invalid'" id="hpTotal">
            <div id="validationhpTotal" class="invalid-feedback">
              Must have value of at least 0.
            </div>
            <div class="form-text">Total Hit Points.</div>
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
  name: 'HitPoints',
  props: { 
    hitPoints: Object,
    characterId: String
  },
  setup(props) {
    const state = reactive({ result: 0 });
    const modAccess = "hitPoints";
    const totalHPLeft = reactive({
      result: 0,
      isValid: true
    });
    const totalHP = reactive({
      result: 0,
      isValid: true
    });
    const hpPercent = reactive({ result: 0 });
    const { setSpellModTotals, getSpellModObj, findCharacter, setNewByCharacterId, getSpellModTotal, getOldSpellMod, setOldModByCharacterId } = useCharacterLoader();
    const { numbersOnly, atLeastZeroValidation } = useValidation();
    const currentCharacter = findCharacter(props.characterId)

    watch(
      () => [totalHPLeft.result, totalHP.result],
      () => {
        if (totalHPLeft.result !== "") {
          totalHPLeft.isValid = true;
        }
        if (totalHP.result !== "") {
          totalHP.isValid = true;
        }
        if (totalHP.result !== "" && totalHP.result !== undefined && totalHPLeft.result !== "" && totalHPLeft.result !== undefined) {
          totalHP.result = parseInt(totalHP.result, 10)
          totalHPLeft.result = parseInt(totalHPLeft.result, 10)
          setSpellModTotals(modAccess, totalHP.result, totalHPLeft.result, props.characterId);
          initComponent()
        }
      }
    )

    const calcMod = (newHpPercent) => {
      newHpPercent = Math.round(newHpPercent)
      for(const item of props.hitPoints.tableList) {
        if(newHpPercent >= item.min && newHpPercent <= item.max){
            state.result = item.modifiers[currentCharacter.casterTypeIndex];
        } else if(newHpPercent < 26) {
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
      setSpellModTotals(modAccess, totalHP.result, totalHPLeft.result, props.characterId);
      hpPercent.result = 100 - (100 * totalHPLeft.result)/totalHP.result;
      calcMod(parseFloat(hpPercent.result))
    }

    const initComponent = async () => {
      let hitPointState = getSpellModObj(props.characterId, modAccess);
      if(hitPointState.total != null && hitPointState.totalLeft != null) {
        totalHP.result = hitPointState.total
        totalHPLeft.result = hitPointState.totalLeft
        setModifier();
      }
    }

    onMounted(initComponent)

    return {
      setModifier,
      calcMod,
      state,
      totalHPLeft,
      totalHP,
      hpPercent,
      setModifier,
      numbersOnly,
      atLeastZeroValidation
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
