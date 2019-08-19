import store from '@/store/store';

export default function (to, from, next) {
    let locStor = localStorage.getItem("userChat");
    if (store.getters['user/userGet'] != null) {
        next(true)
    }else if (locStor != null) {
        store.commit('user/userCreate',JSON.parse(locStor))
        next(true)
    }else {
        next('/login')
    }
}