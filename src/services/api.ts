
import Mock from 'mockjs';

const data = () => Mock.mock({
  'success': true,
  'data': {
    'count': 51,
    'list|10': [{
      'id': 1,
      'name': '',
      'url': '@url',
      'email': '@email演示用演示用演示用演示用演示用演示用演示用演示用演示用演示用email演示用演示用演示用演示用演示用演示用演示用演示用演示用演示用email演示用演示用演示用演示用演示用演示用演示用演示用演示用演示用email演示用演示用演示用演示用演示用演示用演示用演示用演示用演示用email演示用演示用演示用演示用演示用演示用演示用演示用演示用演示用email演示用演示用演示用演示用演示用演示用演示用演示用演示用演示用',
      'address': '@county(true)',
      'string|1-10': '★',
      'number|1-100': 100,
      'number2|1-100': 100,
      'number3|1-100': 100,
      'boolean|1-2': true,
      'object|2': {
        '310000': '上海市',
        '320000': '江苏省',
        '330000': '浙江省'
      }
    }]
  }
});

export const requestApi = () => new Promise((resolve) => {
  resolve(data());
});