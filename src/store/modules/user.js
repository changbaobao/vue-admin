import { login } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import Layout from '@/layout'
const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: ''
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    }
}

const actions = {
    // 用户登录
    login({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            login(userInfo).then(response => {
                const { data } = response.data
                commit('SET_TOKEN', data.token)
                commit('SET_NAME', data.name)
                setToken(data.token)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    /**
     * @param {动态路由}
     * @param {获取侧边栏路由} 
     */
    GenerateRoutes({ commit, state }) {
        return new Promise((resolve, reject) => {
            let routerArr = [{
                name: 'example',
                path: '/example',
                children: [{
                    name: 'table',
                    path: '/table'
                }, {
                    name: 'tree',
                    path: '/tree'
                }]
            }]
            filterAsyncRoutes(routerArr)

        })
    },

    // 退出登录
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('SET_NAME', '')
            commit('SET_TOKEN', '')
            removeToken() // must remove  token  first
            resetRouter()
            commit('RESET_STATE')
            resolve()
        })
    },

    // 删除 token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}


/**
 * 
 * @param 格式化routes
 * @param routes
 */
function filterAsyncRoutes(routes) {
    let routeArr = []
    routes.map(item => {
        const { name, path } = item
        const param = {
            name: name,
            path: path,
            meta: { title: name, icon: 'example' }
        }
        if (item.children) {
            param.component = Layout
            param.children = item.children.map(v => {
                // return {
                //     name: v.name,
                //     path: v.name,
                //     component: () =>
                //         import (`@/views/${v.name}/index.vue`),
                //     meta: { title: v.name, icon: example }
                // }
            })
        } else {

        }
        routerArr.push(param)

    })
}



export default {
    namespaced: true,
    state,
    mutations,
    actions
}