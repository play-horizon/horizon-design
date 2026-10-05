<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Tabs } from '$lib/components/tabs';
</script>

<section id="tabs">
	<p class="section-tag">Navigation</p>
	<h2 class="mb-6 text-2xl font-bold">Tabs</h2>
	<Card>
		<div class="space-y-8">
			<div class="space-y-3">
				<p class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">Default</p>
				{#snippet tabAccountContent()}
					<p class="text-muted-foreground text-sm">
						Manage your account settings and preferences here.
					</p>
				{/snippet}
				{#snippet tabPasswordContent()}
					<p class="text-muted-foreground text-sm">Change your password and configure 2FA.</p>
				{/snippet}
				{#snippet tabSettingsContent()}
					<p class="text-muted-foreground text-sm">Configure application-wide settings here.</p>
				{/snippet}
				{#snippet tabBillingContent()}
					<p class="text-muted-foreground text-sm">
						Manage billing, invoices, and subscription plan.
					</p>
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
				<p class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
					Underline (with Indicator)
				</p>
				{#snippet tabProfileContent()}
					<p class="text-muted-foreground text-sm">Update your profile information and avatar.</p>
				{/snippet}
				{#snippet tabNotificationsContent()}
					<p class="text-muted-foreground text-sm">Configure which notifications you receive.</p>
				{/snippet}
				{#snippet tabIntegrationsContent()}
					<p class="text-muted-foreground text-sm">Connect third-party apps and integrations.</p>
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
