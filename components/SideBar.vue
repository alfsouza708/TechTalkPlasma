<template>
	<nav>
		<template v-for="(menu, index) in menus" :key="index">
			<div v-if="menu.itens" class="group">
				<div class="title">
					<div class="divisor" />
					<span>{{ menu.title }}</span>
				</div>
				<template v-for="(item, index) in menu.itens" :key="index">
					<div
						class="item"
						:class="{
							'bg-neutral-low-light': selectedItem(item.path),
							'pointer-events-none': !!item.itens
						}"
						@click="toPath(item.path)"
					>
						<span
							:class="{
								'font-bold text-stroke-neutral-low-medium': !!item.itens
							}"
							:style="{
								color: selectedItem(item.path) ? '#ffb600' : ''
							}"
							>{{ item.title }}</span
						>
					</div>
					<template v-if="item.itens">
						<div v-for="(subitem, index) in item.itens" :key="index" class="subitem">
							<span>{{ subitem.title }}</span>
						</div>
					</template>
				</template>
			</div>
		</template>
	</nav>
</template>

<script setup lang="ts">
export interface Group {
	title: string;
	itens?: Item[];
}

export interface Item {
	title: string;
	path: string;
	itens?: Item[];
}

export type MenuSideBar = Group | Item;

interface SideBarProps {
	menus: Array<MenuSideBar>;
}

withDefaults(defineProps<SideBarProps>(), {
	menus: () => [] as Array<MenuSideBar>
});

const route = useRoute();
const router = useRouter();

const selectedItem = (path: string) => {
	return route.path === path;
};

const toPath = (path: string) => {
	router.push({ path });
};
</script>

<style lang="scss">
nav {
	@apply w-65 fixed h-[calc(100vh_-_76px)] overflow-auto top-19 border-r-neutral-high-pure border-r-1;

	> .group {
		@apply bg-transparent;

		> .title {
			@apply flex flex-row items-center pt-4;

			> .divisor {
				@apply border-none w-4 mr-2;
				height: 2px;
				background-color: #ffb600;
			}

			> span {
				@apply font-bold uppercase text-brand-primary-pure;
				font-size: 10px;
			}
		}

		> .item {
			@apply py-4 text-neutral-low-medium border-neutral-high-pure border-b-1 cursor-pointer;

			> span {
				@apply ml-6 border-neutral-high-pure transition-all duration-300 ease-in-out;
			}

			&:hover {
				@apply bg-neutral-high-medium relative;

				> span {
					@apply ml-7;
					color: #ffb600;
				}
			}
		}

		> .subitem {
			@apply py-1 text-neutral-low-medium border-neutral-high-pure border-b-1 cursor-pointer;

			> span {
				@apply ml-8 transition-all duration-300 ease-in-out;
				font-size: 14px;

				&::before {
					@apply px-2 transition-all duration-300 ease-in-out;
					content: '•';
				}
			}

			&:hover {
				@apply bg-neutral-high-medium;

				> span {
					@apply ml-8;
					color: #ffb600;

					&::before {
						@apply pl-2 pr-3;
						content: '•';
						color: #ffb600;
					}
				}
			}
		}
	}
}
</style>
