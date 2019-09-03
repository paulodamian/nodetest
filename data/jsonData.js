const axios = require('axios');
const _ = require('lodash');

let self = module.exports = {
    policies: [],
    users: [],
    initData: async () => {
        try {
            let p = await axios.get('http://www.mocky.io/v2/580891a4100000e8242b75c5');
            let u = await axios.get('http://www.mocky.io/V2/5808862710000087232b75ac');
            self.policies = p.data.policies;
            self.users = u.data.clients;
        } catch (err) {
            console.log(err);
        }
    },
    getUser: (userId) => {
        return _.find(self.users, {'id':userId});
    },
    getUserByProperty: (field, value) => {
        let matches = _.find(self.users, (o) => {
            return o[field].toLowerCase() == value.toLowerCase();
        });
    
        if (!matches) {
            const err = new Error('User not found!');
            err.statusCode = 404;
            throw err;
        }
    
        return matches;
    },
    getPolicy: (policyId) => {
        return _.find(self.policies, {'id':policyId});
    },
    getUserPolicies: (user) => {
        return _.filter(self.policies, {'clientId':user.id});
    }
};