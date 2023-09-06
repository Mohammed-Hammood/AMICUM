<template>
	<div :class="isSidebarOpen ? 'sidebarOpen' : 'sidebar'">
		<div class="wrapper">
			<div class="header">
				<div class="datetime">
					<div class="date">{{ date() }}</div>
					<div class="time">{{ time }}</div>
				</div>
				<div class="logout">
					<button @click="logout()" class="logoutBtn">
						<span>Выход</span>
						<img :src="icons.LogoutIcon" alt="" class="logoutImg" />
					</button>
				</div>
			</div>
			<div class="darkModeWrapper">
				<button @click="modeToggle()" :class="theme" class="darkModeBtn">
					<sun-moon-icon :is-dark="theme === 'dark'" />
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
							:border-width="6" :border-bg-width="6" empty-color="#323a53" class="progress"
							transition="500ms" />

						<div v-if="item.image" class="imageWrapper">
							<img :src="item.image" :alt="item.title" class="image" />
						</div>
						<div v-if="item.id === 3" class="completedTextsWrapper">
							<span class="number">{{ user.completed_tests }}</span>
						</div>
						<div v-if="item.id === 4" class="certificationAfterWrapper">
							<span class="number">{{ user.certification_after }}</span>
							<span class="word">{{ dayWord(user.certification_after) }}</span>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import LogoutIcon from '@/assets/icons/logout-icon.svg';
import SunMoonIcon from '@/assets/icons/sun-moon.vue';
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
		},
		isSidebarOpen: {
			required: true,
			type: Boolean
		},
	},
	components: {
		CircleProgress,
		SunMoonIcon
	},
	unmounted() {

		if (this.interval) clearInterval(this.interval);

	},
	data(): SidebarData {

		return {
			interval: null,
			time: `${this.format(new Date().getHours())}:${this.format(new Date().getMinutes())}`,
			icons: {
				LogoutIcon,
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
	mounted() {

		this.interval = setInterval(() => {

			const today = new Date();

			this.time = this.format(today.getHours()) + ":" + this.format(today.getMinutes());

		}, 1000);
	},
	methods: {
		format(time: number): string {
			return time < 10 ? `0${time}` : `${time}`
		},

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

			//returns local date in this format: DD:MM:YYYY
			return `${this.format(t.getDate())}:${this.format(t.getMonth())}:${this.format(t.getFullYear())}`
		},

		logout() {
			useAuthStore().logout()
		},
		modeToggle() {
			useThemStore().themeToggle()
		},
		// this function returns the correct single/plural word for the word day in Russian
		dayWord(number: number): string {
			const words = ['день', 'дня', 'дней'];

			const str: string = number.toString();
			const len: number = str.length;
			const flag: boolean = len === 1 || str[len - 2] !== "1"; //to exclude numbers that have last two numbers 10 to 19 

			if (str[len - 1] === "1" && flag) return words[0];

			if (["2", "3", "4"].includes(str[len - 1]) && flag) return words[1];

			return words[2]; // the rest will return дней
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
		box-shadow: none;
	}
}

.header {
	display: flex;
	justify-content: space-between;
	color: var(--base-white, #fff);
	font-size: 14px;
	align-items: center;
	max-height: calc(100% - 77px);

	.datetime {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

}

.logoutBtn {
	display: flex;
	gap: 5px;
	font-size: 15px;
	align-items: center;

	&:active {
		transform: scale(1.01);
	}

}

.logoutImg {
	width: 30px;
	height: 30px;
	user-select: none;
}

.darkModeWrapper {
	height: 100px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	color: var(--base-white, #fff);

	.darkModeBtn {
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

.certificationAfterWrapper,
.completedTextsWrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	line-height: 1;

	.number {
		font-size: 18px;
		font-weight: 800;
		padding: 0;
		margin: 0;
	}

	.word {
		font-size: 12px;
		font-weight: 700;
	}
}

.cardsWrapper {
	display: grid;
	justify-content: center;
	grid-template-columns: minmax(100px, 300px) minmax(100px, 300px);
	gap: 10px;
}

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

.card {
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 10px;
	border-radius: 5px;
	color: var(--base-white, #fff);
	background: #596c94;
	min-height: 165px;
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
			max-width: var(--size);
			max-height: var(--size);
			overflow: hidden;
		}
	}
}

.sidebar,
.sidebarOpen {
	width: 100%;
	height: 100%;
	min-height: 100vmin;
	max-width: 400px;
	background: var(--dark-blue, #323a53);
	display: flex;
	justify-content: center;

	@media (max-width: 950px) {
		margin-top: 70px;
		left: -950px;
		position: absolute;
	}
}

.sidebarOpen {
	@media (max-width: 950px) {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
		max-width: 100%;
	}
}
</style>
