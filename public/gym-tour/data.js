var APP_DATA = {
  "scenes": [
    {
      "id": "0-sala-de-estiramiento",
      "name": "Sala de estiramiento",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 896,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.8588908978554564,
          "pitch": 0.18828535725808848,
          "rotation": 0,
          "target": "2-gym"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-salon-de-yoga",
      "name": "salon de yoga",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 896,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [],
      "infoHotspots": []
    },
    {
      "id": "2-gym",
      "name": "gym",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 896,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 1.0041811866154262,
          "pitch": 0.14699154434695672,
          "rotation": 0,
          "target": "0-sala-de-estiramiento"
        },
        {
          "yaw": 2.289862548910211,
          "pitch": 0.1494398623456803,
          "rotation": 0,
          "target": "6-casilleros"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-mesas",
      "name": "mesas",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 896,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [],
      "infoHotspots": []
    },
    {
      "id": "4-entrada",
      "name": "entrada",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 896,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.47171493575033274,
          "pitch": 0.023772961000398496,
          "rotation": 0,
          "target": "6-casilleros"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-camino",
      "name": "camino",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 896,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0,
          "pitch": 0,
          "rotation": 0,
          "target": "1-salon-de-yoga"
        },
        {
          "yaw": 2.4087617097090046,
          "pitch": 0.04821989206626753,
          "rotation": 0,
          "target": "3-mesas"
        },
        {
          "yaw": -2.254430960412712,
          "pitch": 0.0006517771452649868,
          "rotation": 0,
          "target": "6-casilleros"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "6-casilleros",
      "name": "casilleros",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 896,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.04765794232613807,
          "pitch": 0.27446901174368676,
          "rotation": 0,
          "target": "4-entrada"
        },
        {
          "yaw": -0.7732873349916929,
          "pitch": 0.4753976099003996,
          "rotation": 0,
          "target": "2-gym"
        },
        {
          "yaw": -3.0828879020036,
          "pitch": 0.14212114734383263,
          "rotation": 0,
          "target": "5-camino"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
};
