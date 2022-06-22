<script setup lang="ts"></script>

<template>
	<div id="content">
		<!-- <form v-if="state.isEdit" @submit.prevent="">
			<SolTextfield id="title" v-model="editTodo.title" label="title" invert />
			<SolTextfield
				id="description"
				v-model="editTodo.description"
				label="description"
				invert
			/>
			<SolButton id="insert" type="submit"> $t('edit') </SolButton>
		</form> -->

		<table>
			<thead>
				<th>Id</th>
				<th>$t('title')</th>
				<th>$t('description')</th>
			</thead>
			<ClientOnly>
				<tbody>
					<tr>
						<td></td>
						<td></td>
						<td></td>
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
