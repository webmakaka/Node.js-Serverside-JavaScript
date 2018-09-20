const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '556179222:AAGmOyvfmkdOg7EdUpXs6kAINffQUsC_cgE';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const id = msg.chat.id;
  const text = msg
    .text
    .toLowerCase();
  if (text === 'hi') {
    bot.sendMessage(id, 'Hello bro!');
  }
  if (text === 'answer') {
    bot.sendMessage(id, 'Test', {
      reply_markup: {
        force_reply: true
      }
    });
  }
  if (text === 'close') {
    bot.sendMessage(id, 'close keyboard', {
      reply_markup: {
        remove_keyboard: true
      }
    });
  }
});

bot.onText(/\/audio/, (msg, match) => {
  const id = msg.chat.id;
  const file = './files/no-milk-today.mp3';
  bot.sendMessage(id, 'Begin download...');
  bot.sendAudio(id, file, {
    caption: 'My music'
  }, {filename: 'myname'}).then(() => {
    bot.sendMessage(id, 'Done');
  });
});

bot.onText(/\/doc/, (msg, match) => {
  const id = msg.chat.id;
  const stream = fs.createReadStream(__dirname + '/files/sql.pdf');
  bot.sendDocument(id, stream)
});

bot.onText(/\/pic/, (msg, match) => {
  const id = msg.chat.id;
  const stream = fs.createReadStream(__dirname + '/files/sova.jpg');
  bot.sendPhoto(id, './files/sova.jpg')
});

bot.onText(/\/video/, (msg, match) => {
  const id = msg.chat.id;
  const stream = fs.createReadStream(__dirname + '/files/train.3gp');
  bot.sendVideo(id, stream)
});

bot.onText(/\/kbd/, (msg, match) => {
  const id = msg.chat.id;
  bot.sendMessage(id, 'Keyboard', {
    reply_markup: {
      keyboard: [
        [
          {
            text: 'Close'
          }, {
            text: 'Answer'
          }
        ],
        [
          {
            text: 'Send my contact',
            request_contact: true
          }
        ]
      ],
      one_time_keyboard: true
    }
  })
});

bot.onText(/\/ikbd/, (msg, match) => {
  const id = msg.chat.id;
  bot.sendMessage(id, 'Inline Keyboard', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'LoftSchool',
            url: 'https://loftschool.com/'
          }
        ],
        [
          {
            text: 'About',
            callback_data: 'about'
          }, {
            text: 'Contact',
            callback_data: 'contact'
          }
        ]
      ]
    }
  })
});

bot.on('callback_query', query => {
  const id = query.message.chat.id;
  if (query.data === 'about') {
    bot.sendMessage(id, 'Мы лучшая компания всех времен!');
  }
  if (query.data === 'contact') {
    bot.sendMessage(id, 'Наш адрес www.leningrad.ru!');
    bot.answerCallbackQuery(query.id, 'Только для ВАС!');
  }
})

bot.on('inline_query', query => {
  const results = [
    {
      id: 1,
      type: 'article',
      title: 'Head part One',
      input_message_content: {
        message_text: 'Irure ea mollit sunt in aute voluptate. Nulla ut labore nisi deserunt consequat ' +
            'nulla dolor reprehenderit. Id ipsum laborum cillum enim laborum mollit non volup' +
            'tate pariatur. Ex est id velit anim dolor sit est amet aliquip esse tempor sunt ' +
            'ex. Ea est minim in culpa velit exercitation fugiat laboris ex cupidatat ad. Com' +
            'modo quis minim exercitation nulla ad irure consectetur esse. Qui magna eu conse' +
            'quat veniam do cupidatat.'
      }
    }, {
      id: 2,
      type: 'article',
      title: 'Head part Two',
      input_message_content: {
        message_text: 'Ipsum voluptate velit pariatur dolore do mollit. Esse ut reprehenderit ad qui qu' +
            'is officia labore et labore incididunt. Ea reprehenderit pariatur pariatur aliqu' +
            'a sint dolor velit elit officia irure. Adipisicing ad velit duis elit pariatur c' +
            'ulpa do. Cupidatat ad ullamco sunt mollit anim reprehenderit aliqua tempor elit.'
      }
    }
  ]

  bot.answerInlineQuery(query.id, results, {
    cache_time: 0,
    switch_pm_text: 'Читайте нас везде',
    switch_pm_parameter: 'test'
  })
})

bot.onText(/\/help/, (msg, match) => {
  const id = msg.chat.id;
  const md = `
  *Список команд*
  audio - _Получить любимую песню бота_
  doc - _Получить SQL cheats_
  pic - _Получить картинку аватарки_
  video - _Получить паравозик_
  kbd - _Вызвать клавиатуру_
  ikbd - _Вызвать инлайн клавиатуру_
  help - _Взывать эту помощь_
  about - _О боте немного_
  `
  bot.sendMessage(id, md, {parse_mode: 'Markdown'});
});

bot.onText(/\/about/, (msg, match) => {
  const id = msg.chat.id;
  const html = `
  <b>About</b>
  <i>I am the best Bot</i>
  <a href="http://loftschool.com/">LoftSchool</a>
  `
  bot.sendMessage(id, html, {
    // disable_web_page_preview: true,
    parse_mode: 'HTML'
  });
});