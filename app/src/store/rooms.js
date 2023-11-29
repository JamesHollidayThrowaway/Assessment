import {send} from '@/api';

export default {
  namespaced: true,
  state: {
    rooms: {}
  },
  mutations: {
    setRoom(state, {ref, doc}) {
      const roomPath = ref.path;
      state.rooms[ref] = { ...doc, path: roomPath };
    },
    setRooms(state, docs) {
      const rooms = {};
      for (const {ref, document} of docs) {
        const roomPath = ref.path;
        rooms[ref.path] = {...document, path: roomPath };
      }
      state.rooms = rooms;
    }
  },
  actions: {
    connected: {
      root: true,
      handler({dispatch}) {
        return dispatch('getAll');
      }
    },
    messageReceived: {
      root: true,
      handler({commit}, msg) {
        if (msg.ref.path.includes('rooms')) {
          if (msg.documents) {
            commit('setRooms', msg.documents);
          } else if (msg.document) {
            commit('setRoom', {ref: msg.ref.path, doc: msg.document});
          }
        }
      }
    },
    getAll() {
      send({
        type: 'get-documents',
        ref: {
          path: 'rooms'
        }
      });
    }
  }
}