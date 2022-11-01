<template>
    <header  @mouseenter="toggleNavigation" @mouseleave="toggleNavigation"  class="flex" :class="{ active: navigationActive}" >
        <div class="branding flex">
            <router-link :to="{ name: 'Home'}">
              <img src="@/assets/file-invoice-dollar-solid.png" alt=""/>
            </router-link>
          </div>
          <div class="menu-list">
              <ul>
                <li class="menu-list__item">
                  <span class="icon">
                    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 20" xml:space="preserve"><path d="M16 18H2V7h14m-3-7v2H5V0H3v2H2C.9 2 0 2.9 0 4v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-1V0m-1 11H9v5h5v-5z"/></svg>
                  </span>
                  <span class="menu-list__item-text">Calendar</span>
                </li>
                <router-link :to="{ name: 'Settings'}">
                <li class="menu-list__item">
                  <span class="icon">
                    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50"> <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"/></svg>
                  </span>
                  <span class="menu-list__item-text">Settings</span>
                </li>
                </router-link>
              </ul>
          </div>
    </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
      return {
      }
    },
    name: "Navigation",

    methods: {
    ...mapMutations(["TOGGLE_NAVIGATION"]),

    toggleNavigation() {
      this.TOGGLE_NAVIGATION();
    }
    },
    computed: {
      ...mapState(["navigationActive"]),
    }
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  z-index: 99;
  gap: 20px;
  flex-direction: row;
  background-color: #1e2139;
  cursor: pointer;
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
    transition: 0.3s;
    &.active {
      min-width: 160px;
      & .menu-list__item {
        justify-content: left;
      }
      & .menu-list__item-text {
        max-width: 100%;
        transition: 0.3;
      }
    }
  .branding {
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: center;
    padding: 24px;
    cursor: pointer;
    width: 100%;

    img {
      width: auto;
      height: 30px;
    }
  }
  .menu-list {
    a {
      text-decoration: none;
    }
    & ul {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    &__item {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-radius: 25px;
      &:hover {
        background-color: #262a47;;
      }
    }
    & .icon {
      color: #fff;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
    &__item-text {
      color: #fff;
      max-width: 0;
      overflow: hidden;
      transition: 0.3;
      
    }

  }
}
</style>