import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedId: 1,
    filter: '',
    accessLevels: [
      {
        id: 1,
        name: 'Morning 9:00 - 10:00',
        readerId: 10,
        Description: 'Morning Front door Access'
      },
      {

        id: 2,
        name: 'Morning 10:00 - 11:00',
        readerId: 11,
        Description: ''
      },
      {
        id: 3,
        name: 'Morning 11:00 - 12:00',
        readerId: 12,
        Description: ''
      },
      {
        id: 4,
        name: 'Evening 3:00 - 4:00',
        readerId: 13,
        Description: ''
      },
      {
        id: 5,
        name: 'Evening5:00 - 6:00',
        readerId: 14,
        Description: ''
      },
      {
        id: 6,
        name: 'All Day Elevator',
        readerId: 15,
        Description: ''
      },
      {
        id: 7,
        name: 'All Day Back Door',
        readerId: 16,
        Description: ''
      },
      {
        id: 8,
        name: 'All Day Supply Door',
        readerId: 17,
        Description: ''
      }
    ],
    readers: [
      {

        id: 10,
        typeId: 1,
        name: 'Reader F1'
      },
      {
        id: 11,
        typeId: 1,
        name: 'Reader F2'
      },
      {
        id: 12,
        typeId: 1,
        name: 'Reader F3'
      },
      {
        id: 13,
        typeId: 1,
        name: 'Reader F4'
      },
      {
        id: 14,
        typeId: 1,
        name: 'Reader F5'
      },
      {
        id: 15,
        typeId: 2,
        name: 'Reader E'
      },

      {
        id: 16,
        typeId: 3,
        name: 'Reader B'
      },
      {
        id: 17,
        typeId: 4,
        name: 'Reader S'
      }
    ],
    readerTypes: [
      {
        id: 1,
        name: 'Front Door'
      },
      {
        id: 2,
        name: 'Elevator Door'
      },
      {
        id: 3,

        name: 'Back Door'
      },
      {
        id: 4,
        name: 'Supply Door'
      }
    ]
  },
  getters:{
    selected(state, getters){
      const selectedId = state.selectedId;
      if(selectedId === null){
        return null;
      }
      return state.accessLevels.find( level => level.id === selectedId);
    },
    getReader(state){
      return (id) => {
        return state.readers.find(item => item.id === id);
      }
    },
    visibleLevels(state, getters){
      return state.accessLevels.filter(item => {
        if(!state.filter){
          return true;
        }
        const filter = new RegExp(state.filter, "i")
        if(item.name.match(filter)){
          return true;
        }
        const reader = getters.getReader(item.readerId);
          if(reader.name.match(filter)){
              return true;
          }

        const readerType = getters.readerTypes.find( item => item.id === reader.typeId);
        if( readerType.name.match(filter)){
          return true;
        }
        return false;
      })
    },
    readerTypes(state){
      return state.readerTypes;
    }
  },
  mutations: {
    save(state, payload){
      const selectedId = state.selectedId;
      if(selectedId === null){
        return;
      }
      let selected = state.accessLevels.find( level => level.id === selectedId);
      selected.name = payload.name;
      selected.Description = payload.Description;
      selected.readerId = payload.readerId - 0;
    },
    selSelected(state, payload){
      state.selectedId = payload;
    },
    setFilter(state, payload){
      state.filter = payload;
      state.selectedId = null;
    }
  },
  actions: {},
  modules: {}
})
