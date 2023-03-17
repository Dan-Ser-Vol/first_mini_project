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
               <div class="postInfoItem">Name: ${comment.name}</div>
               <div class="postInfoItem">Email: ${comment.email}</div>
               <div class="postInfoItem">Body: ${comment.body}</div>
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
     <div class="postInfoItem">User Id: ${post.userId}</div>
     <div class="postInfoItem">Id: ${post.id}</div>
     <div class="postInfoItem">Title: ${post.title}</div>
     <div class="postInfoItem">Body: ${post.body}</div>
     `

divPosts.append(btnComments)


