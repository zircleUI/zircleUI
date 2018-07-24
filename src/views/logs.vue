<template>
  <z-view style="border-width: 6px"  label="history logs">
 <ul>
  <li> 12:30 pm. bla bla bla bla. </li>
  <li> 12:30 pm. bla bla bla bla. </li>
  <li> 12:30 pm. bla bla bla bla. </li>
  <li> 12:30 pm. bla bla bla bla. </li>
  <li> 12:30 pm. bla bla bla bla. </li>
  <li> 12:30 pm. bla bla bla bla. </li>

  <li> 12:30 pm. bla bla bla bla. </li>
  <li> 12:30 pm. bla bla bla bla. </li>
    <li> 12:30 pm. bla bla bla bla. </li><li> 12:30 pm. bla bla bla bla. </li>  
    <li> 12:30 pm. bla bla bla bla. </li><li> 12:30 pm. bla bla bla bla. </li>
    <li> 12:30 pm. bla bla bla bla. </li>

  <li> 12:30 pm. bla bla bla bla. </li><li> 12:30 pm. bla bla bla bla. </li>
  <li> 12:30 pm. bla bla bla bla. </li>
  <li> 12:30 pm. bla bla bla bla. </li>
  <li> 12:30 pm. bla bla bla bla. </li>
  <li> 12:30 pm. bla bla bla bla. </li>
  <li> 12:30 pm. bla bla bla bla. </li>
  <li> 12:30 pm. bla bla bla bla. </li>

  <li> 12:30 pm. bla bla bla bla. </li>
  <li> 12:30 pm. bla bla bla bla. </li>
</ul>
  <div slot="extension">
        <!-- status monitor -->
        <!-- escenes, rooms & devices -->
         <z-spot knob
          :angle="-35"
          size="s"
          :distance="120"
          label="Reset logs">
        </z-spot>
    </div>
  </z-view>
</template>
<script>
  export default {
    data () {
      return {
        scene: 'Night scene'
      }
    }
  }
</script>
<style>
li {
  line-height: 40px;
  border-bottom: 1px solid white
}
</style>
