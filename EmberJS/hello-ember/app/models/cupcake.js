import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
    title: attr('string'),
    headline: attr('string'),
    sku: attr('string'),
    summary: attr('string'),
    body: attr('string'),
    imageUri: attr('string')
});
