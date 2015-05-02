import DS from 'ember-data';

export default DS.Adapter.extend({
    findAll: function () {
        return this.find.apply(this, arguments);
    },
    findQuery: function () {
        return this.find.apply(this, arguments);
    },
    find: function(store, type, query, snapshot) {
        console.log("QUERY", query);

        // query represents the kind of query we want to run against
        // the CloudCMS repository.  See CloudCMS documentation.
        // This is very, very powerful and flexible.

        // since the model can handle promises, we return a promise
        // that is fulfilled by a query to the CloudCMS server.
        return new Ember.RSVP.Promise(function (resolve, reject) {
            Gitana.connect(GITANA_CREDENTIALS, function () {
                this.datastore("content")
                .trap(function(err) {
                    // if anything downstream on this chain throws, this trap
                    // function will catch it and we'll log it here.
                    console.log(err);
                    return false;
                })
                .readBranch("master")
                .queryNodes(query).then(function () {
                    console.log('returned nodes:', this.asArray());
                    // take the resulting nodes from the query, that we
                    // want to display as a list of cupcakes (in this case)
                    // to the user.  Since Ember is expecting the data to
                    // be passed to it as an array, we use the convenient
                    // asArray method on our collection of nodes.
                    var nodes = this.asArray();

                    for(var i = 0; i < nodes.length; i++) {
                        // Ember looks down on calling methods on a model.
                        // TODO: figure out if this is a reasonable blanket
                        // rule or if there is an 'ember way' to make
                        // an exception
                        nodes[i].imageUri = "/proxy" + nodes[i].getUri() + "/preview/helloCloudcms_256?mimetype=image/jpeg&size=256&attachment=default";
                        console.log('imageUri', nodes[i].imageUri);

                        // Ember expects the id to a property of the returned model object.
                        nodes[i].id = nodes[i].getId();
                    }

                    Ember.run(null, resolve, nodes);
                }, function (err) {
                    Ember.run(null, reject, err);
                });
            });
        });
        //jQuery.getJSON(url).then(function(data) {
            //Ember.run(null, resolve, data);
        //}, function(jqXHR) {
            //jqXHR.then = null; // tame jQuery's ill mannered promises
            //Ember.run(null, reject, jqXHR);
        //});
        //});
    },
    createRecord: function () {
        //no-op
    },
    updateRecord: function () {
        //no-op
    },
    deleteRecord: function () {
        //no-op
    }
});
