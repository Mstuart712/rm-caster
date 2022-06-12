<script setup>
import SuccessTable from '@/components/fastAttack/SuccessTable.vue'
import FastAttackDash from '../components/fastAttack/FastAttackDash.vue';

</script>

<template>
    <main>
        <div class="row">
            <div class="col-md-7 col-lg-8">
                <FastAttackDash />
            </div>
            <div class="col-md-5 col-lg-4">
                <SuccessTable />
            </div>
        </div>
    </main>
</template>
