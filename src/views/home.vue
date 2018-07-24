<template>
  <z-view label="zircle demo" style="border-width: 12px">
  11:53 PM 
  <br>
  Monday, Oct. 
  <br>
  <br>
  <h1>{{scene}}</h1>
  <br>
  Outside 29˚C, sunny
  <br>
  Inside 25˚C
    <div slot="extension">
      <!-- status monitor -->
      <z-spot
        style="background-color: orange; border-width: 4px; border-color: var(--background-color);"
        :angle="-145"
        size="m"
        :distance="120"
        to-view="status">
        <i style="color: var( --accent-text-color)" class="fas fa-bell"></i><br>
        <span style="color: var( --accent-text-color)">2</span>
      </z-spot>
      <!-- family-->
      <z-spot
        :angle="-30"
        size="s"
        :distance="120"
        label="family"
        label-pos="right"
        to-view="maps">
        <i class="fas fa-map-marker-alt"></i>
      </z-spot>
      <!-- scenes-->
      <z-spot
        :angle="0"
        size="s"
        :distance="120"
        label="scenes"
        label-pos="right"
        to-view="scenes">
        4
      </z-spot>
      <!-- rooms-->
      <z-spot
        :angle="30"
        size="s"
        :distance="120"
        label="Rooms"
        label-pos="right"
        to-view="rooms">
        5
      </z-spot>
      <!-- devices-->
      <z-spot
        :angle="60"
        :distance="120"
        size="s"
        label="Devices"
        label-pos="right"
        to-view="devices">
        45
      </z-spot>
      <!-- settings-->
      <z-spot
        :angle="150"
        :distance="120"
        size="s"
        label="Settings"
        to-view="settings">
        <i class="fas fa-sliders-h"></i>
      </z-spot>
    </div>
  </z-view>
</template>
<script>
  export default {
    data () {
      return {
        scene: 'Night mode'
      }
    }
  }
</script>
