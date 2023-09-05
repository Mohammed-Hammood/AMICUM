import { ref,  } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
	const user = ref<null | User>(null);
	const loading = ref<boolean>(false);

	function setUser(value: null | User) {
		user.value = value;
	}

	function setLoading(value: boolean) {
		loading.value = value;
	}
	function logout(){
		user.value = null;
	}
	return { user, setUser, logout, loading, setLoading }
})