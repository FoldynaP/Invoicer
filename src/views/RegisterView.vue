<template>
    <div class="login-view container">
        <div class="login-view__welcome">
            <h1>Welcome to the Invoicer!</h1>
            <span>We appreciate, that you want tu register!</span>
        </div>
        <div class="login">
            <div class="login__left">
                <div class="login__image-wrap">
                    <picture>
                    <source media="(min-width:650px)" srcset="@/assets/illustration-empty.svg">
                    <img src="@/assets/illustration-empty.svg" alt="Flowers" style="width:auto;">
                    </picture>
                </div>
            </div>
            <div class="login__right">
                <p class="login__text">Enter your account informations!</p>
                <form @submit.prevent="Register" class="login__form">
                    <div class="input flex flex-column">
                        <label for="userFirstName">First Name</label>
                        <input required type="text" id="userFirstName" placeholder="First Name" v-model="userFirstName">
                    </div>
                    <div class="input flex flex-column">
                        <label for="userSecondName">Second Name</label>
                        <input required type="text" id="userSecondName" placeholder="Second Name" v-model="userSecondName">
                    </div>
                    <div class="input flex flex-column">
                        <label for="userEmail">User Email</label>
                        <input required type="email" id="userEmail" placeholder="Email" v-model="email">
                    </div>
                    <div class="input flex flex-column">
                        <label for="userPassword">User Password</label>
                        <input required type="password" id="userPassword" placeholder="Password" v-model="password">
                    </div>
                    <div class="login__buttons">
                        <router-link class="nav-link flex" :to="{ name: 'Login'}">
                            <button class="dark-purple">Back to login</button>
                        </router-link>
                        <button type="submit" value="Register" class="purple">Register</button>
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
    name: "RegisterView",
    data() {
        return {
        }
    },
    setup() {
        const email = ref("");
        const password = ref("");

        const Register = () => {
            firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(user => {
                alert(user);
            })
            .catch(err => alert(err.message))
        }

        return {
            Register,
            email,
            password
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