<script setup lang="ts">
// Imports
import IconDelete from '@icons/mi/delete';

// Read

// Create

// Delete
</script>

<template>
	<div id="content">
		<form @submit.prevent="">
			<SolTextfield id="create-title" :label="$t('title')" invert />
			<SolTextfield id="create-description" :label="$t('description')" invert />
			<SolButton id="create-insert" type="submit"> {{ $t('create') }} </SolButton>
		</form>

		<table>
			<thead>
				<th>Id</th>
				<th>{{ $t('title') }}</th>
				<th>{{ $t('description') }}</th>
				<th>{{ $t('options') }}</th>
			</thead>
			<ClientOnly>
				<tbody>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td class="options">
							<SolButton id="delete" variant="flat" invert dense>
								<IconDelete />
							</SolButton>
						</td>
					</tr>
				</tbody>
			</ClientOnly>
		</table>
	</div>
</template>

<style scoped lang="scss">
#content {
	@apply md:flex justify-evenly;

	table {
		@apply text-neutral-high-pure flex-auto;
		margin: auto;

		thead {
			@apply border-neutral-high-light border-sm text-center;

			> * {
				@apply border-neutral-high-light border-sm text-center;
			}
		}

		tbody {
			> * {
				@apply border-neutral-high-light border-sm text-center;
			}

			td {
				@apply border-neutral-high-light border-sm;

				> * {
					margin: auto;
				}
			}
		}
	}

	form {
		@apply flex-auto flex flex-col w-fit-content gap-4 p-micro rounded-md items-center;
		margin: auto;
	}
}
</style>
