const apiUrl = "https://api.mymemory.translated.net/get";

const languages = {
    "en": "English",
    "uz": "Uzbek",
    "ru": "Russian",
    "fr": "French",
    "de": "German",
    "es": "Spanish",
    "zh": "Chinese",
    "ar": "Arabic"
};

document.addEventListener("DOMContentLoaded", () => {
    const inputLang = document.getElementById("inputLang");
    const outputLang = document.getElementById("outputLang");

    Object.entries(languages).forEach(([code, name]) => {
        inputLang.innerHTML += `<option value="${code}">${name}</option>`;
        outputLang.innerHTML += `<option value="${code}">${name}</option>`;
    });


    document.getElementById("changeLang").addEventListener("click", () => {
        let temp = inputLang.value;
        inputLang.value = outputLang.value;
        outputLang.value = temp;
    });


    document.querySelectorAll(".speak-btn").forEach(button => {
        button.addEventListener("click", () => {
            let targetId = button.getAttribute("data-target");
            let text = document.getElementById(targetId).value;
            if (text) speakText(text);
        });
    });
});


function speakText(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = document.getElementById("outputLang").value; 
    speech.rate = 1;  
    speech.pitch = 1; 
    window.speechSynthesis.speak(speech);
}

document.getElementById("translateBtn").addEventListener("click", async () => {
    const text = document.getElementById("inputText").value;
    const fromLang = document.getElementById("inputLang").value;
    const toLang = document.getElementById("outputLang").value;
    if (!text) return;

    const response = await fetch(`${apiUrl}?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`);
    const data = await response.json();
    document.getElementById("outputText").value = data.responseData.translatedText;
});
