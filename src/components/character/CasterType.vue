<template>
  <div class="mod-container">
    <h6 class="card-title">Spell Type</h6>
    <div class="btn-group spell-types">
        <div class="row">
            <div class="col-lg-12">
              <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {{currentSelection.result}}
              </button>
              <ul class="dropdown-menu">
                <li v-for="item, index in types" :key="item.title">
                    <button @click="setModifier(index)" class="dropdown-item" href="#">{{item.title}}</button>
                </li>
              </ul>
            </div>
            <div class="col-lg-12">
              <span class="badge bg-danger">{{state.result}}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { useCharacterLoader } from '../character/CharacterLoader.js'

export default {
  name: 'CasterType',
  props: { 
    casterType: Object,
    id: String,
  },
  setup(props) {
    const state = reactive({ result: 0 });
    const types = props.casterType.tableList;
    const modAccess = "casterTypeIndex";
    const { findCharacter, setCasterTypeByCharacterId, getSpellModTotal, setNewByCharacterId, setOldCasterModByCharacterId, getOldCasterTypeMod } = useCharacterLoader();
    const currentCharacter = findCharacter(props.id);
    let oldValue = null;
    let casterTypeResult = oldValue ? oldValue : 'Caster Type'
    const currentSelection = reactive({ result: casterTypeResult });

    function setModifier(index) {
      this.currentSelection.result = props.casterType.tableList[index].title;
      calcMod(index)
      setCasterTypeByCharacterId(index, props.id);
    }

    const calcMod = (index) => {
      switch (index) {
        case 0:
          state.result = parseFloat(currentCharacter.stats.intuition);
          break;
        case 1:
          state.result = parseFloat(currentCharacter.stats.empathy);
          break;
        case 2:
          state.result = parseFloat(currentCharacter.stats.presence);
          break;
        case 3:
          let average = parseFloat(currentCharacter.stats.intuition) + parseFloat(currentCharacter.stats.empathy) + parseFloat(currentCharacter.stats.presence);
          state.result = Math.round(average/3);
          break;
      }
      addModifierTotal(parseFloat(state.result) + parseFloat(getOldCasterTypeMod(props.id) * -1));
      setOldCasterModByCharacterId(parseFloat(state.result), props.id);
    };

    const addModifierTotal = (modValue) => {
      setNewByCharacterId(props.id, getSpellModTotal(props.id) + modValue);
    };

    const initComponent = async () => {
      if(currentCharacter != null) {
        currentSelection.result = props.casterType.tableList[currentCharacter.casterTypeIndex].title;
        calcMod(currentCharacter.casterTypeIndex);
      }
    }

    onMounted(initComponent)

    return {
      setModifier,
      state,
      types,
      currentSelection,
      addModifierTotal,
      getOldCasterTypeMod
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mod-container {
    display: inline-block;
    max-width: 124px;
}
.spell-types {
    margin-bottom: 10px;
}
</style>
