import { defineStore } from 'pinia'
import { Stats } from '../generics/statsClass.js'
import { useStorage } from '@vueuse/core'

let myStats = new Stats("0","0","0","0","0","0","0","0","0","0");

export const userCharacter = defineStore({
  id: 'character',
  state: () => ({
    characters: useStorage('characters', {}),
    list: useStorage('list', []),
    name: ""
  }),
  getters: {
    getCharacters() {
      return this.characters;
    },
    casterIndex() {
      return this.casterTypeIndex
    },
    getValue: (state) => {
      return (characterId, prop) => state.characters[characterId][prop]
    },
    getCharacterById: (state) => {
      return (characterId) => state.characters[characterId]
    },
    getCasterTypeById: (state) => {
      return (characterId) => state.characters[characterId].casterTypeIndex
    },
    getOldCasterTypeMod: (state) => {
      return (characterId) => state.characters[characterId].oldCasterIndexMod
    },
    getSpellModObj: (state) => {
      return (characterId, mod) => state.characters[characterId].spellMods[mod]
    },
    getSpellMod: (state) => {
      return (characterId, mod) => state.characters[characterId].spellMods[mod].value
    },
    getOldSpellMod: (state) => {
      return (characterId, mod) => state.characters[characterId].spellMods[mod].oldMod
    },
    total(state) {
      return (characterId) => state.characters[characterId].spellMods.rawTotal
    },
    modTotal(state) {
      return (characterId) => state.characters[characterId].spellMods.modifiedTotal
    }
  },
  actions: {
    setNew(newTotal, id) {
      this.characters[id].spellMods.rawTotal = parseFloat(newTotal)
    },
    setNewMod(newModTotal, id) {
      this.characters[id].spellMods.modifiedTotal = parseFloat(newModTotal)
    },
    setValue(prop, newValue, id) {
      this.characters[id][prop] = newValue;
    },
    setNewStats(newStats, id) {
      const newEmptyStat = {};
      Object.assign(newEmptyStat, newStats);
      this.characters[id].stats = {
        ...this.characters[id].stats,
        ...newEmptyStat
      }
    },
    setCasterIndex(newIndex, id) {
      this.characters[id].casterTypeIndex = newIndex;
    },
    setSpellMod(mod, newIndex, id) {
      this.characters[id].spellMods[mod].value = newIndex;
    },
    setOldSpellMod(mod, newIndex, id) {
      this.characters[id].spellMods[mod].oldMod = newIndex;
    },
    setOldCasterMod(newIndex, id) {
      this.characters[id].oldCasterIndexMod = newIndex;
    },
    setSpellModTotals(mod, total, totalLeft, id) {
      this.characters[id].spellMods[mod].total = total;
      this.characters[id].spellMods[mod].totalLeft = totalLeft;
    },
    setSpellPrep(mod, spellLevel, roundsPrep, isInstant, id) {
      this.characters[id].spellMods[mod].spellLevel = spellLevel;
      this.characters[id].spellMods[mod].roundsPrep = roundsPrep;
      this.characters[id].spellMods[mod].isInstant = isInstant;
    },
    create(id) {
      this.list.push(id);
      const newChar = {};
      Object.assign(newChar, getDefaultState());
      newChar.id = id;
      const newObj = {};
      newObj[id] = newChar;
      this.characters = {
        ...this.characters,
        ...newObj,
      };
    },
    import(payload) {
      this.list.push(payload.id);
      const newChar = {};
      Object.assign(newChar, JSON.parse(payload.stateString));
      newChar.id = payload.id;
      const newObj = {};
      newObj[payload.id] = newChar;
      this.characters = {
        ...this.characters,
        ...newObj,
      };
    },
    remove(index) {
      this.list.splice(this.list.indexOf(index), 1);
      delete this.characters[index];
    },
  },
})

const getDefaultState = () => ({
    id: "-1",
    version: 1,
    stats: new Stats(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    level: 1,
    skillBonus: 0,
    casterTypeIndex: 0,
    oldCasterIndexMod: 0,
    roundsPreppedMod: 0,
    oldRoundsPreppedMod: 0,
    transcendArmor: 0,
    name: "valar jr",
    spellMods: {
      handsFree: {
        value: null,
        oldMod: 0
      },
      armorType: {
        value: null,
        oldMod: 0
      },
      helmetType: {
        value: null,
        oldMod: 0
      },
      spellListType: {
        value: null,
        oldMod: 0
      },
      voiceUsed: {
        value: null,
        oldMod: 0
      },
      hitPoints: {
        value: null,
        oldMod: 0,
        total: null,
        totalLeft: null
      },
      powerPoints: {
        value: null,
        oldMod: 0,
        total: null,
        totalLeft: null
      },
      spellPrep: {
        spellLevel: 0,
        roundsPrep: 0,
        isInstant: false
      },
      rawTotal: 0,
      modifiedTotal: 0
    }
});

