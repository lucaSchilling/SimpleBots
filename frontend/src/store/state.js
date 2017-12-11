export default {
  _id: null,
  name: null,
  template: 'Welcome Bot',
  lastedit: null,
  welcomeMessage: null,
  options: [],
  bots: [],
  history: [{
    'template': 'FAQ Bot',
    'name': 'faqBot',
    'initialVersionId': '1.0',
    'intents': [
      {
        'name': 'getWeather',
        'message': 'Heute ist es überwiegend bewölkt bei 0° bis 3° Celsius.'
      },
      {
        'name': 'getAddress',
        'message': 'Sie finden uns in der ABC-Str. 8a, 12345 Beispielstadt.'
      }
    ],
    'entities': [
      {
        'name': 'Weather'
      },
      {
        'name': 'Address'
      }
    ],
    'examples': [
      {
        'text': 'Ich möchte Ihre Adresse wissen',
        'intentName': 'getAddress',
        'entityLabels': [
          {
            'entityName': 'Address',
            'startCharIndex': 16,
            'endCharIndex': 22
          }
        ]
      },
      {
        'text': 'Wie lautet Ihre Adresse?',
        'intentName': 'getAddress',
        'entityLabels': [
          {
            'entityName': 'Address',
            'startCharIndex': 16,
            'endCharIndex': 22
          }
        ]
      },
      {
        'text': 'Wie ist das Wetter heute?',
        'intentName': 'getWeather',
        'entityLabels': [
          {
            'entityName': 'Weather',
            'startCharIndex': 12,
            'endCharIndex': 17
          }
        ]
      },
      {
        'text': 'Wie ist die aktuelle Wetterlage?',
        'intentName': 'getWeather',
        'entityLabels': [
          {
            'entityName': 'Weather',
            'startCharIndex': 22,
            'endCharIndex': 31
          }
        ]
      }
    ]
  },
  {
    'template': 'FAQ Bot',
    'name': 'faqBot',
    'initialVersionId': '1.0',
    'intents': [
      {
        'name': 'getWeather',
        'message': 'Heute ist es überwiegend bewölkt bei 0° bis 3° Celsius.'
      },
      {
        'name': 'getAddress',
        'message': 'Sie finden uns in der ABC-Str. 8a, 12345 Beispielstadt.'
      }
    ],
    'entities': [
      {
        'name': 'Weather'
      },
      {
        'name': 'Address'
      }
    ],
    'examples': [
      {
        'text': 'Ich möchte Ihre Adresse wissen',
        'intentName': 'getAddress',
        'entityLabels': [
          {
            'entityName': 'Address',
            'startCharIndex': 16,
            'endCharIndex': 22
          }
        ]
      },
      {
        'text': 'Wie lautet Ihre Adresse?',
        'intentName': 'getAddress',
        'entityLabels': [
          {
            'entityName': 'Address',
            'startCharIndex': 16,
            'endCharIndex': 22
          }
        ]
      },
      {
        'text': 'Wie ist das Wetter heute?',
        'intentName': 'getWeather',
        'entityLabels': [
          {
            'entityName': 'Weather',
            'startCharIndex': 12,
            'endCharIndex': 17
          }
        ]
      },
      {
        'text': 'Wie ist die aktuelle Wetterlage?',
        'intentName': 'getWeather',
        'entityLabels': [
          {
            'entityName': 'Weather',
            'startCharIndex': 22,
            'endCharIndex': 31
          }
        ]
      }
    ]
  }],
  i: null,
  intents: [],
  entities: [],
  examples: [],
  active: 'first',
  first: false,
  second: false,
  third: false,
  forth: false,
  fifth: false,
  sixth: false,
  treeData: {
    isRoot: true,
    options: [{
      message: '',
      redirect: null,
      options: null
    }]}
}
