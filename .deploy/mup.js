module.exports = {
    servers: {
        one: {
            host: 'TODO place hostname or IP of the server that will be running the portal (it should have Docker installed)',
            username: 'TODO username for the above',
            pem: 'TODO ssh key for the above'
        }
    },

    meteor: {
        name: 'airly-dev-portal',
        path: '../',
        port: 9090,
        servers: {
            one: {},
        },
        buildOptions: {
            serverOnly: true,
        },
        env: {
            ROOT_URL: 'https://apiportal.airly.eu/ TODO change me',
            MONGO_URL: 'mongodb://localhost/meteor',
            PORT: 9090,
        },

        dockerImage: 'abernix/meteord:base',
        deployCheckWaitTime: 60,

        enableUploadProgressBar: true
    },

    mongo: {
        oplog: true,
        port: 27017,
        version: '3.4.1',
        servers: {
            one: {},
        },
    },
};
