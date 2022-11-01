<template>
    <div class="container">
        <div class="settings">
            <div class="settings__title">
                <h2>User settings</h2>
            </div>
            <div class="settings__section">
                <div class="settings__user-info">
                    <span>Email:</span>
                </div>
                <div class="settings__user-data">
                    {{ email }}
                </div>
            </div>
            <div class="settings__title">
                <h2>Theme settings</h2>
            </div>
            <div class="settings__section">
                <div class="settings__theme">
                    <form action="" class="settings_theme-form">
                        <div class="settings__theme-input">
                            <label for="Dark">Dark:</label>
                            <input type="radio" id="Dark" name="colorTheme" :checked="!lightTheme" @change="changeTheme" />
                        </div>
                        <div class="settings__theme-input">
                            <label for="Light">Light:</label>
                            <input type="radio" id="Light" name="colorTheme" :checked="lightTheme" @change="changeTheme"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { mapMutations, mapState } from 'vuex';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
    name: "Settings",

    setup() {
        const email = ref("");
        
        onBeforeMount(() => {
            const user = firebase.auth().currentUser
            if (user) {
                email.value = user.email;
            }

        });
        return {          
            email,
        }
    },
    methods: {
        ...mapMutations(["TOGGLE_LIGHT_THEME"]),

        changeTheme() {
            this.TOGGLE_LIGHT_THEME();
            console.log(this.lightTheme)
        }
    },
    computed: {
        ...mapState(["lightTheme"]),
    }
}
</script>

<style lang="scss" scoped>
    .settings {
        background-color: #1e2139;
        border-radius: 20px;
        color: #fff;
        padding: 30px 50px;
        &__section {
            display: flex;
            gap: 15px;
            &:not(:last-child) {
                margin-bottom: 20px;
            }
        }
        &__theme {
            display: flex;
            flex-direction: column;
        }
        &__theme-input {
            display: flex;
            gap: 5px;
            cursor: pointer;
            & label {
                min-width: 50px;
            }
            & input[type="radio"] {
                width: 15px;
                background-color: #fff;
            }
        }
    }
</style>