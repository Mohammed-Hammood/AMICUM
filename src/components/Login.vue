
<template>
    <div class="login">
        <form class="form" @submit="submitHandler">
            <div v-if="loading" class="loader"></div>
            <div v-else class="content">
                <div :class="error ? 'error' : ''" @click="clearErrors">{{ error }}</div>
                <input required placeholder="Имя пользователя" type="text" :value="username" @input="setUsername" />
                <input required placeholder="Пароль" type="password" :value="password" @input="setPassword" />
                <button :disabled="loading" type="submit">Вход</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { useAuthStore, useThemStore } from '@/stores';


export default {
    name: "auth-login",
    data() {
        return {
            error: null,
            username: 'user_52', // username: user_1, user_2, .... user_52
            password: 'password' // password: password
        }
    },
    computed: {
        loading() {
            return useAuthStore().loading
        }
    },
    mounted() {
        document.body.className = useThemStore().theme;
    },
    methods: {
        submitHandler(event: Event) {
            const { setUser, setLoading } = useAuthStore();

            event.preventDefault();

            setLoading(true);

            const url = 'https://mohammed-api.vercel.app/api/auth/login';

            const data = {
                password: this.password,
                username: this.username
            }

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) throw data.error
                    setUser(data);
                })
                .catch((err) => {
                    this.error = err
                })
                .finally(() => setLoading(false))
        },

        setUsername(event: Event) {
            this.username = (event.target as HTMLInputElement).value
        },
        setPassword(event: Event) {
            this.password = (event.target as HTMLInputElement).value
        },
        clearErrors() {
            this.error = null
        }
    }
}
</script>

<style scoped>
@keyframes LOADER {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

form {
    width: 100%;
    background: white;
    max-width: 500px;
    border-radius: 15px;
    overflow: hidden;
    background: var(--dark-blue, #323a53);

    .loader {
        width: 100%;
        height: 100%;
        min-height: 188px;
        display: flex;
        justify-content: center;
        align-items: center;

        &::after {
            content: '';
            width: 50px;
            height: 50px;
            border: 2px solid white;
            border-top: 3px solid var(--main-color);
            border-radius: 50%;
            animation: LOADER 0.5s linear infinite;
        }
    }

    .content {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 15px;
        gap: 15px;
        color: black;

        .error {
            width: 100%;
            background: var(--base-orange);
            padding: 10px;
            color: white;
            border-radius: 5px;
        }


    }
}

input,
button {
    width: 100%;
    padding: 10px;
    color: var(--base-white, #fff);
    outline: 1px solid silver;
    font-size: 15px;
    background: var(--main-color, #596c94);
    border-radius: 5px;
}

button {
    cursor: pointer;
    background-color: var(--base-white, #fff);
    color: var(--base-black, #000);

    &:active {
        transform: scale(1.01);
    }
}

.login {
    display: flex;
    justify-content: center;
    min-height: 100vmin;
    width: 100%;
    align-items: center;
    padding: 10px;
    font-size: 16px;
}
</style>
