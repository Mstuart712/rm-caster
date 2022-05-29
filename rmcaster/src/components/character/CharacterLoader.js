import { ref, onMounted } from "vue";
import { userCharacter } from '../../stores/character';

export function useCharacterLoader() {
  const character = ref({});
  const myCharacter = userCharacter();

  onMounted(() => {
  });
  //this whole file and strategy was a mistake
  const findCharacter = (id) => {
    return myCharacter.getCharacterById(id);
  };

  const setSpellMod = (mod, newIndex, id) => {
    return myCharacter.setSpellMod(mod, newIndex, id);
  };

  const setValue = (prop, newValue, id) => {
    return myCharacter.setValue(prop, newValue, id);
  };

  const getValue = (characterId, prop) => {
    return myCharacter.getValue(characterId, prop);
  };

  const setSpellModTotals = (mod, total, totalLeft, id) => {
    return myCharacter.setSpellModTotals(mod, total, totalLeft, id);
  };

  const getSpellMod = (characterId, mod) => {
    return myCharacter.getSpellMod(characterId, mod);
  };
  //getSpellModObj
  const getSpellModObj = (characterId, mod) => {
    return myCharacter.getSpellModObj(characterId, mod);
  };

  const getOldSpellMod = (characterId, mod) => {
    return myCharacter.getOldSpellMod(characterId, mod);
  };

  const getOldCasterTypeMod = (characterId) => {
    return myCharacter.getOldCasterTypeMod(characterId);
  };

  const setCasterTypeByCharacterId = (index, characterId) => {
    return myCharacter.setCasterIndex(index, characterId);
  };

  const setNewByCharacterId = (characterId, newTotal) => {
    return myCharacter.setNew(newTotal, characterId);
  };

  const setNewModByCharacterId = (characterId, newModTotal) => {
    return myCharacter.setNewMod(newModTotal, characterId);
  };

  const setOldModByCharacterId = (mod, newModTotal, characterId) => {
    return myCharacter.setOldSpellMod(mod, newModTotal, characterId);
  };

  const setOldCasterModByCharacterId = (newModTotal, characterId) => {
    return myCharacter.setOldCasterMod(newModTotal, characterId);
  };

  const getSpellModTotal = (characterId) => {
    return myCharacter.total(characterId);
  };

  const getModifiedTotal = (characterId) => {
    return myCharacter.modTotal(characterId);
  };

  return {
    character,
    findCharacter,
    setSpellMod,
    getSpellMod,
    setNewByCharacterId,
    setNewModByCharacterId,
    getSpellModTotal,
    getModifiedTotal,
    getOldSpellMod,
    setOldModByCharacterId,
    getSpellModObj,
    setSpellModTotals,
    setCasterTypeByCharacterId,
    setOldCasterModByCharacterId,
    getOldCasterTypeMod,
    setValue,
    getValue
  };
}