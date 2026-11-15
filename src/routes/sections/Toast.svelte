<!--
@component
Docs: Toast. Live examples of the Toast component.
-->
<script lang="ts">
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Toaster, createToaster } from '#lib/components/toast/index.js';
	import MingcuteAlertLine from '~icons/mingcute/alert-line';
	import MingcuteCheckCircleLine from '~icons/mingcute/check-circle-line';
	import MingcuteCloseCircleLine from '~icons/mingcute/close-circle-line';
	import MingcuteInformationLine from '~icons/mingcute/information-line';
	import MingcuteLoading3Fill from '~icons/mingcute/loading-3-fill';

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

	// A loading toast, which turns into a success toast when the work it waits for is done.
	function showLoadingToast() {
		toaster.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
			loading: { title: 'Saving…', description: 'Your changes are being saved.' },
			success: { title: 'Saved', description: 'Your changes were saved.' },
			error: { title: 'Error', description: 'Your changes could not be saved.' }
		});
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
				<Button variant="default" onclick={showLoadingToast}>
					<MingcuteLoading3Fill class="size-4" />
					Loading Toast
				</Button>
			</div>
		</div>
	</Card>
</section>
