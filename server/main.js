import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http'

// TODO set MAIL_URL to your SMTP server (including authentication if required).
const kongCredentials = process.env.KONG_CREDENTIALS; // TODO set the environment variable KONG_CREDENTIALS to "changeme_kong_user:changeme_kong_pass";
const kongApiRootUrl = process.env.KONG_API_ROOT_URL; // TODO set your kong admin API root (e.g. https://your.site/kong/)

function configMail() {
    Accounts.config({
        sendVerificationEmail: true,
        forbidClientAccountCreation: false,
    });
    Accounts.emailTemplates.from = 'Airly Contact \<contact@airly.eu>';
}

configMail();

Accounts.onCreateUser(function(options, user) {
    if (user.services.github) options.profile.name = user.services.github.username;
    user.profile = options.profile;
    return user;
});

function getEmail(user) {
    if (user.emails) return user.emails[0].address;
    if (user.services.github) return user.services.github.email;
    if (user.services.google) return user.services.google.email;
    if (user.services.facebook) return user.services.facebook.email;
    throw new Meteor.Error("no-email-found", "Couldn't find user's email");
}

function registerOnKong(email) {
    try {
        console.log(kongCredentials);
        HTTP.call('POST', `${kongApiRootUrl}/consumers/`, {
            auth: kongCredentials,
            params: {
                username: email
            },
        });
    } catch (e) {
        if (e.response.statusCode === 409) throw new Meteor.Error("email-already-registered", "The email already registered.");
        else throw e;
    }

    const keyResponse = HTTP.call('POST', `${kongApiRootUrl}/consumers/${email}/key-auth`, {
        auth: kongCredentials,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });
    if (keyResponse.statusCode !== 201) throw new Meteor.Error("key-creation-error", "Access key couldn't be created. Please contact administrators");
    else return JSON.parse(keyResponse.content).key;
}

Meteor.methods({
    'keys.create'() {
        if (!Meteor.user() || !isVerified(Meteor.user())) throw new Meteor.Error("access-denied", "Only logged in and verified accounts are allowed.");
        if (Meteor.user().key) throw new Meteor.Error("key-already-exists", "Key already exists.");

        const email = getEmail(Meteor.user());
        const key = registerOnKong(email);
        Meteor.users.update({_id: Meteor.userId()}, {$set: {"key": key}});
        return key;
    }
});

Meteor.publish('user', function userPublication() {
    return Meteor.users.find({_id: this.userId});
});