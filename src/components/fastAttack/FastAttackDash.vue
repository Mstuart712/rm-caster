<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <weapon-category :categories="categories"></weapon-category>
            </div>
        </div>
    </div>
</template>

<script>
import { userCharacter } from '../../stores/character';
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import weapons from '../../assets/weapons.json'
import WeaponCategory from './WeaponCategory.vue';

export default {
    name: 'FastAttackDash',
    components: { WeaponCategory },
    props: {
    },
    setup() {
        const route = useRoute();
        const characterId = route.params.id;
        const categories = weapons.results.catagories;

        return {
            categories
        };
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
