var keystone = require('keystone');
var Types = keystone.Field.Types;


var Comment = new keystone.List('Comment');

Comment.add({
    text: {type: Types.Text, default: ''},
    trainer: {type: Types.Relationship, ref: 'User'}
});
Comment.defaultColumns='text, trainer';
Comment.register();