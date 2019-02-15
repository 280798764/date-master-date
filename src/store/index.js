/* Vuex Store */
import Vue from 'vue'
import Vuex from 'vuex'

import common from './stores/common'
import file from './stores/file'
import homepage from './stores/homepage'
import device from './stores/device'
import login from './stores/login'
import systemBig from './stores/systemBig'
import equipmentOperation from './stores/equipmentOperation'
import systemMall from './stores/systemMall'
import typalMap from './stores/typalMap'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    common,
    file,
    homepage,
    device,
    login,
    systemBig,
    equipmentOperation,
    systemMall,
    typalMap
  }
})
