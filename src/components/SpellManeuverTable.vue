<template>
  <div v-if="widgetReady">
    <div class="row">
        <div class="col-lg-12">
          <result-box :character-id="characterId"></result-box>
        </div>
          <div class="col-lg-12">
            <div class="card" style="max-width: 30rem;">
            <div class="card-header">
                {{spellResults.title}}
            </div>
            <ul class="list-group list-group-flush" v-for="item in spellResults.results" :key="item.name">
                <template v-if="isInRange(item)"><span class="badge rounded-pill bg-success">Current Result</span></template>
                <li class="list-group-item"> <template v-if="!item.unusual">{{item.min}}</template> <template v-if="!item.unusual && item.min && item.max">-</template> {{item.max}} {{item.title}}</li>
                <template v-if="isInRange(item)">
                  <span class="spell-description">{{item.description}}</span>
                </template>
            </ul>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import spellTable from '../assets/spellTable.json'
import ResultBox from './ResultBox.vue'
import { useRoute } from 'vue-router'
import { useCharacterLoader } from './character/CharacterLoader.js'

export default {
  name: 'SpellManeuverTable',
  components: { ResultBox },
  setup() {
    const { getSpellModTotal, setNewModByCharacterId, getModifiedTotal } = useCharacterLoader();
    const route = useRoute();
    const characterId = route.params.id;

    function isInRange(item) {
      if(item.max == null && getModifiedTotal(route.params.id) >= item.min) {
          return true
      }
      if(item.min == null && getModifiedTotal(route.params.id) <= item.max) {
          return true
      }
      if(item.min <= getModifiedTotal(route.params.id) && item.max >= getModifiedTotal(route.params.id)) {
          return true
      }
    }

    const initComponent = async () => {
      setNewModByCharacterId(route.params.id, getSpellModTotal(route.params.id) + parseFloat(0) + parseFloat(50))
    }

    onMounted(initComponent)

    return {
      isInRange,
      characterId
    };
  },
  data() { 
    return {
	    spellResults: spellTable,
      widgetReady: false
    }
  },
  mounted() {
    this.widgetReady = true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bg-success {
        margin: 10px 0 0 10px;
        width: 100px
    }
    .spell-description {
      font-size: 12px;
      padding: 5px 5px 5px 15px;
    }
</style>
