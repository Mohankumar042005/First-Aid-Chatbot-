document.addEventListener('DOMContentLoaded', () => {
    // --- ALL TEXT AND TRANSLATIONS ---
    const responses = {
        welcome: {
            en: "Hello! I am your First Aid Bot. Ask me about 'cut', 'burn', 'cpr', 'fever', or 'cold'.",
            ta: "Vanakkam! Naan ungal mudhaludhavi Bot. 'Kayam', 'thee kayam', 'cpr', 'kachal', alladhu 'sali' patri kelungal."
        },
        hello: {
            en: "Hello there! How can I assist you with first aid?",
            ta: "Vanakkam! Ungalukku enna mudhaludhavi thevai?"
        },
        cut: {
            en: `🩹 **For a minor cut:**<br>
                 1. **Wash your hands** with soap.<br>
                 2. **Stop the bleeding** by applying gentle pressure.<br>
                 3. **Clean the wound** with water and cover with a bandage.`,
            ta: `🩹 **Siriya kayathirku:**<br>
                 1. **Kaigalai soap pottu** nandraga kalavavum.<br>
                 2. **Rathapokkai nirutha** suthamaana thuniyal aluthavum.<br>
                 3. **Kayathai thanneeril** suththam seidhu, bandage podavum.`
        },
        burn: {
            en: `🔥 **For a minor burn:**<br>
                 1. **Cool the burn** under cool running water for 10 minutes.<br>
                 2. **Don't break blisters.**<br>
                 3. **Apply lotion** like aloe vera and cover with a sterile bandage.`,
            ta: `🔥 **Siriya thee kayathirku:**<br>
                 1. **Kayathai 10 nimidam** kulirndha neeril kaatavum.<br>
                 2. **Koppulangalai udaikkadheergal.**<br>
                 3. **Aloe vera pondra lotion** thadavi, bandage podavum.`
        },
        cpr: {
            en: `❤️ **For CPR (Cardiopulmonary Resuscitation):**<br>
                 1. **Call for emergency help** immediately.<br>
                 2. **Push hard and fast** on the center of the chest (100-120 compressions/min).<br>
                 3. **Continue until help arrives.**`,
            ta: `❤️ **CPR seivatharku:**<br>
                 1. **Udane avasara udhavikku** alaikkavum.<br>
                 2. **Nenjin maiyathil** vegமாகவும், balamமாகவும் aluthavum (1 nim. 100-120 alutham).<br>
                 3. **Udhavi varum varai** thodaravum.`
        },
        fever: {
            en: `🤒 **For a Fever:**<br>
                 1. **Rest** as much as possible.<br>
                 2. **Drink plenty of fluids** like water or juice to stay hydrated.<br>
                 3. **Use a cool compress** on your forehead.<br>
                 4. **See a doctor** if the fever is very high or lasts more than a few days.`,
            ta: `🤒 **Kachal-uku:**<br>
                 1. **Adhigamaaga oivu** edukkavum.<br>
                 2. **Niraiyya neer, juice** kudithu udalai neerottamagha vaikkavum.<br>
                 3. **Netriyil eeramana** thuniyai vaikkavum.<br>
                 4. **Kachal adhigamaga irundhal** alladhu sila naatkaluku mel neetithal, doctor-ai parkavum.`
        },
        cold: {
            en: `🤧 **For a Common Cold:**<br>
                 1. **Get plenty of rest.**<br>
                 2. **Stay hydrated** by drinking water and warm liquids like soup.<br>
                 3. **Soothe a sore throat** by gargling with salt water.<br>
                 4. **See a doctor** if symptoms get worse or don't improve after a week.`,
            ta: `🤧 **Sali pidithirundhal:**<br>
                 1. **Niraiyya oivu** edukkavum.<br>
                 2. **Thanneer, soodu soup** kudithu neerottamagha irukkavum.<br>
                 3. **Uppu thanneeril vaai** koppalithal thondai valikku nalladhu.<br>
                 4. **Oru vaaram aanalum sari aagavittal**, doctor-ai paarkavum.`
        },
        unknown: {
            en: "I'm sorry, I only know about 'cut', 'burn', 'cpr', 'fever', and 'cold'.",
            ta: "Mannikavum, enakku 'kayam', 'thee kayam', 'cpr', 'kachal', 'sali' patri mattum thaan theriyum."
        },
        hospital_search: {
            en: "Searching for nearest hospitals...",
            ta: "Arugil ulla maruthuvamanaigalai thedugiren..."
        },
        location_error: {
            en: "Sorry, I couldn't get your location. Please enable location services in your browser.",
            ta: "Mannikavum, ungal idathai eduka mudiyavillai. Ungal browser-il location services-ai anumathikkavum."
        }
    };

    // --- BOT STATE ---
    let currentLanguage = 'en'; // 'en' for English, 'ta' for Tanglish

    // --- HTML ELEMENTS ---
    const chatBody = document.getElementById('chat-body');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const hospitalBtn = document.getElementById('hospital-btn');
    const langEnBtn = document.getElementById('lang-en');
    const langTaBtn = document.getElementById('lang-ta');

    // --- LANGUAGE SWITCHER LOGIC ---
    langEnBtn.addEventListener('click', () => setLanguage('en'));
    langTaBtn.addEventListener('click', () => setLanguage('ta'));

    function setLanguage(lang) {
        currentLanguage = lang;
        langEnBtn.classList.toggle('active', lang === 'en');
        langTaBtn.classList.toggle('active', lang === 'ta');
        chatBody.innerHTML = ''; // Clear chat on language change
        addMessage(responses.welcome[currentLanguage], 'bot');
    }

    // --- CHAT LOGIC ---
    const handleSendMessage = () => {
        const userText = userInput.value.trim().toLowerCase();
        if (userText === "") return;
        addMessage(userInput.value, 'user');
        userInput.value = "";
        setTimeout(() => getBotResponse(userText), 500);
    };

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') handleSendMessage();
    });
    sendBtn.addEventListener('click', handleSendMessage);

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.innerHTML = text;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function getBotResponse(userText) {
        let botText = "";
        // Tanglish keywords
        if (userText.includes('vanakkam')) userText = 'hello';
        if (userText.includes('kayam')) userText = 'cut';
        if (userText.includes('thee') || userText.includes('theekayam')) userText = 'burn';
        if (userText.includes('kachal')) userText = 'fever';
        if (userText.includes('sali')) userText = 'cold';
        
        // Response logic
        if (userText.includes('hello') || userText.includes('hi')) {
            botText = responses.hello[currentLanguage];
        } else if (userText.includes('cut')) {
            botText = responses.cut[currentLanguage];
        } else if (userText.includes('burn')) {
            botText = responses.burn[currentLanguage];
        } else if (userText.includes('cpr')) {
            botText = responses.cpr[currentLanguage];
        } else if (userText.includes('fever')) {
            botText = responses.fever[currentLanguage];
        } else if (userText.includes('cold')) {
            botText = responses.cold[currentLanguage];
        } else {
            botText = responses.unknown[currentLanguage];
        }
        addMessage(botText, 'bot');
    }

    // --- HOSPITAL SEARCH LOGIC ---
    hospitalBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            addMessage(responses.hospital_search[currentLanguage], 'bot');
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `https://www.google.com/maps/search/hospital/@${latitude},${longitude},14z`;
                    window.open(url, '_blank');
                },
                () => addMessage(responses.location_error[currentLanguage], 'bot')
            );
        }
    });

    // --- INITIALIZE ---
    setLanguage(currentLanguage); // Set initial language and welcome message
});