<template>
  <div>
    <div class="card">
        <div class="card-body">
            <form @submit.prevent="setStats">
                <div class="row">
                  <div class="col-lg-1">
                    <input v-model="state.level" type="string" class="form-control" id="level">
                    <div class="form-text">Level</div>
                  </div>
                </div>
                <div class="row">
                  <h5 class="card-title">Stats</h5>
                  <div class="col-lg-1">
                      <input v-model="state.stats.agility" type="string" class="form-control" id="agility">
                      <div class="form-text">Ag</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.constitution" type="string" class="form-control" id="constitution">
                      <div class="form-text">Co</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.memory" type="string" class="form-control" id="memory">
                      <div class="form-text">Me</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.reasoning" type="string" class="form-control" id="reasoning">
                      <div class="form-text">Re</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.selfDiscipline" type="string" class="form-control" id="selfDiscipline">
                      <div class="form-text">SD</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.empathy" type="string" class="form-control" id="empathy">
                      <div class="form-text">Em</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.intuition" type="string" class="form-control" id="intuition">
                      <div class="form-text">In</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.presence" type="string" class="form-control" id="presence">
                      <div class="form-text">Pr</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.quickness" type="string" class="form-control" id="quickness">
                      <div class="form-text">Qu</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.strength" type="string" class="form-control" id="strength">
                      <div class="form-text">St</div>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <span class="badge bg-danger">{{state.result}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import { userCharacter } from '../../stores/character';
import { reactive } from 'vue'
import { Stats } from '../../generics/statsClass.js'

let myStats = new Stats("0","0","0","0","0","0","0","0","0","0");

export default {
  name: 'Stats',
  props: { 
    id: String,
  },
  setup(props) {
    const myCharacter = userCharacter();
    const state = reactive({ 
      result: 0,
      stats: myStats,
      level: 1
     })
    const newTotal = 0;
    const oldMod = 0;
    
    if(props.id != null) {
      state.stats = { ...state.stats, ...myCharacter.getCharacterById(props.id).stats};
      state.level = myCharacter.getValue(props.id, "level");
    }

    function addNewSpellTotal(modValue) {
      spellTotal.setNew(spellTotal.total + modValue);
    }

    function setStats() {
      myCharacter.setValue("level", state.level, props.id)
      myCharacter.setNewStats(state.stats, props.id)
    }

    function calculateMod(ppPercent) {
      for(const item of props.powerPoints.tableList) {
        if(ppPercent >= item.min && ppPercent <= item.max){
            state.result = item.modifiers[0];
        } else if(ppPercent < 26) {
            state.result = 0;
        }
      }
      this.addNewSpellTotal(state.result + parseFloat(this.oldMod * -1));
      this.oldMod = state.result;
    }

    window.stores = { myCharacter };

    return {
      myCharacter,
      addNewSpellTotal,
      setStats,
      calculateMod,
      newTotal,
      state,
      oldMod
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>