<!--
@component
Docs: Tabs. Live examples of the Tabs component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Tabs } from '#lib/components/tabs/index.js';
</script>

<section id="tabs">
	<Card>
		<div class="space-y-8">
			<div class="space-y-3">
				<p class="text-xs font-semibold tracking-widest text-muted uppercase">Default</p>
				{#snippet tabAccountContent()}
					<p class="text-sm text-muted">Manage your account settings and preferences here.</p>
				{/snippet}
				{#snippet tabPasswordContent()}
					<p class="text-sm text-muted">Change your password and configure 2FA.</p>
				{/snippet}
				{#snippet tabSettingsContent()}
					<p class="text-sm text-muted">Configure application-wide settings here.</p>
				{/snippet}
				{#snippet tabBillingContent()}
					<p class="text-sm text-muted">Manage billing, invoices, and subscription plan.</p>
				{/snippet}
				<Tabs
					defaultValue="account"
					tabs={[
						{ value: 'account', label: 'Account', content: tabAccountContent },
						{ value: 'password', label: 'Password', content: tabPasswordContent },
						{ value: 'settings', label: 'Settings', content: tabSettingsContent },
						{ value: 'billing', label: 'Billing', content: tabBillingContent }
					]}
				/>
			</div>

			<div class="space-y-3">
				<p class="text-xs font-semibold tracking-widest text-muted uppercase">
					Underline (with Indicator)
				</p>
				{#snippet tabProfileContent()}
					<p class="text-sm text-muted">Update your profile information and avatar.</p>
				{/snippet}
				{#snippet tabNotificationsContent()}
					<p class="text-sm text-muted">Configure which notifications you receive.</p>
				{/snippet}
				{#snippet tabIntegrationsContent()}
					<p class="text-sm text-muted">Connect third-party apps and integrations.</p>
				{/snippet}
				<Tabs
					defaultValue="profile"
					variant="underline"
					tabs={[
						{ value: 'profile', label: 'Profile', content: tabProfileContent },
						{
							value: 'notifications',
							label: 'Notifications',
							content: tabNotificationsContent
						},
						{
							value: 'integrations',
							label: 'Integrations',
							content: tabIntegrationsContent
						}
					]}
				/>
			</div>
		</div>
	</Card>
</section>
