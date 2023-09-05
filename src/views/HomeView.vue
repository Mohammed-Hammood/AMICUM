<template>
    <div v-if="user === null">
        <login />
    </div>
    <main class="main" v-else>
        <HeaderLayout :sidebar-is-open="sidebarOpen" :sidebar-toggle="sidebarToggle" />
        <div :class="sidebarOpen ? 'sidebarOpen' : 'sidebar'">
            <sidebar :user="user" v-if="user" />
        </div>
        <MainContent />
    </main>
</template>

<script lang="ts">
import { default as HeaderLayout } from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import MainContent from '@/components/MainContent.vue';
import Login from '@/components/Login.vue';
import BarsIcon from '@/assets/icons/bars.svg';
import { useAuthStore } from '@/stores';


export default {
    name: "home-view",
    components: {
        Sidebar,
        Login,
        MainContent,
        HeaderLayout,
    },
    data() {
        return {
            sidebarOpen: false,
            BarsIcon,
        }
    },

    computed: {
        user() {
            return useAuthStore().user
        },

    },
    methods: {
        sidebarToggle() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        logout() {
            useAuthStore().logout()
        }
    }
}
</script>

<style scoped>
.main {
    height: 100%;
    display: flex;
}

.content {
    display: flex;
    flex-direction: column;
    width: 100%;
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
        z-index: 1000;
        max-width: 100%;
    }
}
</style>
