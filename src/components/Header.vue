<template>
  <div style="zIndex: 9999; marginBottom: 70px">
    <v-app-bar fixed color="primary">
      <!-- <v-app-bar-nav-icon dark /> -->
      <v-toolbar-title>
        <div style="height: 35px; lineHeight: 35px; color: white; display: flex">
          <img :src="logo" alt="Logo" style="marginRight: 10px">
          <span>海是會害怕</span>
        </div>
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import logo from "../assets/logo.png";

export default {
  name: 'Header',
  data() {
    return {
      logo,
    }
  },
};
</script>