<template>
  <div id="z-container" 
  :class="[$zircleStore.state.color, $zircleStore.state.theme]" 
  :style="[state.previousView !== '' ? {cursor: 'zoom-out'} : {}]"
  @click.stop="goback" >
    <div id="z-point">
     <slot> </slot>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-new */
import store from '../store/store'
export default {
  props: {
    isStandalone: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      state: store.state,
      store: store
    }
  },
  methods: {
    goback () {
      if (this.store.state.router === true && this.store.state.previousView !== '') {
        this.$router.back()
      }
      if (this.store.state.router === false) {
        this.store.goBack()
      }
    }
  },
  mounted () {
    var vue = this
    // seteo inicial de posiciom de circilos responsives pasarlo a store!!!
    this.store.getDimensions()
    // dynamic posiciom de circilos responsives
    window.addEventListener('resize', function (event) {
      vue.store.state.viewport = {x: window.innerWidth, y: window.innerHeight}
      vue.store.getDimensions()
    })
  }
}
</script>
<style>
:root {
  --light-blue: #5FC9F3;
  --black: #283237;
  --purple: #ee305a;
  --orange: #f7892f;
  --yellow: #ffca26;
  --blue: #3e78bb;
  --green: #69bf66;
  --red: #ef3c3b;
  --gray: #7c7e81;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar {
  display: none;
}

.color--light-blue {
  --background-color: #F1F1F1;
  --primary-color: #5FC9F3;
  --accent-color: #0D7FAC;
  --success-color: #52B781;
  --warning-color: #CFA749;
  --danger-color: #C76B6F;
}

.color--black {
  --background-color: #859ba6;
  --primary-color: #283237;
  --accent-color: #000000;
  --success-color: #418a49;
  --warning-color: #bf7911;
  --danger-color: #b73e36;
}

.color--purple {
  --background-color: #fdecf0;
  --primary-color: #ee305a;
  --accent-color: #7b0a23;
  --success-color: #7d8953;
  --warning-color: #fa791b;
  --danger-color: #f23d41;
}

.color--orange {
  --background-color: #fff8f3;
  --primary-color: #f7892f;
  --accent-color: #884005;
  --success-color: #7fa446;
  --warning-color: #fd940e;
  --danger-color: #f55834;
}

.color--yellow {
  --background-color: #fffcf2;
  --primary-color: #ffca26;
  --accent-color: #8c6a00;
  --success-color: #82b743;
  --warning-color: #ffa70b;
  --danger-color: #f76c31;
}

.color--blue {
  --background-color: #d4e1f1;
  --primary-color: #3e78bb;
  --accent-color: #182e48;
  --success-color: #489f70;
  --warning-color: #c58e38;
  --danger-color: #bd535e;
}

.color--green {
  --background-color: #f6fbf6;
  --primary-color: #69bf66;
  --accent-color: #2b6329;
  --success-color: #55b457;
  --warning-color: #d2a41f;
  --danger-color: #ca6844;
}

.color--red {
  --background-color: #fef8f8;
  --primary-color: #ef3c3b;
  --accent-color: #860c0b;
  --success-color: #7d8d4a;
  --warning-color: #fa7c12;
  --danger-color: #f34138;
}

.color--gray {
  --background-color: #e4e4e5;
  --primary-color: #7c7e81;
  --accent-color: #313233;
  --success-color: #5aa05f;
  --warning-color: #d89027;
  --danger-color: #d0554d;
}

.theme--light {
  --background: var(--background-color);
  --primary: var(--primary-color);
  --accent: var(--accent-color);
  --background-card: var(--background-color);
  --border-card: var(--primary-color);
  --primary-text: var(--primary-color);
}

.theme--bold-light {
  --background: var(--background-color);
  --primary: var(--primary-color);
  --accent: var(--accent-color);
  --background-card: var(--primary-color);
  --border-card: var(--background-color);
  --primary-text: var(--background-color);
}

.theme--dark {
  --background: var(--primary-color);
  --primary: var(--background-color);
  --accent: var(--accent-color);
  --background-card: var(--primary-color);
  --border-card: var(--background-color);
  --primary-text: var(--background-color);
}

.theme--bold-dark {
  --background: var(--primary-color);
  --primary: var(--background-color);
  --accent: var(--accent-color);
  --background-card: var(--background-color);
  --border-card: var(--primary-color);
  --primary-text: var(--primary-color);
}

#z-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: var(--background);
  color: var(--primary);
  transition: background-color 1s;
}

div[type="panel"],
div[type="scale"],
div[type="button"] {
  transition: background-color 1s;
}

#z-point {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: calc(14px + 1vmax);
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  position: fixed;
  top: 50%;
  left: 50%;
  perspective: 1000px;
  text-decoration: none;
  will-change: transform;
}

.handlebar:hover {
  cursor: grab;
}

.handlebar:active {
  cursor: grabbing;
}

.zui {
  overflow: visible;
  position: absolute;
  display: block;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  text-align: center;
}

.main {
  z-index: 40;
}

.disc {
  z-index: 80;
  cursor: default;
}

.zoom {
  cursor: zoom-in;
}

.pop {
  z-index: 500;
}

.scroll,
.slider {
  position: absolute;
  overflow: visible;
  display: block;
  z-index: 40;
  fill: none;
  stroke-opacity: 0.8;
}

.accent .slider,
.accent .scroll {
  stroke: var(--primary);
}

.primary .slider,
.primary .scroll {
  stroke: var(--accent);
}

.accent .scroll2 {
  fill: var(--primary);
}

.primary .scroll2 {
  fill: var(--accent);
}

.scroll2 {
  position: absolute;
  border-radius: 50%;
  display: block;
  width: 40px;
  height: 40px;
  top: 50%;
  left: 50%;
  margin: -20px 0 0 -20px;
  z-index: 70;
}

.dashed {
  border: 2px solid var(--background-card);
}

.flow {
  overflow: visible;
}

.label {
  font-size: calc(10px + 1vmax);
  overflow: visible
}

.z-contentbox {
  position: absolute;
  z-index: 50;
  top: 2%;
  left: 2%;
  width: 96%;
  height: 96%;
  display: block;
  border-radius: 50%;
  background: none;
  overflow: hidden;
}

.z-contentbox > img {
  border-radius: 50%;
  overflow: hidden;
}

.z-content {
  position: absolute;
  z-index: 0;
  top: 1%;
  left: 1%;
  width: 98%;
  height: 98%;
  display: flex;
  background: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  user-select: none;
  border: 1px solid transparent;
}

.maindisc {
  cursor: default;
}

.longtext {
  overflow-y: scroll;
  padding-right: 20px;
  margin-right: -20px; /* padding-top: 100px;
    height: 100%;
    width: 105%;
     padding-right: 28px;
    margin-right: -28px; */
}

.bottom {
  position: relative;
  display: block;
  width: 1px;
  height: 1px
}

.longtext span.bottom {
  position: relative;
  display: block;
  width: 1px;
  height: 140px
}

.nodisplay {
  display: none;
}

.button {
  cursor: pointer;
}

.button:hover {
  filter: brightness(0.9);
}

.button:active {
  filter: brightness(0.4);
}

.hidden {
  cursor: zoom-out;
}

.current {
  will-change: opacity;
}

.pastclass {
  cursor: zoom-out;
  filter: blur(1.5px);
}

.prevclass {
  cursor: zoom-out;
  filter: blur(1.5px);
}

.currclass {
  animation: appear 800ms linear forwards;
  will-change: opacity;
}

@keyframes appear {
  0% {
    opacity: 0;
  }

  20% {
    opacity: 0;
  }

  80% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }

}

.lastclass {
  animation: disappear 800ms linear forwards;
  will-change: opacity;
}

@keyframes disappear {
  0% {
    opacity: 1;
  }

  20% {
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }

}

@keyframes blur {
  0% {
    filter: blur(0px);
  }

  20% {
    filter: blur(0px);
  }

  60% {
    filter: blur(1.5px);
  }

  100% {
    filter: blur(1.5px);
  }

}

.prevclass div {
  cursor: zoom-out;
}

.background {
  background-color: var(--background);
  border: 3px solid var(--primary);
  color: var(--primary-text);
}

.accent {
  border: 3px solid var(--accent);
  background-color: var(--accent);
  color: var(--primary-text);
}

.accent-secondary {
  filter: invert(100%);
}

.accent-secondary-border {
  filter: invert(100%);
  background-color: transparent;
  border-width: 1px;
}

.primary,
.default {
  border: 3px solid var(--border-card);
  background-color: var(--background-card);
  color: var(--primary-text);
}

.success {
  background-color: var(--success);
  border: 3px solid var(--success);
  color: var(--primary-text);
}

.warning {
  background-color: var(--warning);
  border: 3px solid var(--warning);
  color: var(--primary-text);
}

.danger {
  background-color: var(--danger);
  border: 3px solid var(--danger);
  color: var(--primary-text);
}

.light-blue {
  background-color: var(--light-blue);
  border: 3px solid var(--light-blue);
  color: var(--primary-text);
}

.black {
  background-color: var(--black);
  border: 3px solid var(--black);
  color: var(--primary-text);
}

.purple {
  background-color: var(--purple);
  border: 3px solid var(--purple);
  color: var(--primary-text);
}

.orange {
  background-color: var(--orange);
  border: 3px solid var(--orange);
  color: var(--primary-text);
}

.yellow {
  background-color: var(--yellow);
  border: 3px solid var(--yellow);
  color: var(--primary-text);
}

.blue {
  background-color: var(--blue);
  border: 3px solid var(--blue);
  color: var(--primary-text);
}

.green {
  background-color: var(--green);
  border: 3px solid var(--green);
  color: var(--primary-text);
}

.red {
  background-color: var(--red);
  border: 3px solid var(--red);
  color: var(--primary-text);
}

.gray {
  background-color: var(--gray);
  border: 3px solid var(--gray);
  color: var(--primary-text);
}

.plate,
.popup-plate {
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 1px dashed var(--primary);
  opacity: 0.3;
  overflow: hidden;
}

.navplate {
  position: absolute;
  z-index: 90;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  background: transparent;
  opacity: 0.3;
  overflow: hidden;
}

.alert {
  z-index: 100;
  background: var(--background);
  border: 1px solid var(--primary);
  opacity: 0.3;
  overflow: hidden;
}

.border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid var(--background);
}

div[title="z-item"],
div[title="z-dotnav"] {
  cursor: zoom-in;
}

div[title="z-dotnav"]:hover {
  cursor: grab;
}

div[title="z-dotnav"]:active {
  cursor: grabbing;
}

.prevclass section[title="z-list"] {
  pointer-events: none;
}

::placeholder {
  color: inherit;
}

input {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: calc(14px + 1vmax);
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  margin-top: 20px;
  width: 100%;
  background: none;
  appearance: none;
  box-shadow: none;
  border: none;
  color: inherit;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: inherit;
  background: inherit;
  outline: none;
  text-align: center;
}

</style>
