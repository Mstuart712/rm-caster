<template>
  <div>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Hit Points</h5>
            <form @submit.prevent="setModifier">
                <div class="mb-3">
                    <input v-model="totalHPLeft.result" type="string" class="form-control" id="hpLeft">
                    <div class="form-text">Total Hit Points Left.</div>
                </div>
                <div class="mb-3">
                    <input v-model="totalHP.result" type="string" class="form-control" id="hpTotal">
                    <div class="form-text">Total Hit Points.</div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <span class="badge bg-danger">{{state.result}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { useCharacterLoader } from '../character/CharacterLoader.js'

export default {
  name: 'HitPoints',
  props: { 
    hitPoints: Object,
    characterId: String
  },
  setup(props) {
    const state = reactive({ result: 0 });
    const modAccess = "hitPoints";
    const totalHPLeft = reactive({ result: 0 });
    const totalHP = reactive({ result: 0 });
    const hpPercent = reactive({ result: 0 });
    const { setSpellModTotals, getSpellModObj, findCharacter, setNewByCharacterId, getSpellModTotal, getOldSpellMod, setOldModByCharacterId } = useCharacterLoader();
    const currentCharacter = findCharacter(props.characterId)

    const calcMod = (newHpPercent) => {
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
      setModifier
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
