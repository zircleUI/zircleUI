<script>
import store from '../store/store'
export default {
  props: {
    distance: {
      type: Number,
      default: 100
    },
    angle: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: 'small'
    },
    color: {
      type: String,
      default: 'default'
    },
    gotoview: {
      type: [String, Number]
    }
  },
  data () {
    return {
      state: store.state,
      store: store
    }
  },
  computed: {
    // debido a que es responsive se tiene que recalcular las posiciones.
    // quizas se puede armar otra cosa con clases para tipo grid concentrico
    position () {
      return this.store.point(this)
    },
    classes () {
      return {
        // Colores
        default: this.color === 'default' || 'default',
        // defaultboton: this.color === 'default',
        green: this.color === 'green',
        red: this.color === 'red',
        yellow: this.color === 'yellow',
        gray: this.color === 'gray',
        // previuos view settings
        prevclass: this.view === this.state.previousView,
        hidden: this.$parent.view === this.state.previousView
        // responsive animation. solo para current view
        // animation: this.view === this.state.currentView || this.$parent.view === this.state.currentView
      }
    }
  }
}
</script>

<style>
.zui{
overflow:visible;
position: absolute;
display: block;
border-radius:50%;

top: 50%; left: 50%;
text-align: center;
}
.main{
z-index:40;
}
.disc{
z-index:80;
}
.pop {
  z-index:500;
}
.scroll {
  overflow: hidden;
  border-radius: 50%;
  z-index: 50;
  position: absolute;
  display: block;
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
.slider{
  overflow: hidden;
  border-radius: 50%;
  z-index: 40;
  position: absolute;
  display: block;
}
.plate{
position:absolute;
z-index:0;
top: -12%;
left: -12%;
width:124%;
height:124%;
padding: 1%;
display:block;
border-radius:50%;
background:transparent;
border: 1px dashed gray;
opacity: 0.3;
overflow:hidden;
}
.alert{
z-index:100;
background:red;
border: 1px dashed gray;
opacity: 0.3;
overflow:hidden;

}
.navplate {
position:absolute;
z-index:90;
top: -50%;
left: -50%;
width:200%;
height:200%;
padding: 1%;
display:block;
border-radius:50%;
background:transparent;
border: 1px dashed green;
overflow:hidden;
}
.contentbox{
position:absolute;
z-index:50;
top: 2%;
left: 2%;
width:96%;
height:96%;
padding: 1%;
display:block;
border-radius:50%;
background:none;
overflow:hidden;

}
::-webkit-scrollbar { 
    display: none; 
}
::-moz-scrollbar { 
    display: none; 
}
.flow{
  overflow: visible;
}
.content{
position:absolute;
z-index:0;
top: 1%;
left: 1%;
width:98%;
height:98%;
display:flex;
background:none;
flex-direction:column;
align-items:center;
justify-content:center;
overflow-y:scroll;
border-radius:50%;
user-select: none;
}
.longtext{
display:block;
padding-top: 100px;
width:105%;
padding-right: 18px;
margin-right: -18px;
line-height: 1.5;
font-size: 14px;
}
.bottom {
  height: 0
}
.longtext > .bottom {
  height: 140px
}
.longtext > div > p {
  margin-top: 0em;
  margin-bottom: 2em;
}
  .animation {
    transition-delay: 260ms;
    transition-duration: 300ms;
    transform-style: preserve-3d;
    transition-timing-function: cubic-bezier(0.91,-0.54,0.29,1.56);
  }
  .nodisplay {
    display: none;
  }
  .dashed {
   border: 1px dashed gray;
 }

 .default{
  background-color: white;
  border: 1px solid gray;
  color: gray;
}
.defaultboton{
}
.red{
  stroke: red;
  color: #4D6B79;
}
.prevclass{
  opacity: 0.7; 
  filter: blur(1.5px);
  
}
.prevclass > div.plate{
 visibility: hidden;
}
.prevclass > section > section{
 visibility: hidden;
}
.prevclass > div.dashed{
 border: 0px dashed gray;
}
.hidden {
}
@keyframes blurIn {
  0% {opacity: 1; filter: blur(0px);}
  80% {opacity: 1; filter: blur(0px);}
  100% {opacity: 0.7; filter: blur(2px);}
}
.green{
  background-color: green;
  border: 1px solid green;
}

.yellow{
  background-color: yellow;
}
.gray{
  background-color: #c4c4c4;
  border: none;
}


</style>
