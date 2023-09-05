<template>
    <div class="cardWrapper">
        <button onclick="" class="card" v-for="(item, index) in Images" :key="index">
            <div v-if="item.notificationsCount" class="notificationsCountWrapper">
                <div class="notificationsCount">{{ item.notificationsCount }}</div>
            </div>
            <div class="titleWrapper">
                {{ item.title }}
            </div>
            <div class="imageWrapper">
                <img :src="item.src" :alt="item.title" class="image" />
            </div>
        </button>
    </div>
</template>

<script lang="ts">
import Email from '@/assets/icons/email.svg'
import Award from '@/assets/icons/award.png'
import OpenBook from '@/assets/icons/open-book.svg'
import Pen from '@/assets/icons/pen.svg';
import { useAuthStore } from '@/stores';

export default {
    data() {
        const { user } = useAuthStore()
        return {
            Images: [
                {
                    src: Pen,
                    title: 'Начать работу'
                },
                {
                    src: Email,
                    notificationsCount: user?.notifications_count,
                    title: 'Уведомления'
                },
                {
                    src: OpenBook,
                    title: 'Обучение'
                },
                {
                    src: Award,
                    title: 'Достижения'
                }
            ]
        }
    }
}
</script>

<style scoped>
.cardWrapper {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(132px, 300px) minmax(132px, 300px);
    justify-content: center;
    margin: 150px 0 50px 0;
    gap: 50px;
    padding: 10px;


    @media (max-width: 1100px) {
        grid-template-columns: minmax(132px, 250px) minmax(132px, 250px);
        gap: minmax(10px, 50px);
    };
    @media (max-width: 600px) {
        grid-template-columns: minmax(0, 300px);
        gap: 50px;
        padding: 10px 15px;
    }
}

.card {
    background: var(--base-orange, #ef7f1b);
    width: 100%;
    max-width: 300px;
    max-height: 300px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    padding: 10px;
    box-shadow: 0 2px 10px #626262;

    &:active {
        transform: scale(1.01);
    }
    @media (max-width: 600px) {
        max-width: 400px;
    }
}

.notificationsCountWrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.notificationsCount {
    position: absolute;
    background: var(--base-green, green);
    padding: 2px;
    border-radius: 50%;
    min-height: 40px;
    min-width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: large;
    background: #a0ff51;
    margin-top: -31px;
    margin-right: -25px;
    box-shadow: 0 1px 10px #8383838f;
}

.titleWrapper {
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 10px;
    display: flex;
    font-size: large;
}

.imageWrapper {
    width: 100%;
    object-fit: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 150px;
}

.image {
    width: 100%;
    max-width: 100px;
}

 

</style>
