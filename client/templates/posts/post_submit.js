Template.postSubmit.onCreated(function() {
    Session.set('postSubmitErrors', {});
});
Template.postSubmit.helpers({
    errorMessage: function(field) {
        return Session.get('postSubmitErrors')[field];
        },
    errorClass: function (field) {
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    }
});
Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        Meteor.call('postInsert', post, function(error, result) {
            // affiche l'erreur à l'utilisateur et s'interrompt
             if (error)
            return alert(error.reason);
            // affiche ce résultat mais route tout de même
            if (result.postExists)
                throwError('This link has already been posted');

            Router.go('postPage', {_id: result._id});
        });
    }
});