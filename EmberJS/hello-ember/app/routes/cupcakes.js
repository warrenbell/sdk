import Ember from 'ember';

export default Ember.Route.extend({

    /**
     * Since we're not really taking advantage of ember-data or the
     * ember-defined model/store, ember just expects us to provide
     * an array of items as the model which it will use to populate
     * it's handlebars template for this route.
     *
     */
    model: function () {
        return this.store.find('cupcake', { "_type": "catalog:product" });
    },
});
