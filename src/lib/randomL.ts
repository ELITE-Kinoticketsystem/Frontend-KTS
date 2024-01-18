function getGreetingBasedOnTime() {
    const currentHour = new Date().getHours();
    let timeOfDay;

    if (currentHour >= 5 && currentHour < 12) {
      timeOfDay = "morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      timeOfDay = "afternoon";
    } else {
      timeOfDay = "evening";
    }

    return timeOfDay;
  }

  export function sayGreetingInRandomLanguage() {
    const timeOfDay = getGreetingBasedOnTime();

    const languages = [
      {
        language: "English",
        greetings: {
          morning: "Good morning",
          afternoon: "Good afternoon",
          evening: "Good evening",
        },
      },
      {
        language: "Spanish",
        greetings: {
          morning: "Buenos días",
          afternoon: "Buenas tardes",
          evening: "Buenas noches",
        },
      },
      {
        language: "French",
        greetings: {
          morning: "Bonjour",
          afternoon: "Bon après-midi",
          evening: "Bonsoir",
        },
      },
      {
        language: "German",
        greetings: {
          morning: "Guten Morgen",
          afternoon: "Guten Tag",
          evening: "Guten Abend",
        },
      },
      {
        language: "Italian",
        greetings: {
          morning: "Buongiorno",
          afternoon: "Buon pomeriggio",
          evening: "Buona sera",
        },
      },
      {
        language: "Japanese",
        greetings: {
          morning: "おはようございます",
          afternoon: "こんにちは ",
          evening: "こんばんは",
        },
      },
      {
        language: "Russian",
        greetings: {
          morning: "Доброе утро",
          afternoon: "Добрый день",
          evening: "Добрый вечер",
        },
      },
      {
        language: "Chinese",
        greetings: {
          morning: "早上好",
          afternoon: "下午好",
          evening: "晚上好",
        },
      },
      {
        language: "Arabic",
        greetings: {
          morning: "صباح الخير",
          afternoon: "مساء الخير",
          evening: "مساء الخير",
        },
      },
      {
        language: "Korean",
        greetings: {
          morning: "안녕하세요",
          afternoon: "안녕하세요",
          evening: "안녕하세요",
        },
      },
    ];

    // Randomly select a language
    const randomIndex = Math.floor(Math.random() * languages.length);
    const randomLanguage = languages[randomIndex];

    return `${randomLanguage.greetings[timeOfDay]}`;
  }