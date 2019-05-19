import store from '@/store/store';

export default function (to, from, next) {
    // console.log(store.getters['user/userGet'])
    if (store.getters['user/userGet'] != null) {
        next(true)
    }else {
        next('/login')
    }
}