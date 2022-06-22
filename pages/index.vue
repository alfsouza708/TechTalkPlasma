<template>
	<div class="home-screen">
		<div class="content">
			<div class="presentation">
				<img src="@img/plasma.svg" alt="logo" />
			</div>
			<div class="summary">
				<h2 class="welcome">
					{{ $t('plasma_welcome') }}
					<a
						class="learn"
						target="__blank"
						href="https://github.com/solfacil/plasma/wiki"
					>
						{{ $t('learn_plasma') }}
					</a>
				</h2>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home-screen {
	@apply w-screen max-w-full bg-neutral-low-pure;

	> .content {
		@apply flex justify-center flex-col bg-neutral-high-medium rounded-sm p-sm drop-shadow-sm shadow-neutral-high-light;

		.presentation {
			img {
				@apply h-40 w-80;
				margin: auto;
			}
		}

		.summary {
			@apply mb-3xs;
			.welcome {
				@apply font-sans font-medium text-center;

				.learn {
					@apply text-feedback-informative-pure underline;
				}
			}
		}
	}
}
</style>
