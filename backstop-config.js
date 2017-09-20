const backstopConfig = {
    'id'        : 'visual_test',
    'viewports' : [
  // {
  //     "name": "phone",
  //     "width": 320,
  //     "height": 480
  // },
  // {
  //     "name": "tablet_v",
  //     "width": 568,
  //     "height": 1024
  // },
  // {
  //     "name": "tablet_h",
  //     "width": 1024,
  //     "height": 768
  // },
        {
            'name'   : 'desktop',
            'width'  : 1280,
            'height' : 800
        }
    ],
    "asyncCaptureLimit": 10,
    'misMatchThreshold' : "0.3",
    'scenarios'         : [  ],
    'asyncCompareLimit' : 100,
    'paths'             : {
        'bitmaps_reference' : 'backstop_data/bitmaps_reference',
        'bitmaps_test'      : 'backstop_data/bitmaps_test',
        'html_report'       : 'backstop_data/html_report',
        'ci_report'         : 'backstop_data/ci_report'
    },
    'engine'      : 'chrome',
    'report'      : [ 'CI', 'browser' ],
    'debug'       : false
};

module.exports = backstopConfig;
