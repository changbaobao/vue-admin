import request from '@/utils/request'
import api from './index'


export function login(params) {
    return request({
        url: api.Login,
        method: 'post',
        params
    })
}