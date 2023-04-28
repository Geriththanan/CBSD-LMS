<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-header">
                        <h3
                            class="d-flex justify-content-between align-items-center"
                        >
                            Create Book
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
                                @submit.prevent="addBook"
                                enctype="multipart/form-data"
                            >
                                <div class="form-group mb-2">
                                    <label>Title</label
                                    ><span class="text-danger"> *</span>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="book.title"
                                        placeholder="Enter Book Title"
                                    />
                                </div>
                                <div class="form-group mb-2">
                                    <label>Description</label
                                    ><span class="text-danger"> *</span>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="book.description"
                                        placeholder="Enter Book Description"
                                    />
                                </div>
                                <div class="form-group mb-2">
                                    <label>Price</label
                                    ><span class="text-danger"> *</span>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="book.price"
                                        placeholder="Enter Book Price"
                                    />
                                </div>
                                <div class="form-group mb-2">
                                    <label>Genre</label
                                    ><span class="text-danger"> *</span>
                                    <select
                                        class="form-select"
                                        aria-label="Default select example"
                                        v-model="book.genre.id"
                                        placeholder="Select Genre"
                                    >
                                        
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
                                    Add Book
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Add Books    ",
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
            formFieldsCopy: {
                genre: {
                    id: ""
                }
            },
        };
    },
    created() {
        this.$axios.get("/sanctum/csrf-cookie").then((response) => {
            this.$axios
                .get(`/api/books/create`)
                .then((response) => {
                    console.log(response);
                    this.book.genres = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    },
    methods: {
        addBook(e) {
            this.$axios.get("/sanctum/csrf-cookie").then((response) => {
                let existingObj = this;
                const config = {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                };

                this.$axios
                    .post("/api/books/add", this.book, config)
                    .then((response) => {
                        existingObj.strError = "";
                        existingObj.strSuccess = response.data.success;
                        this.resetFormFields();
                    })
                    .catch(function (error) {
                        existingObj.strSuccess = "";
                        existingObj.strError = error.response.data.message;
                    });
            });
        },
        resetFormFields() {
            this.genre = { ...this.formFieldsCopy };
        },
    },
};
</script>
