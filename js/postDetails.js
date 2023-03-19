// На странице post-details.html:
// Вивести всю, без виключення, інформацію про об'єкт post на який клікнули
// Нижчє інформаці про пост, вивести всі коментарі поточного поста
// (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)


// Отримуємо один пост з URL
const url = new URL(location.href)
const data = url.searchParams.get('data')
const post = {...JSON.parse(data)}

const urlPosts = `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`

const getComments = async () => {
    try {
        const response = await fetch(urlPosts)
        return await response.json()
    } catch (error) {
        console.log('Error:', error)
    }
}

function createComments(comment) {
    return `
           <div class="wrapper_comment">
               <div class="post_info-item">Name: ${comment.name}</div>
               <div class="post_info-item">Email: ${comment.email}</div>
               <div class="post_info-item">Body: ${comment.body}</div>
           </div>
  `
}

const commentsDiv = document.querySelector('.comments')
const divPosts = document.querySelector('.posts')
const btnComments = document.createElement('button')
btnComments.classList.add('btn_comments')
btnComments.innerText = 'VIEW COMMENTS'


let status = false
getComments().then((comments) => {
    btnComments.addEventListener('click', function () {
        commentsDiv.innerText = ''
        if (status) {
            status = false
            commentsDiv.innerText = ''
            btnComments.innerText = 'VIEW COMMENTS'
        } else {
            commentsDiv.innerHTML = comments.map(comment => createComments(comment)).join('')
            status = true
            btnComments.innerText = 'HIDE COMMENTS'
        }
    })
})


divPosts.innerHTML = `
     <div class="comment_info-item">User Id: ${post.userId}</div>
     <div class="comment_info-item">Id: ${post.id}</div>
     <div class="comment_info-item">Title: ${post.title}</div>
     <div class="comment_info-item">Body: ${post.body}</div>
     `

divPosts.append(btnComments)


