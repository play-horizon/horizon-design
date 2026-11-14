<!--
@component
Docs: Toast. Live examples of the Toast component.
-->
<script lang="ts">
	import { Button } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Toaster, createToaster } from '$lib/components/toast';
	import MingcuteAlertLine from '~icons/mingcute/alert-line';
	import MingcuteCheckCircleLine from '~icons/mingcute/check-circle-line';
	import MingcuteCloseCircleLine from '~icons/mingcute/close-circle-line';
	import MingcuteInformationLine from '~icons/mingcute/information-line';

	const toaster = createToaster({ placement: 'bottom-end' });

	function showToast(type: 'info' | 'success' | 'warning' | 'error') {
		const messages = {
			info: { title: 'Info', description: 'This is an informational message.' },
			success: { title: 'Success!', description: 'Your action was completed successfully.' },
			warning: { title: 'Warning', description: 'Please review before proceeding.' },
			error: { title: 'Error', description: 'Something went wrong. Please try again.' }
		};
		toaster.create({ ...messages[type], type });
	}
</script>

<Toaster {toaster} label="Notifications" closeLabel="Close" />

<section id="toast">
	<Card>
		<div>
			<div class="flex flex-wrap gap-3">
				<Button variant="default" onclick={() => showToast('info')}>
					<MingcuteInformationLine class="size-4" />
					Info Toast
				</Button>
				<Button
					variant="default"
					class="border-success/40 text-success hover:bg-success-subtle"
					onclick={() => showToast('success')}
				>
					<MingcuteCheckCircleLine class="size-4" />
					Success Toast
				</Button>
				<Button
					variant="default"
					class="border-warning/40 text-warning hover:bg-warning-subtle"
					onclick={() => showToast('warning')}
				>
					<MingcuteAlertLine class="size-4" />
					Warning Toast
				</Button>
				<Button variant="danger" onclick={() => showToast('error')}>
					<MingcuteCloseCircleLine class="size-4" />
					Error Toast
				</Button>
			</div>
		</div>
	</Card>
</section>
