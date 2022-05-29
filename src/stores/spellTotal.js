import { defineStore } from 'pinia'

export const useSpellTotal = defineStore({
  id: 'spellTotal',
  state: () => ({
    rawTotal: 0,
    modifiedTotal: 0
  }),
  getters: {
    // total: (state) => state.rawTotal,
    // modTotal: (state) => state.modifiedTotal
    total() {
      return this.rawTotal
    },
    modTotal() {
      return this.modifiedTotal
    }
  },
  actions: {
    setNew(newTotal) {
      this.rawTotal = parseFloat(newTotal)
    },
    setNewMod(newModTotal) {
      this.modifiedTotal = parseFloat(newModTotal)
    }
  }
})
