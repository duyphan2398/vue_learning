<template>
    <div>
        <router-link
                tag="a"
                :to="{name : 'home'}"
                :active-class="'active'"
                exact
        >Home
        </router-link>
        <router-link
                tag="a"
                :to="{name: 'userIndex'}"
                :active-class="'active'"
                exact
        >User List
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style scoped>
    .active {
        background-color: red;
        color: #931f22;
    }
</style>