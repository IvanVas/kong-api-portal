import {Template} from 'meteor/templating';

import './main.html';

Template.apiKey.onCreated(function helloOnCreated() {
    Meteor.subscribe('user');
});

Template.apiKey.helpers({
    showGetAccessButton() {
        return Meteor.user() && isVerified(Meteor.user()) && !Meteor.user().key;
    },

    notLoggedIn() {
        return !Meteor.user();
    },

    notVerified() {
        return !(Meteor.user() && isVerified(Meteor.user()));
    },

    accessKey() {
        return Meteor.user() && Meteor.user().key;
    },
});


Template.apiKey.events({
    'click #getAccess'(event, instance) {
        event.preventDefault();
        $('#tosModal').modal('show');
    },

    'click #accept'(event, instance) {
        event.preventDefault();
        Meteor.call('keys.create', function (error, result) {
            $('#tosModal').modal('hide');
            if (error && error.error) {
                alert("Error occured: " + error.reason);
            }
        });
    },

    'click #acceptedCheckbox'(event, insance) {
        let checked = $(event.target).is(":checked");
        $('#accept').prop('disabled', !checked);
    }
});


