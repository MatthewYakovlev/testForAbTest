import RestUtilities from './RestUtilities';


export default class AdminPanelService {
    getUsers() {
        return RestUtilities.get('/api/adminpanel/GetUsers');
    }

    update(user) {
        return RestUtilities.put(`/api/adminpanel/Update/${user.userId}`, user);
    }

    create(user) {
        return RestUtilities.post('/api/adminpanel/CreateUser', user);
    }

    delete(userId) {
        return RestUtilities.delete(`/api/adminpanel/DeleteUser/${userId}`);
    }
}