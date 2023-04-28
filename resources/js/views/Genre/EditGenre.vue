<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-header">
                        <h3
                            class="d-flex justify-content-between align-items-center"
                        >
                            Edit Genre
                            <div class="justify-content-between">
                                <div>
                                    <router-link
                                        :to="{ name: 'genres' }"
                                        class="btn btn-secondary"
                                        >Go Back</router-link
                                    >
                                </div>
                            </div>
                        </h3>
                    </div>
                    <div class="card-body">
                        <div
                            v-if="strSuccess"
                            class="alert alert-success alert-dismissible fade show"
                            role="alert"
                        >
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                            ></button>
                            <strong>{{ strSuccess }}</strong>
                        </div>

                        <div
                            v-if="strError"
                            class="alert alert-danger alert-dismissible fade show"
                            role="alert"
                        >
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                            ></button>
                            <strong>{{ strError }}</strong>
                        </div>

                        <form
                            @submit.prevent="updateGenre"
                            enctype="multipart/form-data"
                        >
                            <div class="form-group mb-2">
                                <label>Genre</label
                                ><span class="text-danger"> *</span>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="genre.name"
                                    placeholder="Enter genre title"
                                />
                            </div>

                            <button
                                type="submit"
                                class="btn btn-primary mt-4 mb-4"
                            >
                                Update Genre
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Genre",
    data() {
        return {
            genre: {
                name: "",
            },
            strSuccess: "",
            strError: "",
        };
    },
    created() {
        this.$axios.get("/sanctum/csrf-cookie").then((response) => {
            this.$axios
                .get(`/api/genres/edit/${this.$route.params.id}`)
                .then((response) => {
                    this.genre.name = response.data["name"];
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    },
    methods: {
        updateGenre(e) {
            this.$axios.get("/sanctum/csrf-cookie").then((response) => {
                let existingObj = this;
                const config = {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                };

                this.$axios;
                this.$axios
                    .post(`/api/genres/update/${this.$route.params.id}`, this.genre, config)
                    .then((response) => {
                        existingObj.strError = "";
                        existingObj.strSuccess = response.data.success;
                    })
                    .catch(function (error) {
                        existingObj.strSuccess = "";
                        existingObj.strError = error.response.data.message;
                    });
            });
        },
    },
};
</script>
