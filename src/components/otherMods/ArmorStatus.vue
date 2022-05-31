<template>
  <div class="mod-container">
    <h6 class="card-title">Armor Status</h6>
    <div class="btn-group spell-types">
        <div class="row">
          <div class="col-lg-12">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{currentSelection.result}}
            </button>
            <ul class="dropdown-menu">
                <li v-for="item, index in armorTypes" :key="item.title">
                    <button @click="setModifier(index)" class="dropdown-item" href="#">{{item.title}}</button>
                </li>
            </ul>
            <div class="col-md-12 col-lg-5 margin-top-10">
                  <input v-model="state.transcend" v-on:keypress="numbersOnly" type="string" class="form-control" id="transcendArmor">
                  <div class="form-text">Transcend Armor</div>
            </div>
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
import { useValidation } from '../../helpers/validation.js';

export default {
  name: 'ArmorStatus',
  props: { 
    armorType: Object,
    characterId: String
  },
  setup(props) {
    const state = reactive({ 
      result: 0,
      transcend: 0 
    });
    const modAccess = "armorType";
    const armorTypes = props.armorType.tableList;
    const currentSelection = reactive({ result: "Armor Type" });
    const { findCharacter, setValue, getValue, getSpellMod, setSpellMod, setNewByCharacterId, getSpellModTotal, getOldSpellMod, setOldModByCharacterId } = useCharacterLoader();
    const { numbersOnly } = useValidation();
    const currentCharacter = findCharacter(props.characterId)

    watch(
      () => currentCharacter.casterTypeIndex,
      () => {
        initComponent()
      }
    )

    watch(
      () => state.transcend,
      () => {
        setValue("transcendArmor", state.transcend, props.characterId);
        initComponent()
      }
    )

    const addModifierTotal = (modValue) => {
      setNewByCharacterId(props.characterId, getSpellModTotal(props.characterId) + modValue);
    };

    function setModifier(index) {
      setSpellMod(modAccess, index, props.characterId,);
      this.currentSelection.result = props.armorType.tableList[index].title;
      calcMod(index)
    }

    const calcMod = (index) => {
      state.transcend = getValue(props.characterId, "transcendArmor");
      state.result = props.armorType.tableList[index].modifiers[currentCharacter.casterTypeIndex];
      state.result = state.result + parseFloat(state.transcend);
      if(state.result > 0) {
        state.result = 0;
      }
      setValue("transcendArmor", state.transcend, props.characterId);
      addModifierTotal(state.result + parseFloat(getOldSpellMod(props.characterId, modAccess) * -1));
      setOldModByCharacterId(modAccess, state.result, props.characterId);
    };

    const initComponent = async () => {
      if(getSpellMod(props.characterId, modAccess) != null) {
        currentSelection.result = props.armorType.tableList[getSpellMod(props.characterId, modAccess)].title;   
        let index = getSpellMod(props.characterId, modAccess);
        calcMod(index);
      }
    }

    onMounted(initComponent)

    return {
      addModifierTotal,
      setModifier,
      state,
      armorTypes,
      currentSelection,
      currentCharacter,
      numbersOnly
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mod-container {
    display: inline-block;
    max-width: 166px;
}
.spell-types {
    margin-bottom: 10px;
}
.margin-top-10 {
  margin-top:10px;
}
</style>
