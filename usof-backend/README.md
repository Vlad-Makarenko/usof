<h1>usof back-end</h1>

<p>This project was done as a back-end part of the full-stack project for the ucode-connect</p>

<h2>Technologies Used</h2>

<ul>
    <li>NodeJs</li>
    <li>Express</li>
    <li>MySql</li>
    <li>Sequelize</li>
    <li>AdminJs</li>
</ul>
<h2>Setup</h2>

<p>Clone down this repository. You will need node and npm installed globally on your machine.
</p>
<p> 
Installation

`npm install`

To Start Server:

`npm start`

To Visit App:

`http://localhost:5000/`

To Visit Admin Panel:

`http://localhost:5000/admin`

</p>

<h2>Using the API</h2>
<p>
    <b>Authorization module</b>
        <table width="100%">
            <thead>
                <tr>
                    <td><b>Request</b></td>
                    <td><b>Description</b></td>
                    <td><b>Handler function</b></td>
                </tr>
            </thead>
            <tr>
                <td><code>POST - /api/auth/register</code></td>
                <td>Registration of a new user, required parameters are[login, password, password confirmation, email]</td>
                <td><code>registration(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>POST - /api/auth/login</code></td>
                <td>Log in user, required parameters are [login, email,password]. Only users with a confirmed email can sign in</td>
                <td><code>login(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>GET - /api/auth/refresh</code></td>
                <td>Refresh token</td>
                <td><code>refreshToken(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>POST - /api/auth/logout</code></td>
                <td>Log out authorized user</td>
                <td><code>logout(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>POST - /api/auth/password-reset</code></td>
                <td>Send a reset link to user email, requiredparameter is [email]</td>
                <td><code>passwordReset(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>POST - /api/auth/password-reset/:confirm_token</code></td>
                <td>Confirm new password with atoken from email, required parameter is a [new password]</td>
                <td><code>passwordConfirm(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>POST - /api/auth/activate/:confirm_token</code></td>
                <td>Accaunt activation </td>
                <td><code>activation(req, res, next)</code></td>
            </tr>
        </table>
    </p>
    <br>
    <p><b>User module</b>
        <table width="100%">
            <thead>
                <tr>
                    <td><b>Request</b></td>
                    <td><b>Description</b></td>
                    <td><b>Handler function</b></td>
                </tr>
            </thead>
            <tr>
                <td><code>GET - /api/users</code></td>
                <td>Get all users</td>
                <td><code>allUsers(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>GET - /api/users/:user_id</code></td>
                <td>Get specified user data</td>
                <td><code>userById(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>POST - /api/users</code></td>
                <td>Create a new user, required parameters are [login, password,password confirmation, email, role]. This feature must be accessible only foradmins</td>
                <td><code>adminRegistration(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>PATCH - /api/users/avatar</code></td>
                <td>Upload user avatar</td>
                <td><code>avatarUpdate(req, res, next)</code></td>
            </tr>
             <tr>
                <td><code>DELETE - /api/users/avatar</code></td>
                <td>Delete user avatar</td>
                <td><code>deleteAvatar(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>PATCH - /api/users/:user_id</code></td>
                <td>Update user data</td>
                <td><code>userUpdate(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>DELETE - /api/users/:user_id</code></td>
                <td>Delete user</td>
                <td><code>userDelete(req, res, next)</code></td>
            </tr>
        </table>
    </p>
    <br>
    <p><b>Posts module</b>
        <table width="100%">
            <thead>
                <tr>
                    <td><b>Request</b></td>
                    <td><b>Description</b></td>
                    <td><b>Handler function</b></td>
                </tr>
            </thead>
            <tr>
                <td><code>GET - /api/posts</code></td>
                <td>Get all posts</td>
                <td><code>getAllPosts(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>GET - /api/posts/:post_id</code></td>
                <td>Get specified post data</td>
                <td><code>getPost(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>GET - /api/posts/:post_id/comments</code></td>
                <td>Get all comments for the specified post.</td>
                <td><code>getPostComments(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>POST - /api/posts/:post_id/comments</code></td>
                <td>Create a new comment, required parameteris [content]</td>
                <td><code>createPostComment(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>GET - /api/posts/:post_id/categories</code></td>
                <td>Get all categories associated with thespecified post</td>
                <td><code>getPostCategories(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>GET - /api/posts/:post_id/like</code></td>
                <td>Get all likes under the specified post</td>
                <td><code>getPostLikes(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>POST - /api/posts</code></td>
                <td>Create a new post, required parameters are [title, content,categories]</td>
                <td><code>createPost(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>POST - /api/posts/:post_id/like</code></td>
                <td>Create a new like under a post</td>
                <td><code>createPostLike(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>PATCH - /api/posts/:post_id</code></td>
                <td>Update the specified post (its title, body orcategory</td>
                <td><code>updatePost(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>DELETE - /api/posts/:post_id</code></td>
                <td>Delete a post</td>
                <td><code>deletePost(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>DELETE - /api/posts/:post_id/like</code></td>
                <td>Delete a like under a post</td>
                <td><code>deletePostLike(req, res, next)</code></td>
            </tr>
        </table>
    </p>
    <br>
    <p><b>Categories module</b>
        <table width="100%">
           <thead>
                <tr>
                    <td><b>Request</b></td>
                    <td><b>Description</b></td>
                    <td><b>Handler function</b></td>
                </tr>
            </thead>
            <tr>
                <td><code>GET - /api/categories</code></td>
                <td>Get all categories</td>
                <td><code>getAllCategories(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>GET - /api/categories/:category_id</code></td>
                <td>Get specified category data</td>
                <td><code>getCategory(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>GET - /api/categories/:category_id/posts</code></td>
                <td>Get all posts associated with thespecified category</td>
                <td><code>getPostsByCategory(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>POST - /api/categories/</code></td>
                <td>Create a new category, required parameter is [title]</td>
                <td><code>createCategory(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>PATCH - /api/categories/:category_id</code></td>
                <td>Update specified category data</td>
                <td><code>updateCategory(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>DELETE - /api/categories/:category_id</code></td>
                <td>Delete a category</td>
                <td><code>deleteCategory(req, res, next)</code></td>
            </tr>
        </table>
    </p>
    <br>
    <p><b>Comments module</b>
        <table width="100%">
            <thead>
                <tr>
                    <td><b>Request</b></td>
                    <td><b>Description</b></td>
                    <td><b>Handler function</b></td>
                </tr>
            </thead>
            <tr>
                <td><code>GET - /api/comments/:comment_id</code></td>
                <td>Get specified comment data</td>
                <td><code>getComment(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>GET - /api/comments/:comment_id/like</code></td>
                <td>Get all likes under the specifiedcomment</td>
                <td><code>getCommentLikes(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>POST - /api/comments/:comment_id/like</code></td>
                <td>Create a new like under a comment</td>
                <td><code>createCommentLike(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>PATCH - /api/comments/:comment_id</code></td>
                <td>Update specified comment data</td>
                <td><code>updateComment(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>DELETE - /api/comments/:comment_id</code></td>
                <td>Delete a comment</td>
                <td><code>deleteComment(req, res, next)</code></td>
            </tr>
            <tr>
                <td><code>DELETE - /api/comments/:comment_id/like</code></td>
                <td>Delete a like under a comment</td>
                <td><code>deleteCommentLike(req, res, next)</code></td>
            </tr>
        </table>
    </p>

<h3>Also it's possible to sort and filter <code>GET - /api/posts</code> requests:</h3>
    <p><b>Posts module</b>
        <br>
        <table width="100%">
            <thead>
                <tr>
                    <td><b>Query Params</b></td>
                    <td><b>Description</b></td>
                </tr>
            </thead>
                <tr>
                    <td><code>?page={number}</code></td>
                    <td>Each page always contains 10 posts</td>
                </tr>
                <tr>
                    <td><code>?categories={string}</code></td>
                    <td>Search for posts that was contains {string} categories (by category id). {string} should look like {1,34,4,23}</td>
                </tr>
                <tr>
                    <td><code>?sort={string}</code></td>
                    <td>Get posts ordered by {string}. {string} should look like: createdAt,desc, createdAt,asc, likeCount,asc, likeCount,desc</td>
                </tr>
                <tr>
                    <td><code>?date={number}</code></td>
                    <td>Search for posts that was was created after {date}. {number} should be miliseconds</td>
                </tr>
                <tr>
                    <td><code>?user={number}</code></td>
                    <td>Search for posts that was created by {number}. {number} should contains user id.</td>
                </tr>
        </table>
     </p>

<h2>Contact</h2>
<p><span style="margin-right: 30px;"></span><a href="https://github.com/Vlad-Makarenko"><img target="_blank" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" style="width: 10%;"></a></p>