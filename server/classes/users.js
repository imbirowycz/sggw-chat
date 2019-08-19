class Users {
    constructor () {
        this.users = [];
    }
    add (user) {
        this.users.push(user)
    }
    getUserById (id) {
        return this.users.find(x => x.id == id)
    }
    remove (id) {
        const userR = this.getUserById(id)
        if (userR) 
        this.users = this.users.find(z => z.id !== id)
        else return userR
    }
    getByRoom (room) {
        return this.users.find(x => x.room == room)
    }
}
module.exports = function () {
    return new Users()
}