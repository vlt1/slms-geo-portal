window.globalConf = {
  languages: [
    { id: 'en', 'label': 'English' },
    { id: 'nl', 'label': 'Nederlands' },
    { id: 'srn', 'label': 'Sranan Tongo' }],
  map: {
    bingMapsKey: 'ArXO9BbbCsJXDlX8dLLxcI5BhFPTPrKBdg9o-BNWvC8kJFTetsc96izVu0415SDy',
    mapCenterLonLat: [-56.6235353, 4.008795],
    mapZoom: 7,
    defaultGeoServerURLs: [
      'https://gonini.org/geoserver/wms'
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
    askForEmail: true,
    feedbackUrl: 'https://gonini.org/feedback',
    drawOptions: [
      'Point'
    ],
    drawDefault: 'Point'
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
  },
  wfsSearchConfig: {
    layersToQuery: ['gonini:infrastructuur_table', 'gonini:terreinen', 'gonini:settlements', 'gonini:Hydrography_Name', 'gonini:terreinen'],
    attributesToFilter: ['str_naam', 'cc_code', 'name', 'name', 'naam'],
    baseURL: 'geoserver/ows'
  }
}
