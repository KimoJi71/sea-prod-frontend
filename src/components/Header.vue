<template>
  <div style="zIndex: 9999; marginBottom: 70px">
    <v-app-bar fixed color="primary">
      <v-app-bar-nav-icon dark @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <div style="height: 35px; lineHeight: 35px; color: white; display: flex">
          <img :src="logo" alt="Logo" style="marginRight: 10px">
          <span>海是會害怕</span>
        </div>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      left
      fixed
      temporary
      overlay-opacity="0.3"
      style="zIndex: 9000"
    >
      <v-list dense nav rounded>
        <v-list-item
          v-for="item in items"
          :key="item.name"
          link
          :to="item.href"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import logo from "../assets/logo.png";

export default {
  name: 'Header',
  data() {
    return {
      logo,
      drawer: false,
      items: [
        { name: "水域地點地圖", href: "/map/location" },
        { name: "水質狀況地圖", href: "/map/water" },
        { name: "AED地圖", href: "/map/AED" },
        { name: "氣象及海象查詢", href: "/weather/search" },
        { name: "藍色公路", href: "/blueroad/search" },
        { name: "歷史人潮統計", href: "/crowd/search" },
      ],
    }
  },
};
</script>