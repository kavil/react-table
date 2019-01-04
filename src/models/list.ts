// import fetch from 'dva/fetch';
// 这里我就不写services 直接request了
import { requestApi } from '../services/api';

export default {

  namespace: 'listModel',

  state: {
    List: {
      list: [],
      pagination: {
        current: 1,
        pageSize: 10,
        showTotal: total => `共${total}条`,
      },
    },
    ListParams: { // filter 参数都放这
      name: null,
      type: null,
    },

  },

  effects: {
    *List(_, { call, put, select }) {
      const { ListParams, List } = yield select(state => state.listModel);

      const page = List.pagination.current;
      const size = List.pagination.pageSize;

      const res = yield call(requestApi, { ...ListParams, page, size });
      yield put({
        type: 'save',
        payload: {
          List: {
            list: res.data.list,
            pagination: { ...List.pagination, total: res.data.count },
          },
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
