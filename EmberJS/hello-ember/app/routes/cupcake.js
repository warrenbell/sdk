import Ember from 'ember';

export default Ember.Route.extend({
    /**
     * This is where ember determines what model to use, and how to get it for this route.
     * the store reaches out the cupcake model using this static (for this demo) query.
     * @see adapters/cupcake
     * @see models/cupcake
     */
    model: function (params, transition, queryParams) {
        console.log(params, transition, queryParams);
        return this.store.find('cupcake', { _type:"catalog:product", sku:params.sku });
    },

    /**
     * the serialize method allows us to take the data used to generate the url
     * for a specific model (cupcake in our case), and create a callback that
     * shows how to serialize it.  Here, since we don't want our cupcake's sku
     * to be separated by ugly '%20's, we replace spaces with underscores.
     * Notice that if you navigate to /cupcakes and you choose an item
     * from the list on the left, the uri shown is underscore delimited
     * even though the sku is stored as a space delimited string.
     */
    serialize: function (model) {
        //console.log('serializing', model);
        return { sku: model.get('sku').replace(/ /g, '_') };
    },
    deserialize: function (params) {
        console.log(params);
        //console.log('serializing', model);
        return { sku: params.sku.replace(/_/g, ' ') };
    }
});
