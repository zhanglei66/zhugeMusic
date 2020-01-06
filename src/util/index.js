import axios from 'axios'

const _url = 'http://localhost:3000/'

let get = (__url, params) => {
    return new Promise( (resolve, reject) => {
        let url = _url + __url
        axios.get(url, {params: params})
        .then( response => {
            resolve(response.data)
        }).catch( error => {
            console.log(error)
            reject('网络出错')
        })
    }).catch( e => {})
}

let post = (__url, params) => {
    return new Promise( (resolve, reject) => {
        let url = _url + __url
        axios.post(url, params)
        .then( response => {
            if(response.statusCode === 200) {
                resolve(response)
            } else {
                reject(response.data)
            }
        }).catch( error => {
            console.log(error)
            reject('网络出错')
        })
    }).catch( e => {})
}

export default {post, get}