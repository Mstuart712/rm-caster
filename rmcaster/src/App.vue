<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <nav class="nav-link">
                  <RouterLink to="/">Home</RouterLink>  
                </nav>
              </li>
              <!-- <li class="nav-item">
                <nav class="nav-link">
                  <RouterLink to="/create-character">Create Character</RouterLink>
                </nav>
              </li>
              <li class="nav-item">
                <nav class="nav-link">
                  <RouterLink to="/cast-spells">Cast Spells</RouterLink>
                </nav>
              </li> -->
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <div class="container">
    <RouterView />
  </div>
</template>

<style>
@import '@/assets/base.css';


</style>
