<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-header">
                        <h3
                            class="d-flex justify-content-between align-items-center"
                        >
                            Available Genres
                            <div class="justify-content-between">
                                <div>
                                    <button
                                        class="btn btn-secondary"
                                        type="button"
                                        @click="
                                            this.$router.push('/genres/add')
                                        "
                                    >
                                        New Genre
                                    </button>
                                </div>
                            </div>
                        </h3>
                    </div>
                    <div class="card-body">
                        <div class="row col-3 float-end p-2">
                            <input
                                v-model="strSearch"
                                type="text"
                                class="form-control text-right mb-2"
                                placeholder="Search Genre Here"
                            />
                        </div>

                        <table class="table table-hover table-sm">
                            <thead class="bg-dark text-light">
                                <tr>
                                    <th width="50" class="text-center">#</th>
                                    <th>Genre</th>
                                    <th class="text-center" width="200">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(genre, index) in genres"
                                    :key="genre.id"
                                >
                                    <td class="text-center">
                                        {{ index + 1 }}.
                                    </td>
                                    <td>{{ genre.name }}</td>
                                    <td class="text-center">
                                        <router-link
                                            :to="{
                                                name: 'editgenre',
                                                params: { id: genre.id },
                                            }"
                                            class="btn btn-light"
                                            >Edit</router-link
                                        >
                                        <button
                                            class="btn btn-primary m-1"
                                            @click="deleteGenre(genre.id)"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "dashboard",
    data() {
        return {
            genres: [],
            strSuccess: "",
            strError: "",
            strSearch: null,
        };
    },
    watch: {
        strSearch(after, before) {
            this.getResults();
        },
    },
    created() {
        this.$axios.get("/sanctum/csrf-cookie").then((response) => {
            this.$axios
                .get("/api/genres")
                .then((response) => {
                    // console.log(response);
                    this.genres = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    },
    methods: {
        deleteGenre(id) {
            this.$axios.get("/sanctum/csrf-cookie").then((response) => {
                let existingObj = this;

                if (confirm("Do you really want to delete this data?")) {
                    this.$axios
                        .delete(`/api/genres/delete/${id}`)
                        .then((response) => {
                            let i = this.genres
                                .map((item) => item.id)
                                .indexOf(id); // find index of your object
                            this.genres.splice(i, 1);
                            existingObj.strError = "";
                            existingObj.strSuccess = response.data.success;
                        })
                        .catch(function (error) {
                            existingObj.strError = "";
                            existingObj.strSuccess =
                                error.response.data.message;
                        });
                }
            });
        },
        getResults() {
            this.$axios.get("/sanctum/csrf-cookie").then((response) => {
                this.$axios
                    .get("/api/genres", { params: { search: this.strSearch } })
                    .then((response) => {
                        this.genres = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        },
    },
};
</script>
