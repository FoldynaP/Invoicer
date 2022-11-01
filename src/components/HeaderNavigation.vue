<template>
  <div class="header-navigation">
        <div class="header-navigation__left">

        </div>
        <div class="header-navigation__right">
            <span class="header-navigation__user">{{ name }}</span>
            <div class="header-navigation__logout">
                <button type="submit" @click="Logout" value="SignOut" class="purple">Logout</button>
            </div>
        </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
    name: "HeaderNavigation",

    setup() {
        const name = ref("");
        
        onBeforeMount(() => {
            const user = firebase.auth().currentUser
            if (user) {
                name.value = user.email;
            }

        });

        const Logout = () => {
            firebase
                .auth()
                .signOut()
                .then(() => console.log("Signed Out"))
                .catch(err => alert(err.message))
        }

        return {
            Logout,            
            name
        }
    }
}   
</script>

<style lang="scss" scoped>
    .header-navigation {
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
        max-width: 1180px;
        margin: 0 auto;
        &__right {
            display: flex;
            justify-content: right;
            align-items: center;
            gap: 15px;
        }
    }
</style>