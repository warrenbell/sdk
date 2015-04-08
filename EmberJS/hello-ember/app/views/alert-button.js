import Ember from 'ember';

export default Ember.View.extend({
    'layoutName': 'alert-button',
    'click': function () {
        alert('clicked alert thingy!');
    }
});
