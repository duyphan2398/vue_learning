<template>
    <div>
        <Form></Form>
    </div>
</template>

<script>
    import Request from "../../services/api.service";
    import Form from "./Form";

    export default {
        name: "Edit",
        components: {
            Form
        },
        async beforeRouteEnter(to, from, next) {
            await Request.get('users/' + to.params.id, {
                include: 'roles',
            }).then((res) => {
                to.meta['user'] = res.data.data;
                return next();
            }).catch(() => {
            })
        }
    }
</script>

<style scoped>

</style>