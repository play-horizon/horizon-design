/**
 * The button styles, shared by `Button` and by anything that must look like a button without
 * being one (a link styled as a button: `<a class={buttonVariants({ variant: 'primary' })}>`).
 * @module
 */
import { cn } from '$lib/utils';

const base =
	'inline-flex shrink-0 items-center justify-center whitespace-nowrap border font-medium outline-none transition-[background-color,border-color,color,opacity,transform] duration-150 active:scale-98 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0';

const variants = {
	/** A neutral button on a surface: most actions. */
	default: 'bg-surface border-border text-fg inset-shadow-highlight hover:bg-hover',
	/** The one main action of a screen. */
	primary:
		'bg-primary border-primary text-on-primary font-semibold hover:bg-primary-hover hover:border-primary-hover',
	/** A secondary action that should stand out: tinted with the primary colour. */
	tint: 'bg-primary-subtle border-primary-border text-primary hover:bg-primary/20',
	/** A quiet action in toolbars and lists. */
	ghost: 'bg-transparent border-transparent text-fg-2 hover:bg-hover hover:text-fg',
	/** A destructive action next to others. */
	danger: 'bg-danger-subtle border-danger-border text-danger hover:bg-danger/20',
	/** The confirming action of a destructive dialog. */
	'danger-solid': 'bg-danger border-danger text-on-danger font-semibold hover:opacity-90',
	/** Text that acts like a link. */
	link: 'border-transparent text-primary underline-offset-4 hover:underline'
} as const;

const sizes = {
	xs: 'h-control-xs gap-1 rounded-md px-1.75 text-xs [&_svg]:size-3',
	sm: 'h-control-sm gap-1.5 rounded-md px-2.25 text-sm [&_svg]:size-3.5',
	md: 'h-control-md gap-1.5 rounded-lg px-2.75 text-sm [&_svg]:size-4',
	lg: 'h-control-lg gap-2 rounded-lg px-4.5 text-md [&_svg]:size-4.5',
	'icon-xs': 'size-control-xs rounded-md [&_svg]:size-3',
	'icon-sm': 'size-control-sm rounded-md [&_svg]:size-3.5',
	'icon-md': 'size-control-md rounded-lg [&_svg]:size-4',
	'icon-lg': 'size-control-lg rounded-lg [&_svg]:size-4.5'
} as const;

/** A button's look. */
export type ButtonVariant = keyof typeof variants;

/** A button's size; the `icon-*` sizes are square, for icon-only buttons. */
export type ButtonSize = keyof typeof sizes;

/** The classes of a button of the given variant and size, with `className` merged last. */
export function buttonVariants({
	variant = 'default',
	size = 'md',
	pill = false,
	className = ''
}: {
	variant?: ButtonVariant;
	size?: ButtonSize;
	/** Fully rounded ends. */
	pill?: boolean;
	className?: string;
} = {}): string {
	return cn(base, variants[variant], sizes[size], pill && 'rounded-full', className);
}
