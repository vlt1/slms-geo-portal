<template>
  <div id="app">
    <mapPane></mapPane>
    <div class="layers">
      <layerSelector></layerSelector>
      <editor-console v-if="showConsole"></editor-console>
    </div>
    <!-- Hide until language is first loaded, to avoid showing i18n placeholders -->
    <!-- Using v-show instead of v-if to optimize image loading -->
    <banner v-show="this.$parent.loaded"></banner>

    <contextInfoModal></contextInfoModal>
    <featureInfo></featureInfo>
    <feedback></feedback>
    <KMLOverlay></KMLOverlay>
    <Logos id="ll_logos" :logosList="llLogos"></Logos>
    <measure></measure>

    <v-dialog />
    
    <modal name="iframe-modal"
         transition="nice-modal-fade"
         :min-width="200"
         :min-height="200"
         :width="710"
         :height="850"
         :delay="100"
         :adaptive="adaptive"
         :resizable="resizable"
         :draggable="draggable">
      <div class="iframe-modal-content">
        <iframe src="static/configuration/loc/en/html/howto.html" width=700px height=840px><b>Welcome to Gonini.org!</b></iframe>
      </div>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'

import Banner from './components/Banner'
import MapPane from './components/MapPane'
import LayerSelector from './components/LayerSelector'
import ContextInfoModal from './components/ContextInfoModal'
import FeatureInfo from './components/FeatureInfo'
import Feedback from './components/Feedback'
import KMLOverlay from './components/KMLOverlay'
import Logos from './components/Logos'
import Measure from './components/Measure'

import { logos } from 'config'

import auth from './auth'

export default {
  name: 'app',
  components: {
    Banner,
    MapPane,
    LayerSelector,
    ContextInfoModal,
    FeatureInfo,
    Feedback,
    KMLOverlay,
    Measure,
    Logos
    // EditorConsole
  },
  data() {
    return {
      user: auth.user,
      showConsole: false,
      llLogos: logos.ll,
      resizable: true,
      adaptive: true,
      draggable: false
    }
  },
  created() {
    this.$store.dispatch('fetchLayersConfig')
    if (this.user.authenticated) this.loadEditor()
  },
  watch: {
    'user.authenticated'() {
      if (this.user.authenticated) this.loadEditor()
      else this.showConsole = false
    }
  },
  mounted() {
    // this.showBasicDialog();
    this.show(true, true, false)
  },
  methods: {
    loadEditor() {
      require.ensure(['./components/edit/EditorConsole'], require => {
        Vue.component('EditorConsole', require('./components/edit/EditorConsole'))
        this.showConsole = true
      }, 'editing-chunk')
    },
    showBasicDialog() {
      this.$modal.show('dialog', {
        text: '<b>Welcome to Gonini.org!</b>'
      })
    },
    show(resizable, adaptive, draggable) {
      this.resizable = resizable
      this.adaptive = adaptive
      this.draggable = draggable
      /*
        $nextTick is required because the data model with new
        "resizable, adaptive, draggable" values is not updated yet.. eh
      */
      this.$nextTick(() => {
        this.$modal.show('iframe-modal')
      })
    }
  }
}
</script>

<style lang="scss">
@import "./assets/global.scss";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
html {
  height: 100%;
}
body {
  /* min-height: 100%; */
  height: 100%;
  overflow: hidden;
  background: url(assets/page-background.jpg) repeat 0 0;
}
.layers {
  position: absolute;
  top: $banner-height + 8px;
  left: 8px;
}
#ll_logos {
  position: absolute;
  bottom: 10px;
  left: 0px;
}
</style>
