<template>
  <div v-if="widgetReady">
    <div class="row">
      <div class="col-lg-4">
            <power-points-used :character-id="characterId" :power-points="mods.results.powerPointsUsed"></power-points-used>
      </div>
      <div class="col-lg-4">
            <hit-points :character-id="characterId" :hit-points="mods.results.hitPointsUsed"></hit-points>
      </div>
      <div class="col-lg-4">
        <rounds-prep :character-id="characterId"></rounds-prep>
      </div>
    </div>
    <div class="row">
        <caster-type :id="characterId" :caster-type="character.results.casterType"></caster-type>
        <spell-list-type :character-id="characterId" :spell-list-type="mods.results.spellListType"></spell-list-type>
        <free-hands :character-id="characterId" :free-hands="mods.results.freeHands"></free-hands>
        <use-of-voice :character-id="characterId" :voice-used="mods.results.useOfVoice"></use-of-voice>
        <helmet-type :character-id="characterId" :helmet-material="mods.results.helmet"></helmet-type>
        <armor-status :character-id="characterId" :armor-type="mods.results.armor"></armor-status>
    </div>
  </div>
</template>

<script>
import PowerPointsUsed from './PowerPointsUsed.vue'
import modifications from '../../assets/modifications.json'
import characterMods from '../../assets/character.json'
import HitPoints from './HitPoints.vue'
import SpellListType from './SpellListType.vue'
import FreeHands from './FreeHands.vue'
import UseOfVoice from './UseOfVoice.vue'
import HelmetType from './HelmetType.vue'
import ArmorStatus from './ArmorStatus.vue'
import CasterType from '../character/CasterType.vue'
import RoundsPrep from './RoundsPrep.vue'
import { userCharacter } from '../../stores/character';
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'OtherModifications',
  components: { PowerPointsUsed, HitPoints, SpellListType, FreeHands, UseOfVoice, HelmetType, ArmorStatus, CasterType, RoundsPrep },
  props: { 
  },
  setup(props) {
    const route = useRoute();
    const mods = modifications;
    const character = characterMods;
    const widgetReady = true;
    const myCharacter = userCharacter();
    const casterType = reactive({ result: myCharacter.getCasterTypeById(route.params.id) });
    const characterId = route.params.id;

    window.stores = { myCharacter };

    return {
      mods,
      myCharacter,
      widgetReady,
      casterType,
      characterId,
      character
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
