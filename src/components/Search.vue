<template>
  <div id='search'>
    <form v-on:submit.prevent='noop'>
      <input type='text' v-model='searchText' v-on:keyup='goSearching' />
      <br /><br />
    </form>
    <div id='search-results' class='columns' v-if="results.length">
      <button type="button" class="close" aria-label="Close" @click="(results = [])">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class='column'>
        <search-results v-for='result in results' v-bind="{result, clickHandler}" :key='result.id'/>
      </div>
    </div>
  </div>
</template>

<script>
/* global ol */
import httpRequest from '../httpRequest'
import SearchResult from './SearchResult'
import map from '../map'
import { wfsSearchConfig } from 'config'

export default {
  data: function() {
    return {
      searchText: '',
      results: []
    }
  },
  mounted: function() {
    this.$nextTick(function() {
    })
  },
  watch: {
  },
  methods: {
    clickHandler: function(clickedObject) {
      if (clickedObject && clickedObject.location) {
        map.getView().animate({ zoom: 12 }, { center: ol.proj.fromLonLat(clickedObject.location) })
      }
    },
    goSearching: function(e) {
      // React to Enter key press
      if (e.keyCode === 13) {
        this.wfsSearch(this.searchText)
      }
    },
    noop() {
      // do nothing
    },
    wfsSearch(searchterm) {
      if (wfsSearchConfig.layersToQuery.lenght !== wfsSearchConfig.attributesToFilter.lenght) {
        alert('WFS Search attributes list lenght does not match the number of layers to query.\nPlease contact your system administrator')
        return
      }
      const typeNameList = wfsSearchConfig.layersToQuery.join()
      const cqlFilterString = encodeURI(wfsSearchConfig.attributesToFilter.join(' ILIKE \'%' + searchterm + '%\';') + ' ILIKE \'%' + searchterm + '%\'')
      const params = 'outputFormat=application/json&maxfeatures=10&typeName=' + typeNameList + '&cql_filter=' + cqlFilterString
      const url = wfsSearchConfig.baseURL + '?service=WFS&version=1.1.0&request=GetFeature&' + params

      httpRequest('GET', url).then(response => {
        const wfsResponse = JSON.parse(response)

        if (wfsResponse.features) {
          this.results = []
          wfsResponse.features.forEach(function(element) {
            if (element.geometry && element.geometry.coordinates && element.properties && element.id) {
              const newres = {}
              wfsSearchConfig.layersToQuery.forEach(function(layer, idx) {
                const featureTypeString = (layer.indexOf(':') > -1) ? layer.split(':')[1] : layer
                if (element.id.indexOf(featureTypeString) > -1) {
                  newres.fromtable = layer
                  newres.title = element.properties[wfsSearchConfig.attributesToFilter[idx]]
                }
              })

              if (element.geometry.type.indexOf('olygon') > -1) {
                newres.location = element.geometry.coordinates[0][0][0]
              } else if (element.geometry.type.indexOf('Point') > -1) {
                newres.location = element.geometry.coordinates
              } else {
                newres.location = element.geometry.coordinates[0][0]
              }
              this.results.push(newres)
            }
          }, this)
        }
      })
      .catch(err => {
        alert('Error WFS\n' + err)
      })
    }
  },
  components: {
    'search-results': SearchResult
  }
}
</script>

<style scoped>
  #search {
    position: absolute;
    top: 108px;
    right: 60px;
  }

  #search-results {
    height: 100%;
    padding-top: 10px;
    background: #e6ecf1;
  }

  .close {
    position: absolute;
    right: 0;
  }
</style>
