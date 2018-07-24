<template>
  <z-view label="home status monitor" style="background-color: black">
  <canvas slot="media" id="smoothie-chart" style="height:50%; width: inherit;"></canvas>
  <div slot="extension">
        <!-- status monitor -->
        <!-- escenes, rooms & devices -->
         <z-spot
          :angle="-45"
          size="m"
          :distance="120"
          label="logs"
          to-view="logs">
          234
        </z-spot>
    </div>
  </z-view>
</template>
<script>
  import {TimeSeries, SmoothieChart} from 'smoothie'
  export default {
    data () {
      return {
        scene: 'Night scene'
      }
    },
    mounted () {
      // Random data
      var line1 = new TimeSeries()
      // Add random data points at irregular intervals
      var maxYValue = 10000;
      var addValueLoop = function() {
        setTimeout(function() {
          // Generate a random value, centered around zero, raised to the power of 5
          // so that larger values occur less frequently
          var value = Math.pow(Math.random() * 2 - 1, 5) * maxYValue
          line1.append(new Date().getTime(), value)
          addValueLoop()
        }, Math.random() * 500)
      }
      addValueLoop()
      var smoothie = new SmoothieChart({ 
        grid: {
          strokeStyle:'transparent',
          borderVisible:false
        },
        tooltip: true,
        labels: {disabled:true}
      })
      smoothie.addTimeSeries(line1, { 
        strokeStyle: 'rgb(0, 255, 0)',
        fillStyle: 'rgba(0, 255, 0, 0.4)',
        lineWidth: 2
      })
      smoothie.streamTo(document.getElementById("smoothie-chart"), 100)
    
    }
  }
</script>
