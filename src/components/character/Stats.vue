<template>
  <div>
    <div class="card">
        <div class="card-body">
            <form @submit.prevent="setStats">
                <div class="row">
                  <div class="col-lg-3">
                    <input v-model="state.name" type="string" class="form-control" id="cname">
                    <div class="form-text">Name</div>
                  </div>
                  <div class="col-lg-1">
                    <input v-model="state.level" type="string" class="form-control" id="level">
                    <div class="form-text">Level</div>
                  </div>
                </div>
                <div class="row margin-top-10">
                  <h5 class="card-title">Stats</h5>
                  <div class="form-text">Add total bonus for each stat</div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.agility" type="number" class="form-control" id="agility">
                      <div class="form-text">Ag</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.constitution" type="number" class="form-control" id="constitution">
                      <div class="form-text">Co</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.memory" type="number" class="form-control" id="memory">
                      <div class="form-text">Me</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.reasoning" type="number" class="form-control" id="reasoning">
                      <div class="form-text">Re</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.selfDiscipline" type="number" class="form-control" id="selfDiscipline">
                      <div class="form-text">SD</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.empathy" type="number" class="form-control" id="empathy">
                      <div class="form-text">Em</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.intuition" type="number" class="form-control" id="intuition">
                      <div class="form-text">In</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.presence" type="number" class="form-control" id="presence">
                      <div class="form-text">Pr</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.quickness" type="number" class="form-control" id="quickness">
                      <div class="form-text">Qu</div>
                  </div>
                  <div class="col-lg-1">
                      <input v-model="state.stats.strength" type="number" class="form-control" id="strength">
                      <div class="form-text">St</div>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary margin-top-10">Submit</button>
            </form>
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
      level: 1,
      name: "valnar jr"
     })
    const newTotal = 0;
    const oldMod = 0;
    
    if(props.id != null) {
      state.stats = { ...state.stats, ...myCharacter.getCharacterById(props.id).stats};
      state.level = myCharacter.getValue(props.id, "level");
      state.name = myCharacter.getValue(props.id, "name");
    }

    function addNewSpellTotal(modValue) {
      spellTotal.setNew(spellTotal.total + modValue);
    }

    function setStats() {
      var isValid = this.validate();
      if(isValid) {
        myCharacter.setValue("level", state.level, props.id)
        myCharacter.setValue("name", state.name, props.id)
        myCharacter.setNewStats(state.stats, props.id)
      }else {
        console.log("not valid");
      }
    }

    function validate() {
      for (const item in state.stats) {
        if(state.stats[item] == "" || state.stats[item] == undefined) {
          state.stats[item] = 0;
        }
      }
      if(state.level == "" || state.level == undefined) {
        state.level = 1;
      }
      return true;
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
      oldMod,
      validate
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.margin-top-10 {
  margin-top: 10px;
}
.card-title {
  margin-bottom: 0;
}
</style>