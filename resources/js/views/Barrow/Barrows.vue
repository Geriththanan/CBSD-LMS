<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-header">
                        <h3
                            class="d-flex justify-content-between align-items-center"
                        >
                            Lendered Books
                        </h3>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between pb-2 mb-2">
                            <div class="col-4">
                                <div class="input-group">
                                    <label
                                        class="input-group-text"
                                        for="inputGroupSelect01"
                                        >Filter with Genre</label
                                    >
                                    <select
                                        class="form-select"
                                        id="inputGroupSelect01"
                                        v-model="selectedGenre"
                                    >
                                        <option>All</option>
                                        <option
                                            v-for="genre in genres"
                                            :value="genre.id"
                                        >
                                            {{ genre.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <input
                                    v-model="strSearch"
                                    type="text"
                                    class="form-control"
                                    placeholder="🔍 Title / Descripton"
                                />
                            </div>
                        </div>
                        <table class="table table-hover table-sm">
                            <thead class="bg-dark text-light">
                                <tr>
                                    <th width="50" class="text-center">#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th 
                                        v-if="user.user_type == 'admin'"
                                        width="100"
                                    >Lendered By</th>
                                    <th>Genre</th>
                                    <th class="text-center" width="200">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(book, index) in books"
                                    :key="book.id"
                                >
                                    <td class="text-center">
                                        {{ index + 1 }}.
                                    </td>
                                    <td>{{ book.title }}</td>
                                    <td>{{ book.description }}</td>
                                    <td
                                        v-if="user.user_type == 'admin'"
                                    >{{ book.userdata['0'].name }}</td>
                                    <td>{{ book.genre.name }}</td>
                                    <td class="text-center">
                                        
                                        <button
                                            v-if="!filterlenderedBook(book.id)"
                                            class="btn btn-light m-1"
                                            @click="lenderBook(book.id)"
                                        >
                                        🔰
                                        </button>
                                        <button
                                            v-if="filterAuthUserlenderedBook(book.id)"
                                            class="btn btn-warning  m-1"
                                            @click="returnBook(book.id)"
                                        >
                                        🔙
                                        </button>
                                        <button
                                            v-if="filterlenderedBooksByOtherUsers(book.id)"
                                            class="btn btn-light m-1"
                                            disabled
                                        >
                                        🔜
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
    name: "barrows",
    data() {
        return {
            user: this.$store.state.auth.user,
            books: [],
            genres: [],
            bookLenderedByAuthUser: [],
            booksLendered: [],
            bookLenderedByOtherUser: [],
            selectedGenre: "All",
            strSuccess: "",
            strError: "",
            strSearch: null,
        };
    },
    watch: {
        strSearch(after, before) {
            this.getResults();
        },
        selectedGenre(after, before) {
            this.getResults();
        },
    },
    created() {
        this.$axios.get("/sanctum/csrf-cookie").then((response) => {
            this.$axios
                .get("/api/lenders")
                .then((response) => {
                    // console.log(response);
                    this.books = response.data.data;
                    this.genres = response.data.genres;
                    this.bookLenderedByAuthUser =
                        response.data.bookLenderedByAuthUser;
                    this.booksLendered = response.data.booksLendered;
                    this.bookLenderedByOtherUser = response.data.bookLenderedByOtherUser;
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    },
    methods: {
        filterlenderedBook(book) {
            return this.booksLendered.filter((n) => n === book).length === 0
                ? false
                : true; // false
        },
        filterAuthUserlenderedBook(book) {
            return this.bookLenderedByAuthUser.filter((n) => n === book).length === 0
                ? false
                : true; // false
        },
        filterlenderedBooksByOtherUsers(book) {
            return this.bookLenderedByOtherUser.filter((n) => n === book).length === 0
                ? false
                : true; // false
        },
        lenderBook(id) {
            // alert(id);
            this.$axios.get("/sanctum/csrf-cookie").then((response) => {
                let existingObj = this;

                if (confirm("Do you really want to Lender this Book?")) {
                    this.$axios
                        .delete(`/api/books/lender/${id}`)
                        .then((response) => {
                            existingObj.strError = "";
                            existingObj.strSuccess = response.data.success;
                            this.getResults()
                        })
                        .catch(function (error) {
                            existingObj.strError = "";
                            existingObj.strSuccess =
                                error.response.data.message;
                        });
                }
            });
        },
        returnBook(id) {
            // alert(id);
            this.$axios.get("/sanctum/csrf-cookie").then((response) => {
                let existingObj = this;

                if (confirm("Do you really want to Return this Book?")) {
                    this.$axios
                        .delete(`/api/books/return/${id}`)
                        .then((response) => {
                            existingObj.strError = "";
                            existingObj.strSuccess = response.data.success;
                            this.getResults()
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
                    .get("/api/lenders", {
                        params: {
                            search: this.strSearch,
                            genre: this.selectedGenre,
                        },
                    })
                    .then((response) => {
                        this.books = response.data.data;
                    this.genres = response.data.genres;
                    this.bookLenderedByAuthUser =
                        response.data.bookLenderedByAuthUser;
                    this.booksLendered = response.data.booksLendered;
                    this.bookLenderedByOtherUser = response.data.bookLenderedByOtherUser;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        },
    },
};
</script>
