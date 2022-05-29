<script setup>
import SpellManeuverTable from '@/components/SpellManeuverTable.vue'
import OtherModificationsVue from '../components/otherMods/OtherModifications.vue';
import OtherModifications from '../components/otherMods/OtherModifications.vue';

</script>

<template>
  <main>
    <div class="row">
      <div class="col-md-7 col-lg-8">
        <OtherModifications />
      </div>
      <div class="col-md-5 col-lg-4">
        <SpellManeuverTable />
      </div>
    </div>
  </main>
</template>
