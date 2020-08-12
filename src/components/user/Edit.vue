<template>
    <div>
        <Form></Form>
    </div>
</template>

<script>
    import {apiService} from "../../services/api.service";
    import Form from "./Form";
    import {store} from "../../store/store";

    export default {
        name: "Edit",
        components: {
            Form
        },
        async beforeRouteEnter(to, from, next) {
            await apiService.get('users/' + to.params.id, {
                params: {
                    include: 'roles',
                },
                headers: {
                    'Authorization': 'Bearer ' + store.getters.token
                }
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