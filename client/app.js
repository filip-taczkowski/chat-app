{
  const socket = io();

  socket.on('message', ({ author, content }) => addMessage(author, content));

  const select = {
    loginForm: '#welcome-form',
    messagesSection: '#messages-section',
    messagesList: '#messages-list',
    addMessageForm: '#add-messages-form',
    userNameInput: '#username',
    messageContentInput: '#message-content',
  };

  const loginForm = document.querySelector(select.loginForm);
  const messagesSection = document.querySelector(select.messagesSection);
  const messagesList = document.querySelector(select.messagesList);
  const addMessageForm = document.querySelector(select.addMessageForm);
  const userNameInput = document.querySelector(select.userNameInput);
  const messageContentInput = document.querySelector(select.messageContentInput);

  let userName = '';

  function login (e) {
    e.preventDefault();
    
    if (!userNameInput.value) {
      alert('Please enter correct user name!');
      return;
    } else {
      userName = userNameInput.value;
      loginForm.classList.remove('show');
      messagesSection.classList.add('show');
    }
  }

  function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
  }

  function sendMessage (e) {
    e.preventDefault();

    let messageContent = messageContentInput.value;

    if (!messageContentInput.value) {
      alert('Please enter message!');
    } else {
      addMessage(userName, messageContent);
      socket.emit('message', { author: userName, content: messageContent })
      messageContentInput.value = '';
    }
  }

  loginForm.addEventListener('submit', e => {
    login(e);
  });

  addMessageForm.addEventListener('submit', e => {
    sendMessage(e);
  });


}