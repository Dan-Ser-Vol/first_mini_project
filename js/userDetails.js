// На странице user-details.html:
// Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
// котра має детальну інфу про поточний пост.

const url = new URL(location.href)
const data = url.searchParams.get('data')
const user = {...JSON.parse(data)}


const divDetail = document.createElement('div')
const divInfo = document.querySelector('.info');
const btnPosts = document.querySelector('.btn_posts');
divDetail.innerText = ''


const urlPosts = `https://jsonplaceholder.typicode.com/users/${user.id}/posts`
const getPosts = async () => {
try {
    const res = await fetch(urlPosts)
    return await res.json()
}catch (error) {
    console.log('Error:', error);
}
}

let status = false
getPosts().then((posts) => {
    const postBlock = document.querySelector('.post_block')
    btnPosts.addEventListener('click', function () {

        if (status) {
            postBlock.innerHTML = '';
            status = false;
            btnPosts.innerText = 'VIEW USER POSTS'
        } else {
            postBlock.innerHTML = ''
            const h3 = document.createElement('h3')
            h3.innerText = 'Title Posts'
            h3.style.color = 'white'
            postBlock.appendChild(h3)

            for (const userPost of posts) {
                const postA = document.createElement('a')
                postA.classList.add('link')
                postA.href = 'post-details.html?data=' + JSON.stringify(userPost)
                postA.innerText = `Title: ${userPost.title}`
                postBlock.append(postA)
            }
            status = true
            btnPosts.innerText = 'HIDE USER POSTS'
        }
    })
})


function renderObject(obj) {
    const divUserInfo = document.createElement('div');
    for (const key in obj) {
        const value = obj[key];

        const divItem = document.createElement('div');
        divItem.classList.add('item')

        if (typeof value === 'object') {
            divItem.textContent = `${key}:`
            divItem.appendChild(renderObject(value));
        } else {
            divItem.textContent = `${key}:  ${value}`;
        }
        divUserInfo.appendChild(divItem);
    }
    return divUserInfo;
}

const resultDiv = renderObject(user);
divInfo.appendChild(resultDiv);

