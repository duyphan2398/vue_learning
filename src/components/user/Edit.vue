<template>
    <div>
        <Form></Form>
    </div>
</template>

<script>
    import {store} from "../../store/store";
    import Form from "./Form";

    export default {
        name: "Edit",
        components: {
            Form
        },
        async beforeRouteEnter(to, from, next) {
            let user = await store.dispatch('getSpecialUser', to.params.id);
            to.meta['user'] = user.data.data;
            return next();
        }
    }
</script>

<style scoped>

</style>