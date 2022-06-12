<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <h6 class="card-title">Weapon Category</h6>
        <div class="row">
          <div class="col-lg-12">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              {{currentSelection.result}}
            </button>
            <ul class="dropdown-menu">
              <li v-for="item, index in catagories" :key="item.name">
                <button @click="setCategory(index)" class="dropdown-item" href="#">{{ item.name
                  }}</button>
              </li>
            </ul>
          </div>
        </div>
        <div class="row margin-top-15">
          <div class="col-lg-12">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              {{ currentCategorySelection.result}}
            </button>
            <ul class="dropdown-menu">
              <li v-for="item, index in currentCategorySelection.weapons" :key="item.name">
                <button @click="setWeapon(index)" class="dropdown-item" href="#">{{ item.name
                  }}</button>
              </li>
            </ul>
          </div>
        </div>
        <div class="row margin-top-15">
          <div class="col-lg-2">
            <input v-model="state.ob" @focusout="zeroValidation(state.ob, validChecks, 'ob')"
              v-on:keypress="numbersOnly" type="number" class="form-control" :class="validChecks.ob ? '' : 'is-invalid'"
              id="ob">
            <div id="validationob" class="invalid-feedback">
              Must have value of at least 0.
            </div>
            <div class="form-text">OB</div>
          </div>
          <div class="col-lg-2">
            <input v-model="state.dice" @focusout="zeroValidation(state.dice, validChecks, 'dice')"
              v-on:keypress="numbersOnly" type="number" class="form-control"
              :class="validChecks.dice ? '' : 'is-invalid'" id="dice">
            <div id="validationdice" class="invalid-feedback">
              Must have value of at least 0.
            </div>
            <div class="form-text">Dice Roll</div>
          </div>
          <div class="col-lg-2">
            <input v-model="state.hits" @focusout="zeroValidation(state.hits, validChecks, 'hits')"
              v-on:keypress="numbersOnly" type="number" class="form-control"
              :class="validChecks.hits ? '' : 'is-invalid'" id="hits">
            <div id="validationhits" class="invalid-feedback">
              Must have value of at least 0.
            </div>
            <div class="form-text">Damage</div>
          </div>
        </div>
        <div class="row margin-top-15">
          <div class="col-lg-2">
            <input v-model="state.db" @focusout="zeroValidation(state.db, validChecks, 'db')"
              v-on:keypress="numbersOnly" type="number" class="form-control" :class="validChecks.db ? '' : 'is-invalid'"
              id="db">
            <div id="validationdb" class="invalid-feedback">
              Must have value of at least 0.
            </div>
            <div class="form-text">DB</div>
          </div>
          <div class="col-lg-2">
            <input v-model="state.armorType" @focusout="zeroValidation(state.armorType, validChecks, 'armorType')"
              v-on:keypress="numbersOnly" type="number" class="form-control"
              :class="validChecks.armorType ? '' : 'is-invalid'" id="db">
            <div id="validationarmorType" class="invalid-feedback">
              Must have value of at least 1.
            </div>
            <div class="form-text">Armor Type</div>
          </div>
        </div>
        <div class="col-lg-12 margin-top-15">
          <span class="badge bg-danger">Weapon Vs Armor: {{state.vsArmor}}</span>
        </div>
        <div class="col-lg-12">
          <span class="badge bg-danger">Dice Roll For Crit: {{state.toCrit}}</span>
        </div>
        <div class="col-lg-12">
          <span class="badge bg-danger">To Hit: {{state.toHit}}</span>
        </div>
        <div class="col-lg-12">
          <span class="badge bg-danger">Damage Multiplier: x{{state.multi}}</span>
        </div>
        <div class="col-lg-12">
          <span class="badge bg-danger">Damage: {{state.hitsDelievered}}</span>
        </div>
        <div class="col-lg-12">
          <span class="badge bg-danger">Damage With Multiplier: {{state.multiDamage}}</span>
        </div>
        <button class="btn btn-primary margin-left-10 margin-top-15" @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { userCharacter } from '../../stores/character';
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useValidation } from '../../helpers/validation.js';

export default {
    name: 'WeaponCategory',
    components: {  },
    props: {
        categories: Object,
        characterId: String
    },
    setup(props) {
        const route = useRoute();
        const characterId = route.params.id;
        const { numbersOnly, zeroValidation } = useValidation();
        const currentSelection = reactive({
          result: "Weapon Category",
          index: ""
        });
        const catagories = props.categories;
        const currentCategorySelection = reactive({
          result: "Choose Weapon",
          weapons: {},
          modVsArmor: []
        });
        const state = reactive({
          ob: 0,
          db: 0,
          dice: 0,
          armorType: 1,
          hits: 0,
          hitsDelievered: 0,
          toHit: 0,
          vsArmor: 0,
          toCrit: 0,
          multi: 0,
          multiDamage: 0
        });
        const validChecks = reactive({
          ob: true,
          db: true,
          dice: true,
          armorType: true,
          hits: true
        });

        const setCategory = (index) => {
          currentSelection.result = catagories[index].name;
          currentSelection.index = index;
          currentCategorySelection.result = "Choose Weapon";
          currentCategorySelection.weapons = catagories[index].weapons;
        };
        
        const setWeapon = (index) => {
          currentCategorySelection.result = catagories[currentSelection.index].weapons[index].name;
          currentCategorySelection.modVsArmor = catagories[currentSelection.index].weapons[index].mods;
        };

        const toCrit = () => {
          let total = 0;
          total = Math.floor(state.ob / 10);
          total = 100 - total;
          return total;
        };

        const getMulti = () => {
          let multi = 0;
          let answer = 0;
          multi = state.toHit;
          multi = multi - 124;
          console.log("multi", multi)
          if (multi > 0) {
            answer = Math.ceil(multi / 50);
          }
          return answer + 1;
        };
        
        const submit = () => {
          let total = 0;
          let toHit = 0;
          toHit = state.ob + state.dice - state.db;
          total = state.hits - state.armorType;
          if (currentCategorySelection.modVsArmor) {
            toHit = toHit + currentCategorySelection.modVsArmor[state.armorType - 1];
          }
          state.toCrit = toCrit();
          state.vsArmor = currentCategorySelection.modVsArmor[state.armorType - 1];
          state.hitsDelievered = total;
          state.toHit = toHit;
          state.multi = getMulti();
          state.multiDamage = state.hitsDelievered * state.multi;
        };
        
        return {
          currentSelection,
          setCategory,
          catagories,
          currentCategorySelection,
          setWeapon,
          numbersOnly,
          validChecks,
          zeroValidation,
          state,
          submit,
          toCrit,
          getMulti
        };
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.margin-top-15 {
  margin-top:15px;
}
</style>
