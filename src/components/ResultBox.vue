<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Dice Roll</h5>
        <form @submit.prevent="addNewSpellTotal">
          <div class="mb-3">
            <input v-model="state.newTotal" type="string" class="form-control" id="spellInput"
              aria-describedby="resultHelp" autocomplete="off">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          <button class="btn btn-danger margin-left-10" @click="reset">Reset</button>
        </form>
        <br>
        <span>Bonus Before Dice Roll: {{state.bonus}}</span>
        <br>
        <span>Dice Roll Needed: {{getDiceNeeded(state.bonus)}}</span>
        <br>
        <span>Chance Of Success: {{getSuccessChance(state.bonus)}}%</span>
        <br>
        <span>Result: {{state.result}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useCharacterLoader } from './character/CharacterLoader.js'
import { reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: 'ResultBox',
  props: { 
    characterId: String
  },
  setup(props) {
    const { findCharacter, getSpellModTotal, setNewModByCharacterId, getModifiedTotal, resetOldMods } = useCharacterLoader();
    const widgetReady = false;
    const currentCharacter = findCharacter(props.characterId)
    const router = useRouter();
    const state = reactive({ 
      bonus: 0,
      result: 0,
      newTotal: 0
    });

    watch(
      () => [currentCharacter.spellMods.rawTotal, currentCharacter.spellMods.modifiedTotal],
      () => {
        if(state.newTotal == "" || state.newTotal == undefined) {
          state.newTotal = 0;
        }
        initComponent()
      }
    )

    function reset() {
      resetOldMods(props.characterId)
      router.go(0)
    }

    function addNewSpellTotal() {
      if(state.newTotal == "" || state.newTotal == undefined) {
        state.newTotal = 0;
      }
      setNewModByCharacterId(props.characterId, getSpellModTotal(props.characterId) + parseFloat(state.newTotal) + parseFloat(50))
      console.log("raw total: ", getSpellModTotal(props.characterId));
      console.log("mod total: ", getModifiedTotal(props.characterId));
      
      if(state.newTotal == 66) {
        this.toast.error("Unusual Event Was Rolled " + state.newTotal);
      } else if(state.newTotal == 100) {
        this.toast.info("Unusual Success Was Rolled " + state.newTotal);
      } else {
        this.toast.success("Spell Submitted With " + getModifiedTotal(props.characterId));
      }
    }
    function getDiceNeeded(bonus) {
      let total = 111 - bonus;
      return total;
    }
    function getSuccessChance(bonus) {
      let total = 111 - bonus;
      total = 100 - total;
      total = percentage(total, 100)
      if(total < 1) {
        return 'Dont do it'
      }
      return total;
    }
    function percentage(partialValue, totalValue) {
      return (100 * partialValue) / totalValue;
    } 

    const initComponent = async () => {
      state.bonus = getSpellModTotal(props.characterId) + parseFloat(50);
      state.result = getModifiedTotal(props.characterId);
    }

    onMounted(initComponent)

    return {
      addNewSpellTotal,
      widgetReady,
      state,
      reset,
      toast,
      getSuccessChance,
      getDiceNeeded
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.margin-left-10 {
  margin-left: 10px;
}
</style>
