<template>
    <div class="login-view container">
        <div class="login-view__welcome">
            <h1>Welcome to the Invoicer!</h1>
        </div>
        <div class="login">
            <div class="login__left">
                <div class="login__image-wrap">
                    <picture>
                    <source media="(min-width:650px)" srcset="@/assets/login/login-image.png">
                    <img src="@/assets/login/login-image.png" alt="Flowers" style="width:auto;">
                    </picture>
                </div>
            </div>
            <div class="login__right">
                <p class="login__text">Enter your account informations!</p>
                <!-- Login form -->
                <form @submit.prevent="Login" class="login__form">
                    <div class="input flex flex-column">
                        <label for="userEmail">User Email</label>
                        <input required type="text" id="userEmail" placeholder="User Email" v-model="email">
                    </div>
                    <div class="input flex flex-column">
                        <label for="userPassword">User Password</label>
                        <input required type="password" id="userPassword" placeholder="User Password" v-model="password">
                    </div>
                    <div class="login__remember-me">
                        <label for="remember"> Remember me</label><br>
                        <input type="checkbox" id="remember" name="remember" value="remember">
                    </div>
                    <div class="login__buttons">
                        <router-link class="nav-link flex" :to="{ name: 'Register'}">
                            <button class="dark-purple">Register</button>
                        </router-link>
                        <button type="submit"  value="Login" class="purple">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
    name: "LoginView",
    data() {
        return {
        }
    },
    setup() {
        const email = ref("");
        const password = ref("");
        const Login = () => {
            firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(data => console.log(data)).catch(err => alert(err.message))
        }
        return {
            Login,
            email,
            password,
        }
    },
    components: {
    },
    methods: {
    },
    computed: {
    }
}
</script>

<style lang="scss" scoped>
    .login-view {
        height: 100%;
        &__welcome {
            color: #fff;
            font-size: 32px;
            margin-bottom: 40px;
            text-align: center;
        }
        &.container {
            max-width: 1180px;
        }
    }
    .login {
        display: flex;
        align-items: center;
        color: #fff;
        &__left {
            flex: 1 0 50%;
        }
        &__right {
            padding: 0 40px;
        }
        &__image-wrap {
            width: 100%;
            height: 100%;
            & img {
                max-width: 100%;
                height: 100%;
                object-fit: cover;
                aspect-ratio: auto;
            }
        }
        &__text {
            margin-bottom: 30px;
            font-size: 35px;
        }
        .input {
            margin-bottom: 15px;
            label {
                margin-bottom: 10px
            }
        }
        input {
            width: 100%;
            background-color: #1e2139;
            border-radius: 25px;
            color: #fff;
            padding: 12px 10px;
            border: none;
            &:focus {
            outline: none;
            }
        }
        input:autofill {
            background-color: red;
        }
        &__remember-me {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            input {
                max-height: 15px;
                width: auto;
                margin-left: 15px;
                cursor: pointer;
            }
        }
        &__buttons {
            display: flex;
            button {
                flex: 1 1 50%;
            }
        }
    }
</style>