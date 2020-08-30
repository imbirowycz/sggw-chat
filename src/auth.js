import store from '@/store/store';

export default function (to, from, next) {
    // next(true)
    let locStor = localStorage.getItem("userChat");
    if (store.getters['user/userGet'] != null) {
        next(true)
    }else if (locStor != null) {
        store.commit('user/userCreate',JSON.parse(locStor).user)
        next(true)
    }else {
        next('/login')
    }
}