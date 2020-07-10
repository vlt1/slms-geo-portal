<template>
  <div class="annotations">
    <div class="annotations-button-panel">
      <div class="annotations-title">{{$t("annotations.title")}}</div>
      <div class="button" @click="togglePanel">
        <icon v-if="open" name="angle-up"/>
        <icon v-else name="angle-down"/>
      </div>
    </div>
    <div v-if="open" class="annotations-panel">
      <div class="geometry-types-selection">
        <div v-for="(geomType, idx) in geometryTypes"
          :key="geomType"
          class="selector-button"
          :class="{active: curGeomType === geomType, last: idx === geometryTypes.length - 1}"
          @click="curGeomType = geomType">
          {{$t(`annotations.geomTypes.${geomType}`)}}
        </div>
      </div>
      <div class="feature-list">
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Icon from 'vue-awesome/components/Icon'

import 'vue-awesome/icons/angle-down'
import 'vue-awesome/icons/angle-up'

import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Draw, { createBox } from 'ol/interaction/Draw'

let source
let layer
let interaction

export default {
  components: {
    Icon
  },
  props: {
    map: Object
  },
  data: () => {
    const geometryTypes = ['circle', 'triangle', 'rectangle']

    return {
      curGeomType: geometryTypes[0],
      open: false,
      geometryTypes
    }
  },
  mounted() {
    source = new VectorSource({
      wrapX: false
    })
    layer = new VectorLayer({
      source: this.source,
      map: this.map
    })
  },
  watch: {
    curGeomType(curGeomType) {
      if (this.open) {
        this.createInteraction(curGeomType)
      }
    },
    open(open) {
      if (open) {
        this.createInteraction(this.curGeomType)
      }
    }
  },
  methods: {
    ...mapMutations({
      'setAnnotationsGeoJSON': 'set_annotations_geojson'
    }),

    togglePanel() {
      this.open = !this.open
    },

    toggleLayer() {
      layer.setVisible(!layer.getVisible())
    },

    clearAnnotations() {
      source.clear()
    },

    createInteraction(geomType) {
      if (interaction) {
        this.map.removeInteraction(interaction)
      }

      let options
      switch (geomType) {
        case 'circle':
          options = {
            type: 'Circle'
          }
          break
        case 'triangle':
          options = {
            type: 'Polygon',
            geometryFunction: (coordinates, geometry) => {
              console.log('coordinates', geometry)
              return geometry
            }
          }
          break
        case 'rectangle':
          options = {
            type: 'Circle',
            geometryFunction: createBox()
          }
          break
        default:
          options = null
      }

      if (options) {
        interaction = new Draw({
          source,
          ...options
        })
        interaction.on('drawend', (...args) => {
          console.log('drawend', args)
        })
        this.map.addInteraction(interaction)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";

.annotations {
  margin-left: 10px;
  background: $transparent-panel-background;
  border-radius: 5px;
  backdrop-filter: blur(5px);
}
.annotations-button-panel {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: bold;
  color: white;
  min-height: 45px;
}
.annotations-title {
  flex-grow: 1;
  justify-content: center;
  padding: 0px 10px 0px 10px;
  line-height: 45px;
  text-align: center;
}
.annotations-button-panel > .button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 10px 0px 10px;
  border-left: 1px solid white;
  background-color: transparent;
  font-size: 30px;
  min-height: 0;
}
.annotations-button-panel > .button:hover {
  color: $highlight-color;
  cursor: pointer;
}
.annotations-panel {
  padding: 10px;
}
.geometry-types-selection {
  display: flex;
  color: white;
  padding: 0 6px 0 6px;
}
.selector-button {
  border: 1px solid transparent;
  margin-right: 16px;
  padding: 8px;
  border-radius: 8px;
  font-size: 14px;
}
.selector-button:hover {
  border-color: $highlight-color;
  cursor: pointer;
}
.selector-button.active {
  border-color: white
}
.selector-button.last {
  margin: 0;
}
</style>
