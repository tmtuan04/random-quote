const quoteText = document.querySelector(".quote");
authorName = document.querySelector(".name");
quoteBtn = document.querySelector("button");
soundBtn = document.querySelector(".sound")
copyBtn = document.querySelector(".copy")
translateBtn = document.querySelector(".translate")

function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerHTML = "Loading Quote..."
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        console.log(result);
        quoteText.innerHTML = result.content;
        authorName.innerHTML = result.author;
        quoteBtn.innerHTML = "New Quote";
        quoteBtn.classList.remove("loading");
    });
}

quoteBtn.addEventListener("click", randomQuote);

// Use API

soundBtn.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText}`);
    utterance.lang = "en-US";
    utterance.rate = 1;

    // Lấy danh sách các giọng đọc có sẵn
    let voices = speechSynthesis.getVoices();

    // Chọn giọng đọc mong muốn từ danh sách (ví dụ: giọng đọc thứ 2 trong danh sách)
    // Bạn có thể thay đổi chỉ số hoặc tìm kiếm theo tên giọng đọc
    utterance.voice = voices.find(voice => voice.name === 'Google UK English Female') || voices[1];

    speechSynthesis.speak(utterance);
});


// Use API

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText);
    alert("Text copied successfully!");
});

// Open Google Translate + Paste Text
translateBtn.addEventListener("click", () => {
    const text = quoteText.innerText;
    const url = `https://translate.google.com/?sl=en&tl=vi&text=${encodeURIComponent(text)}&op=translate`;
    window.open(url, '_blank');
});
