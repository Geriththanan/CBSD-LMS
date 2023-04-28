<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-header">
                        <h3
                            class="d-flex justify-content-between align-items-center"
                        >
                            Edit Book
                            <div class="justify-content-between">
                                <div>
                                    <router-link
                                        :to="{ name: 'books' }"
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
                            @submit.prevent="updateBook"
                            enctype="multipart/form-data"
                        >
                            <div class="form-group mb-2">
                                <label>Title</label
                                ><span class="text-danger"> *</span>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="book.title"
                                    placeholder="Enter book title"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <label>Description</label
                                ><span class="text-danger"> *</span>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="book.description"
                                    placeholder="Enter book description"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <label>Price</label
                                ><span class="text-danger"> *</span>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="book.price"
                                    placeholder="Enter book price"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <label>Genre</label
                                ><span class="text-danger"> *</span>
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="book.genre.id"
                                >
                                    <option disabled selected>
                                        Open this select menu
                                    </option>
                                    <option
                                        v-for="genre in book.genres"
                                        :value="genre.id"
                                    >
                                        {{ genre.name }}
                                    </option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                class="btn btn-primary mt-4 mb-4"
                            >
                                Update Book
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
    name: "Book",
    data() {
        return {
            book: {
                title: "",
                description: "",
                price: "",
                genre: {
                    id: "",
                    name: "",
                },
                genres: [
                    { id: "", name: "" },
                ],
            },
            strSuccess: "",
            strError: "",
        };
    },
    created() {
        this.$axios.get("/sanctum/csrf-cookie").then((response) => {
            this.$axios
                .get(`/api/books/edit/${this.$route.params.id}`)
                .then((response) => {
                    // console.log(response.data);
                    this.book.title = response.data.data["title"];
                    this.book.description = response.data.data["description"];
                    this.book.price = response.data.data["price"];
                    this.book.genre = response.data.data["genre"];
                    this.book.genres = response.data.data["genres"];
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    },
    methods: {
        updateBook(e) {
            this.$axios.get("/sanctum/csrf-cookie").then((response) => {
                let existingObj = this;
                const config = {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                };

                this.$axios;
                this.$axios
                    .post(
                        `/api/books/update/${this.$route.params.id}`,
                        this.book,
                        config
                    )
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
