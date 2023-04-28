<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-header">
                        <h3>Dashboard</h3>
                    </div>
                    <div class="card-body">
                        <p class="mb-0">Your are logged in id <b>{{user.id}}</b></p>
                        <p class="mb-0">Your are logged in as <b>{{user.name}}</b></p>
                        <p class="mb-0">You are logged in as <b>{{user.email}}</b></p>
                        <p class="mb-0">You are logged in as <b>{{user.user_type}}</b></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"dashboard",
    data(){
        return {
            user:this.$store.state.auth.user
        }
    }
}
</script>