// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на
// сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули


async function getUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        return await response.json();
    } catch (error) {
        console.log('Error:', error);
    }
}

function createUserHTML(user) {
    return `
    <div class="user_info">
      <div>ID: ${user.id}</div>
      <div>NAME: ${user.name}</div>
      <a class="btn_user_info" href='user-details.html?data=${JSON.stringify(user)}'>USER INFO</a>
    </div>
  `;
}

function renderUsers(users) {
    const container = document.querySelector('.container');
    container.innerHTML = users.map(user => createUserHTML(user)).join('');
}

getUsers().then(renderUsers);































