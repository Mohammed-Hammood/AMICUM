<template>
    <div v-if="user === null">
        <login />
    </div>
    <main class="main" v-else>
        <HeaderLayout :sidebar-is-open="isSidebarOpen" :sidebar-toggle="sidebarToggle" />
        <sidebar :user="user" v-if="user" :is-sidebar-open="isSidebarOpen" />
        <MainContent />
    </main>
</template>

<script lang="ts">
import { default as HeaderLayout } from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import MainContent from '@/components/MainContent.vue';
import Login from '@/components/Login.vue';
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
            isSidebarOpen: false,
        }
    },

    computed: {
        user() {
            return useAuthStore().user
        },

    },
    methods: {
        sidebarToggle() {
            this.isSidebarOpen = !this.isSidebarOpen;
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


</style>
