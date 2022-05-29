<template>
  <div class="mod-container">
    <h6 class="card-title">Spell List Type</h6>
    <div class="btn-group spell-types">
        <div class="row">
          <div class="col-lg-12">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{currentSelection.result}}
            </button>
            <ul class="dropdown-menu">
                <li v-for="item, index in spellTypes" :key="item.title">
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
  name: 'SpellListType',
  props: { 
    spellListType: Object,
    characterId: String
  },
  setup(props) {
    const state = reactive({ result: 0 });
    const modAccess = "spellListType";
    const spellTypes = props.spellListType.tableList;
    const currentSelection = reactive({ result: "Select Spell List Type" });
    const { findCharacter, getSpellMod, setSpellMod, setNewByCharacterId, getSpellModTotal, getOldSpellMod, setOldModByCharacterId } = useCharacterLoader();
    const currentCharacter = findCharacter(props.characterId)

    const addModifierTotal = (modValue) => {
      setNewByCharacterId(props.characterId, getSpellModTotal(props.characterId) + modValue);
    };

    function setModifier(index) {
      setSpellMod(modAccess, index, props.characterId,);
      this.currentSelection.result = props.spellListType.tableList[index].title;
      calcMod(index)
    }

    const calcMod = (index) => {
      state.result = props.spellListType.tableList[index].modifiers[currentCharacter.casterTypeIndex];
      addModifierTotal(state.result + parseFloat(getOldSpellMod(props.characterId, modAccess) * -1));
      setOldModByCharacterId(modAccess, state.result, props.characterId);
    };

    const initComponent = async () => {
      if(getSpellMod(props.characterId, modAccess) != null) {
        currentSelection.result = props.spellListType.tableList[getSpellMod(props.characterId, modAccess)].title;   
        let index = getSpellMod(props.characterId, modAccess);
        calcMod(index);
      }
    }

    onMounted(initComponent)

    return {
      addModifierTotal,
      setModifier,
      state,
      spellTypes,
      currentSelection
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mod-container {
    display: inline-block;
    max-width: 182px;
}
.spell-types {
    margin-bottom: 10px;
}
</style>
