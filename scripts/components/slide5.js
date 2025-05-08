const dialogue = [
  {
    actor: 'user',
    speech: 'Ich möchte Katzen auf YouTube anschauen. Öffne YouTube für mich.',
    status: 'connected',
  },
  {
    actor: 'browser',
    speech: 'Einen Moment...',
    status: '',
  },
  {
    actor: 'browser',
    speech: 'Hey, Provider, kennst du YouTube?',
    status: '',
  },
  {
    actor: 'provider',
    speech: 'Noch nicht, aber ich kenne jemanden, der es weiß.',
    status: '',
  },
  {
    actor: 'provider',
    speech: 'Psst, DNS, hast du Infos über YouTube? Ein Freund fragt.',
    status: '',
  },
  {
    actor: 'dns',
    speech: 'Hmm... Ich schaue mal nach.',
    status: '',
  },
  {
    actor: 'dns',
    speech: 'Gefunden! Hier ist die IP-Adresse von YouTube – 173.194.79.104',
    status: '',
  },
  {
    actor: 'provider',
    speech: 'Perfekt. Ich leite es an den Browser weiter.',
    status: '',
  },
  {
    actor: 'browser',
    speech: 'Also ist YouTube unter 173.194.79.104 erreichbar? Werde ich mir merken.',
    status: '',
  },
  {
    actor: 'browser',
    speech: 'Dann schicke ich jetzt meine HTTP-Nachricht dorthin.',
    status: '',
  },
  {
    actor: 'provider',
    speech: 'Alles klar. Sende sie an die Adresse (173.194.79.104).',
    status: '',
  },
  {
    actor: 'provider',
    speech: 'Hallo Server. Der Browser möchte Katzen sehen. Hier seine Nachricht.',
    status: '',
  },
  {
    actor: 'server',
    speech: 'Hier ist die HTML-Seite.',
    status: '',
  },
  {
    actor: 'provider',
    speech: 'Browser, ich habe eine HTML-Seite von YouTube für dich.',
    status: '',
  },
  {
    actor: 'browser',
    speech: 'Empfangen. Beginne mit dem Anzeigen für den Benutzer.',
    status: '',
  },
  {
    actor: 'user',
    speech: 'Okay... Irgendwas lädt...',
    status: '',
  },
  {
    actor: 'browser',
    speech: 'Einen Moment noch. Es fehlen noch Dateien: Bilder, Videos, Stylesheets... Ich fordere sie nach.',
    status: '',
  },
  {
    actor: 'provider',
    speech: 'Mist. Schicke sie gleich weiter.',
    status: '',
  },
  {
    actor: 'provider',
    speech: 'Hey Webserver, schick bitte die restlichen Dateien.',
    status: '',
  },
  {
    actor: 'server',
    speech: 'Hier sind CSS, JavaScript, Bilder und alles, was sonst noch nötig ist.',
    status: '',
  },
  {
    actor: 'provider',
    speech: 'Alles klar, leite weiter.',
    status: '',
  },
  {
    actor: 'browser',
    speech: 'Okay, jetzt habe ich alles. Zeige die vollständige Seite dem Benutzer.',
    status: '',
  },
  {
    actor: 'user',
    speech: 'Aww... Katzen!',
    status: '',
  },
]


function initDialog() {
  let currentStep = 0;
  const user = document.getElementById('user');
  const browser = document.getElementById('browser');
  const provider = document.getElementById('provider');
  const dns = document.getElementById('dns');
  const server = document.getElementById('server');
  const userSpeech = document.getElementById('user-speech');
  const browserSpeech = document.getElementById('browser-speech');
  const providerSpeech = document.getElementById('provider-speech');
  const dnsSpeech = document.getElementById('dns-speech');
  const serverSpeech = document.getElementById('server-speech');

  // Функция для обновления состояния сцены
  function updateScene() {
    // Сбрасываем активные состояния
    user.classList.remove('active');
    browser.classList.remove('active');
    provider.classList.remove('active');
    dns.classList.remove('active');
    server.classList.remove('active');
    
    // Получаем текущий шаг диалога
    const step = dialogue[currentStep];

    if (step) {
      switch (step.actor) {
        case 'user':
          user.classList.add('active');
          userSpeech.textContent = step.speech;
          break;
        case 'browser':
          browser.classList.add('active');
          browserSpeech.textContent = step.speech;
          break;
        case 'provider':
          provider.classList.add('active');
          providerSpeech.textContent = step.speech;
          break;
        case 'dns':
          dns.classList.add('active');
          dnsSpeech.textContent = step.speech;
          break;
        case 'server':
          server.classList.add('active');
          serverSpeech.textContent = step.speech;
          break;
        default:
          break;
      }
    } else {
      currentStep = 0;
      updateScene();
    }

    // Увеличиваем шаг для следующего обновления
      currentStep++;
    }


  document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
      event.preventDefault();
      updateScene();
  }
  });
}

setTimeout(() => {
  initDialog()
}, 100)
