import { ref } from 'vue';
import { defineStore } from 'pinia';


export const useThemStore = defineStore('theme', () => {
    const _name__ = "theme";

    const ls = localStorage.getItem(_name__);

    const theme = ref<'dark' | 'light'>('light'=== ls ? ls : 'dark');

    if (localStorage) {
        document.body.className = theme.value;
    }

    function themeToggle() {
        theme.value = theme.value === 'dark' ? 'light' : 'dark';

        document.body.className = theme.value;

        localStorage.setItem(_name__, theme.value);
    }
    return { themeToggle, theme }
})