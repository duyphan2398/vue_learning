<template>
    <div class="container-fluid">
        <Nav></Nav>
        <div class="row">
            <div class="col">
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>

<script>
    import Nav from "./components/shared/Nav";

    export default {
        name: 'App',
        components: {
            Nav
        }
    }
</script>

<style>
    body {
        margin: 20px;
    }
</style>
