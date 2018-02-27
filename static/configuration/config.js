window.globalConf = {
  languages: [
    { id: 'en', 'label': 'English' },
    { id: 'nl', 'label': 'Nederlands'},
    { id: 'srn', 'label': 'Sranan Tongo'}],
  map: {
    bingMapsKey: 'ArXO9BbbCsJXDlX8dLLxcI5BhFPTPrKBdg9o-BNWvC8kJFTetsc96izVu0415SDy',
    mapCenterLonLat: [-56.6235353, 4.008795],
    mapZoom: 7,
    defaultGeoServerURLs: [
      'http://rdc-snsf.org/diss_geoserver/wms',
      'http://168.195.218.144/geoserver/wms'
    ]
  },
  layersConfigApi: {
    baseUrl: '/api/',
    loginUrl: 'sessions/create',
    getLayersConfigUrl: 'layers.json',
    saveLayersConfigUrl: 'protected/layers_conf/save/',
    getLayersConfigHisoryUrl: 'protected/layers_conf/versions',
    restoreVersionUrl: 'protected/layers_conf/restore_version'
  },
  feedbackApi: {
    feedbackUrl: 'http://localhost:3001/feedback',
    feedbackCategories: [
      'Thematic mapping and Monitoring',
      'Forest Offences',
      'Information Dissemination (RTI)'
    ]
  },
  logos: {
    ul: 'flag.gif',
    ll: [
      {
        imgUrl: '/static/configuration/logos/unredd.png',
        link: 'http://www.unredd.net/',
        size: { height: 35 }
      },
      {
        text: '@Goninigeoportaal',
        link: 'https://www.facebook.com/Goninigeoportaal/',
        size: { height: 35 }
      }
    ]
  }
}
