const { instancesQuery } = require('./queries')
const { startInstance, stopInstance } = require('./mutations')

module.exports = apolloClient => ({
    list: () => new Promise((resolve, reject) => {
        apolloClient.query({ query: instancesQuery })
            .then(res => resolve(res.data.instances))
            .catch(reject);
    }),
    start: (name, appName, appVersion) => new Promise((resolve, reject) => {
        const variables = { name, appName, appVersion }
        apolloClient.mutate({ mutation: startInstance, variables })
            .then(res => resolve(res.data.startInstance))
            .catch(reject)
    }),
    stop: name => new Promise((resolve, reject) => {
        const variables = { name }
        apolloClient.mutate({ mutation: stopInstance, variables })
            .then(res => resolve(res.data.stopInstance))
            .catch(reject)
    }),
})