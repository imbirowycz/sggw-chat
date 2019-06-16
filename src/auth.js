import store from '@/store/store';

export default function (to, from, next) {
    // console.log(store.getters['user/userGet'])
    let locStor = localStorage.getItem("userChat");
    if (store.getters['user/userGet'] != null) {
        if (locStor == null) localStorage.setItem("userChat", JSON.stringify(store.getters['user/userGet']))
        next(true)
    }else if (locStor != null) {
        console.log('mutations: ', store)
        store.commit('user/userCreate',JSON.parse(locStor))
        next(true)
    }else {
        next('/login')
    }
}