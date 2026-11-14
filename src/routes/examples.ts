/**
 * Sample data the docs site's live examples share: game art (SVG files in `static/examples`),
 * people and the game tag list.
 * @module
 */
import { asset } from '$app/paths';
import type { StackPerson } from '#lib/components/avatar-stack/index.js';

/** Example game art, each a 16:9 SVG. */
export const art = {
	skyline: asset('examples/skyline.svg'),
	frost: asset('examples/frost.svg'),
	neon: asset('examples/neon.svg'),
	woods: asset('examples/woods.svg'),
	icon: asset('examples/icon.svg')
};

/** Example people. */
export const people: StackPerson[] = [
	{ id: 'sam', name: 'Sam Ito', initials: 'SI' },
	{ id: 'kofi', name: 'Kofi Owusu', initials: 'KO' },
	{ id: 'rayan', name: 'Rayan M.', initials: 'RM' },
	{ id: 'lena', name: 'Lena Novak', initials: 'LN' },
	{ id: 'ada', name: 'Ada Brun', initials: 'AB' }
];

/** The game tag list the platform seeds (games.md). */
export const gameTags: { id: string; label: string }[] = [
	'adventure',
	'action',
	'shooter',
	'fighting',
	'platformer',
	'obby',
	'racing',
	'sports',
	'simulation',
	'tycoon',
	'roleplay',
	'survival',
	'horror',
	'puzzle',
	'strategy',
	'social',
	'sandbox',
	'educational'
].map((id) => ({ id, label: id }));
