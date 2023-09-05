<template>
    <header class="header">
        <div class="buttonWrapper">
            <button type="button" @click="sidebarToggle()" class="burgurBtn">
                <img :src="sidebarIsOpen ? BarsStaggeredIcon : BarsIcon" alt="" class="burgurImg" />
            </button>
        </div>
        <div class="logoWrapper">
            <router-link to="/" class="logoLink">
                <img src="/amicum_logo.jpg" alt="" class="logo"/>
            </router-link>
        </div>
    </header>
</template>

<script lang="ts">
import BarsIcon from '@/assets/icons/bars.svg';
import BarsStaggeredIcon from '@/assets/icons/bars-staggered.svg';


export default {
    name: "layout-header",
    props: {
        sidebarIsOpen: {
            type: Boolean,
            required: true,
        },
        sidebarToggle: {
            type: Function,
            required: true,
        }
    },
    data() {
        return {
            BarsIcon,
            BarsStaggeredIcon,
        }
    },
}
</script>

<style scoped>
.header {   
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;

    @media (max-width: 950px) {
        z-index: 1000;
        backdrop-filter: blur(20px);
        background: rgba(50, 58, 83, 0.6);
        box-shadow: 3px -3px 10px 2px rgb(146, 173, 231);
    }

    .logoWrapper {
        display: flex;
        justify-content: center;
        align-items: center;


    }

    .burgurBtn {
        height: 100%;
        width: 40px;
        justify-content: center;
        align-items: center;
        display: none;


        @media (max-width: 950px) {
            display: flex;
        }
    }

    .burgurImg {
        width: 20px;
        height: 20px;
        user-select: none;
    }
}

.logo, .logoLink {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 950px) {
        height: 50px;
    }
}
</style>
