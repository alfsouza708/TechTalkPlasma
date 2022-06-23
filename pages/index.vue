<script setup lang="ts">
// Imports
import IconDelete from '@icons/mi/delete';
import IconEdit from '@icons/mi/edit';
import {
	ListTodosDocument,
	TodoUpdate,
	Todo,
	TodoInsert,
	useDeleteTodoMutation,
	useUpdateTodoMutation,
	useInsertTodoMutation,
	useListTodosQuery
} from '~~/@types/generated';

// Read

const { result: listTodosResult } = useListTodosQuery();

const todos = computed(() => listTodosResult.value.listTodos ?? []);

// Create

const newTodo = reactive<TodoInsert>({
	title: '',
	description: ''
});

const { mutate: insertTodoMutate } = useInsertTodoMutation({
	refetchQueries: [
		{
			query: ListTodosDocument
		}
	]
});

const insertNewTodo = () => {
	if (newTodo.title && newTodo.description) insertTodoMutate({ todo: newTodo });
};

// Delete

const { mutate: deleteTodoMutate } = useDeleteTodoMutation({
	update(cache, { data: { deleteTodo } }) {
		cache.evict({ id: `${deleteTodo.__typename}:${deleteTodo.id}` });
		cache.gc();
	}
});

const deleteTodo = (id: Todo['id']) => {
	deleteTodoMutate({ deleteTodoId: id });
};

// Update

const state = reactive({ editTodoId: null, isEdit: false });
const editTodo = reactive<TodoUpdate>({
	title: '',
	description: ''
});

const { mutate: mutateUpdateTodo } = useUpdateTodoMutation({});

const handleEditForm = (todo: Todo) => {
	state.isEdit = true;

	state.editTodoId = todo.id;
	editTodo.title = todo.title;
	editTodo.description = todo.description;
};

const editSubmitTodo = () => {
	if (state.editTodoId > 0 && editTodo.title && editTodo.description) {
		mutateUpdateTodo({
			updateTodoId: state.editTodoId,
			todo: editTodo
		});
		state.isEdit = false;
	}
};
</script>

<template>
	<div id="content">
		<form v-if="state.isEdit" @submit.prevent="editSubmitTodo">
			<SolTextfield
				id="edit-title"
				v-model="editTodo.title"
				:label="$t('title')"
				invert
			/>
			<SolTextfield
				id="edit-description"
				v-model="editTodo.description"
				:label="$t('description')"
				invert
			/>
			<SolButton id="insert" type="submit"> {{ $t('edit') }} </SolButton>
		</form>
		<form v-else @submit.prevent="insertNewTodo">
			<SolTextfield
				id="create-title"
				v-model="newTodo.title"
				:label="$t('title')"
				invert
			/>
			<SolTextfield
				id="create-description"
				v-model="newTodo.description"
				:label="$t('description')"
				invert
			/>
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
					<tr v-for="(todo, index) in todos" :key="`todo-n${index}`">
						<td>{{ todo.id }}</td>
						<td>{{ todo.title }}</td>
						<td>{{ todo.description }}</td>
						<td class="options">
							<SolButton
								id="delete"
								variant="flat"
								invert
								dense
								@click="deleteTodo(todo.id)"
							>
								<IconDelete />
							</SolButton>
							<SolButton
								id="edit"
								variant="flat"
								invert
								dense
								@click="handleEditForm(todo)"
							>
								<IconEdit />
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
