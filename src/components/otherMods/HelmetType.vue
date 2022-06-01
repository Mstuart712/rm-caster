<template>
  <div class="mod-container">
    <h6 class="card-title">Helmet</h6>
    <div class="btn-group spell-types">
        <div class="row">
          <div class="col-lg-12">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{currentSelection.result}}
            </button>
            <ul class="dropdown-menu">
                <li v-for="item, index in helmetType" :key="item.title">
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
import { reactive, onMounted, watch } from 'vue'
import { useCharacterLoader } from '../character/CharacterLoader.js'

export default {
  name: 'HelmetType',
  props: { 
    helmetMaterial: Object,
    characterId: String
  },
  setup(props) {
    const state = reactive({ 
      result: 0,
      transcend: 0  
    });
    const modAccess = "helmetType";
    const helmetType = props.helmetMaterial.tableList;
    const currentSelection = reactive({ result: "Helmet Type" });
    const { findCharacter, setValue, getValue, getSpellMod, setSpellMod, setNewByCharacterId, getSpellModTotal, getOldSpellMod, setOldModByCharacterId } = useCharacterLoader();
    const currentCharacter = findCharacter(props.characterId)

    watch(
      () => [currentCharacter.casterTypeIndex, currentCharacter.transcendArmor, currentCharacter.spellMods.armorType.value],
      () => {
        initComponent()
      }
    )

    const addModifierTotal = (modValue) => {
      setNewByCharacterId(props.characterId, getSpellModTotal(props.characterId) + modValue);
    };

    function setModifier(index) {
      setSpellMod(modAccess, index, props.characterId,);
      this.currentSelection.result = props.helmetMaterial.tableList[index].title;
      calcMod(index)
    }

    const calcMod = (index) => {
      state.transcend = getValue(props.characterId, "transcendArmorLeftOver");
      state.result = props.helmetMaterial.tableList[index].modifiers[currentCharacter.casterTypeIndex];
      state.result = state.result + parseFloat(state.transcend);
      if(state.result > 0) {
        state.result = 0;
      }
      addModifierTotal(state.result + parseFloat(getOldSpellMod(props.characterId, modAccess) * -1));
      setOldModByCharacterId(modAccess, state.result, props.characterId);
    };

    const initComponent = async () => {
      if(getSpellMod(props.characterId, modAccess) != null) {
        currentSelection.result = props.helmetMaterial.tableList[getSpellMod(props.characterId, modAccess)].title;   
        let index = getSpellMod(props.characterId, modAccess);
        calcMod(index);
      }
    }

    onMounted(initComponent)

    return {
      addModifierTotal,
      setModifier,
      calcMod,
      state,
      helmetType,
      currentSelection
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mod-container {
    display: inline-block;
    max-width: 132px;
}
.spell-types {
    margin-bottom: 10px;
}
</style>
