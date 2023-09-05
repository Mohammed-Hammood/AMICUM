<template>
	<div class="wrapper">
		<div class="header">
			<div class="datetime">
				<div class="date">{{ date() }}</div>
				<div class="time">10:00</div>
			</div>
			<div class="logout">
				<button @click="logout()">
					<span>Выход</span>
					<img :src="icons.LogoutIcon" alt="" />
				</button>
			</div>
		</div>
		<div class="darkModeWrapper">
			<button @click="modeToggle()" :class="theme">
				<img :src="theme === 'dark' ? icons.SunIcon : icons.MoonIcon" alt="" />
			</button>
		</div>
		<div v-if="user" class="userPersonalInfoWrapper">
			<div class="name">{{ user.name }}</div>
			<div class="birthday">{{ user.birthday }}</div>
			<div class="tab">Таб №: {{ user.random_number }}</div>
			<div class="jobTitle">{{ user.position_name }}</div>
		</div>
		<div class="cardsWrapper">
			<div v-for="item in images" class="card" v-bind:key="item.id">
				<div class="titleWrapper">{{ item.title }}</div>
				<div class="border">

					<circle-progress :size="70" :fill-color="getProgressColor(item)" :percent="getPercentValue(item)"
						:border-width="6" :border-bg-width="6" empty-color="#323a53" class="progress" transition="500ms" />

					<div v-if="item.image" class="imageWrapper">
						<img :src="item.image" :alt="item.title" class="image" />
					</div>
					<div v-if="item.id === 3">
						{{ user.completed_tests }}
					</div>
					<div v-if="item.id === 4">
						<span>{{ user.certification_after }}</span>
						<span>{{ "" }}</span>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import LogoutIcon from '@/assets/icons/logout-icon.svg';
import MoonIcon from '@/assets/icons/moon.svg';
import SunIcon from '@/assets/icons/sun.svg';
import PenToPaperIcon from '@/assets/icons/pen-to-paper.svg';
import PaperTestIcon from '@/assets/icons/paper-test.svg';
import { useAuthStore, useThemStore } from '@/stores';
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from 'vue3-circle-progress';


export default {
	name: 'layout-sidebar',
	props: {
		user: {
			required: true,
			type: Object,
		}
	},
	components: {
		CircleProgress
	},
	
	data() {
		return {
			icons: {
				LogoutIcon,
				MoonIcon,
				SunIcon,
				PenToPaperIcon,
			},
			images: [
				{
					id: 1,
					image: PenToPaperIcon, 
					title: 'Инструктаж',
				},
				{
					id: 2,
					image: PaperTestIcon, 
					title: 'Предсменный экзаменатор',
				},
				{
					id: 3,
					title: 'Тестов выполнено',
				},
				{
					id: 4,
					title: 'Аттестация через',
				}
			]
		}
	},
	computed: {
		theme() {
			return useThemStore().theme
		},
	},
	methods: {
		getPercentValue(item: { id: number }): number {
			const user = this.$props.user as User;

			let percent = 0;

			if (item.id === 1) percent = user.instruction !== null ? 100 : 0;

			else if (item.id === 2) percent = user.preshift_examiner !== null ? 100 : 0;

			else if (item.id === 3) percent = (user.completed_tests / user.total_tests) * 100;

			else if (item.id === 4) percent = (user.certification_after / 100) * 100;

			return Math.floor(percent);
		},
		getProgressColor(item: { id: number }): string {
			const user = this.$props.user as User;

			let colors = { green: '#a0ff51', orange: '#ef7f1b' }

			//the only cases where progress bar color should be orange
			const flag: boolean = (item.id === 4 && user.certification_after < 30) ||
				(item.id === 1 && user.instruction === false) ||
				(item.id === 2 && user.preshift_examiner === false);

			return flag ? colors.orange : colors.green;
		},
		date(): string {
			const t = new Date();

			const format = (time: number): string => (time < 10 ? `0${time}` : `${time}`)

			return `${format(t.getDate())}:${format(t.getMonth())}:${format(t.getFullYear())}`
		},
		logout() {
			useAuthStore().logout()
		},
		modeToggle() {
			useThemStore().themeToggle()
		}
	}
}
</script>

<style scoped>
.progress {
	position: absolute !important;
}

.wrapper {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 25px;
	width: 100%;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	box-shadow: 2px 1px 10px var(--main-color);
	height: 100%;
	min-height: 100vmin;
	max-width: 400px;
    z-index: 100;
	@media (max-width: 950px) {
		box-shadow:none;		
	}
}

.header {
	display: flex;
	justify-content: space-between;
	color: var(--base-white, #fff);
	font-size: 14px;
	align-items: center;

	.datetime {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.logout {
		button {
			display: flex;
			gap: 5px;
			font-size: 15px;
			align-items: center;

			&:active {
				transform: scale(1.01);
			}

			img {
				width: 30px;
				height: 30px;
				user-select: none;
			}
		}
	}
}

.darkModeWrapper {
	height: 100px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	color: var(--base-white, #fff);

	button {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 70px;
		background: transparent;

		&.dark {
			justify-content: flex-start;
		}

		&::after {
			content: '';
			border-radius: 5px;
			background: var(--main-color);
			height: 13px;
			position: absolute;
			width: 45px;
			margin: 0 13px;
		}

		img {
			height: 35px;
			width: 35px;
			z-index: 1;
			transform: rotate(223deg);
		}

		&:active {
			transform: scale(1.01);
		}
	}
}

.userPersonalInfoWrapper {
	display: flex;
	flex-direction: column;
	gap: 5px;
	color: var(--base-white, #fff);
	background: var(--main-color);
	padding: 10px;
	width: 100%;
	border-radius: 4px;

	.name {
		font-size: 18px;
		font-weight: bold;
	}

	.jobTitle,
	.birthday,
	.tab {
		font-size: 14px;
	}
}

.cardsWrapper {
	display: grid;
	justify-content: center;
	grid-template-columns: minmax(100px, 300px) minmax(100px, 300px);
	gap: 10px;
}

.card {
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 10px;
	border-radius: 5px;
	color: var(--base-white, #fff);
	background: #596c94;
	min-height: 165px;

	.titleWrapper {
		display: flex;
		justify-content: center;
		font-size: 14px;
		text-align: center;
		min-height: 30px;
		max-width: 100px;
		line-height: 1.2;
		margin: 0 auto;
	}

	.border {
		border-radius: 50%;
		width: 70px;
		height: 70px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;

		.imageWrapper {
			width: 100%;
			justify-content: center;
			display: flex;

			.image {
				--size: 60px;
				width: 100%;
				max-width:  var(--size);
				max-height: var(--size);
				overflow: hidden;
			}
		}
	}
}
</style>
