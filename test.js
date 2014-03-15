var index = require('./index');
var _ = require('underscore');

var nestedFindWhere = index.nestedFindWhere;
var listify = index.listify;

var nestedFindWhereData = [
	{
		'key_l0_0': 'val_l0_0',
		'key_l0_1': {
			'key_l1_0': 'val_l1_0'
		},
		'key_l0_2': {
			'key_l1_1': {
				'key_l2_0': 'diff-val_l2_0'
			},
			'key_l1_2': 'val_l1_2'
		}
	},
	{
		'key_l0_0': 'val_l0_0',
		'key_l0_1': {
			'key_l1_0': 'diff-val_l1_0'
		},
		'key_l0_2': {
			'key_l1_1': {
				'key_l2_0': 'val_l2_0'
			},
			'key_l1_2': 'val_l1_2'
		}
	},
	{
		'key_l0_0': 'val_l0_0',
		'key_l0_1': {
			'key_l1_0': 'val_l1_0'
		},
		'key_l0_2': {
			'key_l1_1': {
				'key_l2_0': 'val_l2_0'
			},
			'key_l1_2': 'val_l1_2'
		}
	},
	{
		'key_l0_0': 'val_l0_0',
		'key_l0_1': {
			'key_l1_0': 'val_l1_0'
		},
		'key_l0_2': {
			'key_l1_1': {
				'key_l2_0': 'diff-val_l2_0'
			},
			'key_l1_2': 'val_l1_2'
		}
	},
	{
		'key_l0_0': 'val_l0_0',
		'key_l0_1': {
			'key_l1_0': 'val_l1_0'
		},
		'key_l0_2': {
			'key_l1_1': {
				'key_l2_0': 'val_l2_0'
			},
			'key_l1_2': 'val_l1_2'
		}
	},
];

var nestedFindWhereConstraints = [
	{
		fields: ['key_l0_0'],
		value: 'val_l0_0'
	},
	{
		fields: ['key_l0_2', 'key_l1_1'],
		value: {'key_l2_0': 'val_l2_0'}
	}
];

var listifyData = [
	{
		genre: 'action',
		similar: ['adventure', 'animation', '3-d']
	},
	{
		subjects: null
	},
	[
		{
			'sub-genres': ['action-adventure', 'superhero', 'grandiose']
		}
	]
];

console.log(
	_.isEqual(
		nestedFindWhere(
			nestedFindWhereData,
			nestedFindWhereConstraints,
			{onlyFirst: true}
		),
		1
	)
);
console.log(
	_.isEqual(
		nestedFindWhere(
			nestedFindWhereData,
			nestedFindWhereConstraints
		),
		[1,2,4]
	)
);

console.log(
	_.isEqual(
		listify(listifyData),
		[ 'genre', 'action', 'similar', 'adventure', 'animation',
		  '3-d', 'subjects', 'sub-genres', 'action-adventure',
		  'superhero', 'grandiose'
		]
	)
);