// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.navbar-nav');
let starCount = 0;
const starCounter = document.getElementById('star-counter');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu after clicking
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Start button to scroll to learning section
document.getElementById('start-btn').addEventListener('click', function() {
    document.getElementById('belajar').scrollIntoView({
        behavior: 'smooth'
    });
});

// Show game when play button is clicked
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const gameType = this.getAttribute('data-game');
        if (gameType === 'quiz') {
            document.getElementById('quiz-container').style.display = 'block';
            document.getElementById('stars-container').style.display = 'none';
            document.getElementById('riddle-container').style.display = 'none';
            document.getElementById('lightquiz-container').style.display = 'none';
            document.getElementById('quiz-container').scrollIntoView({
                behavior: 'smooth'
            });
        } else if (gameType === 'stars') {
            document.getElementById('stars-container').style.display = 'block';
            document.getElementById('quiz-container').style.display = 'none';
            document.getElementById('riddle-container').style.display = 'none';
            document.getElementById('lightquiz-container').style.display = 'none';
            generateStars();
            document.getElementById('stars-container').scrollIntoView({
                behavior: 'smooth'
            });
        } else if (gameType === 'riddle') {
            document.getElementById('riddle-container').style.display = 'block';
            document.getElementById('quiz-container').style.display = 'none';
            document.getElementById('stars-container').style.display = 'none';
            document.getElementById('lightquiz-container').style.display = 'none';
            document.getElementById('riddle-container').scrollIntoView({
                behavior: 'smooth'
            });
        } else if (gameType === 'lightquiz') {
            document.getElementById('lightquiz-container').style.display = 'block';
            document.getElementById('quiz-container').style.display = 'none';
            document.getElementById('stars-container').style.display = 'none';
            document.getElementById('riddle-container').style.display = 'none';
            document.getElementById('lightquiz-container').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Show lesson when learn button is clicked
document.querySelectorAll('.learn-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        if (category === 'bahasa') {
            document.getElementById('lesson-bahasa').style.display = 'block';
            document.getElementById('lesson-matematika').style.display = 'none';
            document.getElementById('lesson-sains').style.display = 'none';
        } else if (category === 'matematika') {
            document.getElementById('lesson-matematika').style.display = 'block';
            document.getElementById('lesson-bahasa').style.display = 'none';
            document.getElementById('lesson-sains').style.display = 'none';
        } else if (category === 'sains') {
            document.getElementById('lesson-sains').style.display = 'block';
            document.getElementById('lesson-bahasa').style.display = 'none';
            document.getElementById('lesson-matematika').style.display = 'none';
        }
    });
});

// Back button for lessons
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const backTo = this.getAttribute('data-back');
        if (backTo === 'bahasa') {
            document.getElementById('lesson-bahasa').style.display = 'none';
        } else if (backTo === 'matematika') {
            document.getElementById('lesson-matematika').style.display = 'none';
        } else if (backTo === 'sains') {
            document.getElementById('lesson-sains').style.display = 'none';
        }
    });
});

// Quiz logic with multiple questions
const quizQuestions = [
    { question: "Apa huruf pertama dari kata 'Apel'?", answers: ["B", "A", "C"], correct: "A" },
    { question: "Berapa jumlah kaki pada seekor anjing?", answers: ["6", "4", "2"], correct: "4" },
    { question: "Apa warna langit pada siang hari?", answers: ["Hijau", "Merah", "Biru"], correct: "Biru" },
    { question: "Berapa jumlah hari dalam seminggu?", answers: ["10", "7", "5"], correct: "7" },
    { question: "Apa yang digunakan untuk makan nasi?", answers: ["Garpu", "Sendok", "Tangan"], correct: "Sendok" }
];

const riddleQuestions = [
    { question: "Apa yang bisa terbang tapi bukan burung?", answers: ["Balon", "Pesawat", "Kupu-kupu"], correct: "Pesawat" },
    { question: "Apa yang punya tangan tapi tidak bisa bertepuk tangan?", answers: ["Robot", "Jam", "Tangan"], correct: "Jam" },
    { question: "Apa yang makin besar makin ringan?", answers: ["Batu", "Balon", "Kayu"], correct: "Balon" },
    { question: "Apa yang punya kepala tapi tidak bisa berpikir?", answers: ["Kepala Ikan", "Kepala Bawang", "Kepala Manusia"], correct: "Kepala Bawang" },
    { question: "Apa yang bisa kamu pegang tapi tidak bisa kamu lihat?", answers: ["Air", "Udara", "Angin"], correct: "Udara" }
];

const lightQuestions = [
    { question: "Berapa jumlah kaki pada seekor kucing?", answers: ["6", "2", "4"], correct: "4" },
    { question: "Apa warna daun pada umumnya?", answers: ["Biru", "Merah", "Hijau"], correct: "Hijau" },
    { question: "Berapa jumlah mata pada manusia?", answers: ["3", "1", "2"], correct: "2" },
    { question: "Apa yang digunakan untuk minum?", answers: ["Piring", "Gelas", "Sendok"], correct: "Gelas" },
    { question: "Apa nama planet kita?", answers: ["Venus", "Mars", "Bumi"], correct: "Bumi" }
];

let currentQuizIndex = 0;
let currentRiddleIndex = 0;
let currentLightIndex = 0;

const questionEl = document.getElementById('question');
const resultEl = document.getElementById('result');
const riddleQuestionEl = document.getElementById('riddle-question');
const riddleResultEl = document.getElementById('riddle-result');
const lightQuestionEl = document.getElementById('light-question');
const lightResultEl = document.getElementById('light-result');
const answerBtns = document.querySelectorAll('.answer-btn');

function loadQuiz() {
    const q = quizQuestions[currentQuizIndex];
    questionEl.textContent = q.question;
    const btns = document.querySelectorAll('#quiz-container .answer-btn');
    btns.forEach((btn, index) => {
        btn.textContent = q.answers[index];
        btn.setAttribute('data-answer', q.answers[index]);
    });
}

function loadRiddle() {
    const q = riddleQuestions[currentRiddleIndex];
    riddleQuestionEl.textContent = q.question;
    const btns = document.querySelectorAll('#riddle-container .answer-btn');
    btns.forEach((btn, index) => {
        btn.textContent = q.answers[index];
        btn.setAttribute('data-answer', q.answers[index]);
    });
}

function loadLightQuiz() {
    const q = lightQuestions[currentLightIndex];
    lightQuestionEl.textContent = q.question;
    const btns = document.querySelectorAll('#lightquiz-container .answer-btn');
    btns.forEach((btn, index) => {
        btn.textContent = q.answers[index];
        btn.setAttribute('data-answer', q.answers[index]);
    });
}

answerBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const selected = this.getAttribute('data-answer');
        const parentId = this.closest('div').id;
        if (parentId === 'quiz-container') {
            const q = quizQuestions[currentQuizIndex];
            if (selected === q.correct) {
                resultEl.textContent = 'Benar! Kamu hebat! 🎉';
                resultEl.style.color = 'green';
                starCount++;
                starCounter.textContent = `⭐ ${starCount}`;
                alert('Selamat! Kamu dapat 1 bintang! ⭐');
                currentQuizIndex = (currentQuizIndex + 1) % quizQuestions.length;
                loadQuiz();
            } else {
                resultEl.textContent = 'Salah, coba lagi! 😊';
                resultEl.style.color = 'red';
            }
        } else if (parentId === 'riddle-container') {
            const q = riddleQuestions[currentRiddleIndex];
            if (selected === q.correct) {
                riddleResultEl.textContent = 'Benar! Kamu hebat! 🎉';
                riddleResultEl.style.color = 'green';
                starCount++;
                starCounter.textContent = `⭐ ${starCount}`;
                alert('Selamat! Kamu dapat 1 bintang! ⭐');
                currentRiddleIndex = (currentRiddleIndex + 1) % riddleQuestions.length;
                loadRiddle();
            } else {
                riddleResultEl.textContent = 'Salah, coba lagi! 😊';
                riddleResultEl.style.color = 'red';
            }
        } else if (parentId === 'lightquiz-container') {
            const q = lightQuestions[currentLightIndex];
            if (selected === q.correct) {
                lightResultEl.textContent = 'Benar! Kamu hebat! 🎉';
                lightResultEl.style.color = 'green';
                starCount++;
                starCounter.textContent = `⭐ ${starCount}`;
                alert('Selamat! Kamu dapat 1 bintang! ⭐');
                currentLightIndex = (currentLightIndex + 1) % lightQuestions.length;
                loadLightQuiz();
            } else {
                lightResultEl.textContent = 'Salah, coba lagi! 😊';
                lightResultEl.style.color = 'red';
            }
        }
    });
});

// Load initial questions
loadQuiz();
loadRiddle();
loadLightQuiz();

// Stars game logic
function generateStars() {
    const starsDisplay = document.getElementById('stars-display');
    const numStars = Math.floor(Math.random() * 10) + 1; // 1 to 10 stars
    starsDisplay.textContent = '⭐'.repeat(numStars);
    starsDisplay.dataset.correct = numStars;
}

document.getElementById('check-stars').addEventListener('click', function() {
    const answer = parseInt(document.getElementById('stars-answer').value);
    const correct = parseInt(document.getElementById('stars-display').dataset.correct);
    const resultEl = document.getElementById('stars-result');
    if (answer === correct) {
        resultEl.textContent = 'Benar! Kamu hebat! 🎉';
        resultEl.style.color = 'green';
        starCount++;
        starCounter.textContent = `⭐ ${starCount}`;
        alert('Selamat! Kamu dapat 1 bintang! ⭐');
    } else {
        resultEl.textContent = `Salah, ada ${correct} bintang. Coba lagi! 😊`;
        resultEl.style.color = 'red';
    }
});

// Creative activities: Coloring, Drawing, Creating
let currentColor = 'red';
let coloringInitialized = false;
let drawingInitialized = false;

function startColoring() {
    document.getElementById('coloring-container').style.display = 'block';
    document.getElementById('drawing-container').style.display = 'none';
    document.getElementById('creating-container').style.display = 'none';
    document.getElementById('coloring-container').scrollIntoView({
        behavior: 'smooth'
    });
    if (!coloringInitialized) {
        initCanvas('coloring-canvas');
        coloringInitialized = true;
    }
    clearCanvas('coloring-canvas'); // Ensure the outline is drawn properly
}

function startDrawing() {
    document.getElementById('drawing-container').style.display = 'block';
    document.getElementById('coloring-container').style.display = 'none';
    document.getElementById('creating-container').style.display = 'none';
    document.getElementById('drawing-container').scrollIntoView({
        behavior: 'smooth'
    });
    if (!drawingInitialized) {
        initCanvas('drawing-canvas');
        drawingInitialized = true;
    }
}



function initCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = 600; // Fixed height for simplicity
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const scale = canvas.width / 800;

    // Draw a simple outline for coloring
    if (canvasId === 'coloring-canvas') {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(200 * scale, 150 * scale, 50 * scale, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(200 * scale, 200 * scale);
        ctx.lineTo(200 * scale, 250 * scale);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(200 * scale, 220 * scale);
        ctx.lineTo(180 * scale, 240 * scale);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(200 * scale, 220 * scale);
        ctx.lineTo(220 * scale, 240 * scale);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(200 * scale, 250 * scale);
        ctx.lineTo(180 * scale, 270 * scale);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(200 * scale, 250 * scale);
        ctx.lineTo(220 * scale, 270 * scale);
        ctx.stroke();
    }

    let isDrawing = false;

    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        if (e.touches) {
            return {
                x: (e.touches[0].clientX - rect.left) * scaleX,
                y: (e.touches[0].clientY - rect.top) * scaleY
            };
        } else {
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
            };
        }
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const pos = getPosition(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    });

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDrawing = true;
        const pos = getPosition(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            const pos = getPosition(e);
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = 5;
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (isDrawing) {
            const pos = getPosition(e);
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = 5;
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('touchend', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
    });
}

function clearCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (canvasId === 'coloring-canvas') {
        // Redraw outline
        const scale = canvas.width / 800;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(200 * scale, 150 * scale, 50 * scale, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(200 * scale, 200 * scale);
        ctx.lineTo(200 * scale, 250 * scale);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(200 * scale, 220 * scale);
        ctx.lineTo(180 * scale, 240 * scale);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(200 * scale, 220 * scale);
        ctx.lineTo(220 * scale, 240 * scale);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(200 * scale, 250 * scale);
        ctx.lineTo(180 * scale, 270 * scale);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(200 * scale, 250 * scale);
        ctx.lineTo(220 * scale, 270 * scale);
        ctx.stroke();
    }
}

// Color buttons
document.getElementById('color-red').addEventListener('click', () => currentColor = 'red');
document.getElementById('color-blue').addEventListener('click', () => currentColor = 'blue');
document.getElementById('color-green').addEventListener('click', () => currentColor = 'green');
document.getElementById('color-yellow').addEventListener('click', () => currentColor = 'yellow');
document.getElementById('color-purple').addEventListener('click', () => currentColor = 'purple');
document.getElementById('color-orange').addEventListener('click', () => currentColor = 'orange');

document.getElementById('draw-red').addEventListener('click', () => currentColor = 'red');
document.getElementById('draw-blue').addEventListener('click', () => currentColor = 'blue');
document.getElementById('draw-green').addEventListener('click', () => currentColor = 'green');
document.getElementById('draw-yellow').addEventListener('click', () => currentColor = 'yellow');
document.getElementById('draw-purple').addEventListener('click', () => currentColor = 'purple');
document.getElementById('draw-orange').addEventListener('click', () => currentColor = 'orange');



// Video watching logic
document.querySelectorAll('.watch-video-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('data-url');
        const messageEl = document.getElementById('video-message');
        if (starCount >= 1) {
            starCount -= 1;
            starCounter.textContent = `⭐ ${starCount}`;
            window.open(url, '_blank'); // Open video in new tab
            this.style.display = 'none'; // Hide the button after watching
            messageEl.style.display = 'none';
        } else {
            messageEl.textContent = 'Kamu perlu 1 bintang untuk menonton video!';
            messageEl.style.display = 'block';
        }
    });
});

// Footer visibility based on scroll position
window.addEventListener('scroll', function() {
    const footer = document.querySelector('footer');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Show footer when near the bottom of the page
    if (scrollTop + windowHeight >= documentHeight - 100) {
        footer.style.opacity = '1';
    } else {
        footer.style.opacity = '0';
    }
});

// Image mapping for stories
const imageMap = {
    'malin-kundang': 'malin kundang.jpg',
    'timun-mas': 'timun mas.jpg',
    'bawang-merah': 'bawang merah & bawang putih.jpg',
    'sangkuriang': 'sangkuriang.jpg',
    'danau-toba': 'legenda danau toba.jpg',
    'kancil-buaya': 'kancil&buaya.jpg',
    'keong-mas': 'keong mas.jpg',
    'tangkuban-perahu': 'tangkuban perahu.jpg'
};

// Stories data
const stories = {
    'malin-kundang': {
        title: 'Malin Kundang',
        content: '<p>Dahulu kala, di sebuah desa nelayan yang tenang, hiduplah seorang ibu bernama Malin bersama anaknya yang bernama Malin Kundang. Malin Kundang adalah anak yang rajin dan penurut sejak kecil. Ia selalu membantu ibunya mencari ikan di laut dan menjaga rumah mereka yang sederhana.</p><p>Suatu hari, Malin Kundang memutuskan untuk merantau ke kota besar. Ia berjanji kepada ibunya bahwa ia akan kembali setelah sukses. Bertahun-tahun berlalu, Malin Kundang menjadi pedagang kaya raya dengan kapal besar dan rumah mewah.</p><p>Ibunya yang sudah tua mendengar kabar tentang kesuksesan anaknya. Dengan susah payah, ia pergi ke kota untuk mencari Malin Kundang. Ketika bertemu, Malin Kundang malu karena ibunya berpakaian lusuh. Ia mengatakan tidak mengenal ibunya dan menyuruhnya pergi.</p><p>Ibu Malin sangat sedih mendengar kata-kata anaknya. Ia berdoa kepada Tuhan agar anaknya dihukum karena kedurhakaannya. Tiba-tiba laut bergelombang hebat, angin kencang bertiup, dan kapal Malin Kundang karam. Malin Kundang berubah menjadi batu besar yang masih bisa dilihat hingga sekarang.</p><p>Cerita ini mengajarkan kita tentang pentingnya menghormati dan berbakti kepada orang tua, karena durhaka akan membawa hukuman.</p><p>Moral dari cerita Malin Kundang adalah bahwa kita harus selalu ingat asal-usul kita dan tidak pernah melupakan orang tua yang telah membesarkan kita.</p>',
        moral: 'Kita harus patuh kepada orang tua dan tidak boleh durhaka.'
    },
    'timun-mas': {
        title: 'Timun Mas',
        content: '<p>Dahulu kala, ada seorang janda miskin yang sangat ingin memiliki anak. Ia berdoa setiap hari di sawahnya. Suatu hari, datanglah seorang kakek tua yang memberinya biji timun emas. Janda itu menanam biji itu dan timun emas pun tumbuh subur.</p><p>Dari timun emas itu keluarlah seorang bayi perempuan cantik yang diberi nama Timun Mas. Timun Mas tumbuh menjadi gadis yang cantik dan baik hati. Ia selalu membantu ibunya di sawah dan di rumah.</p><p>Suatu hari, datanglah raksasa jahat yang ingin memakan Timun Mas. Raksasa itu bernama Buto Ijo. Ia mengancam akan memakan ibu Timun Mas jika tidak diberi Timun Mas. Ibu Timun Mas sangat takut dan sedih.</p><p>Ibu Timun Mas meminta bantuan kepada Mbok Sirni, seorang dukun. Mbok Sirni memberi empat benda ajaib: jarum, garam, terasi, dan cabe. Dengan benda-benda itu, Timun Mas berhasil melarikan diri dari raksasa.</p><p>Pertama, Timun Mas melempar jarum yang berubah menjadi hutan bambu. Kedua, ia melempar garam yang berubah menjadi laut asin. Ketiga, terasi berubah menjadi lumpur licin. Terakhir, cabe berubah menjadi ladang cabe panas yang membuat raksasa lari ketakutan.</p><p>Timun Mas berhasil kembali ke rumah ibunya dengan selamat. Cerita ini mengajarkan kita tentang keberanian, kecerdikan, dan pentingnya berbakti kepada orang tua.</p>',
        moral: 'Kita harus berbakti kepada orang tua dan menggunakan akal budi.'
    },
    'bawang-merah': {
        title: 'Bawang Merah Bawang Putih',
        content: '<p>Dahulu kala, ada seorang janda yang menikah lagi dengan seorang pria kaya. Dari pernikahan itu, ia memiliki anak perempuan bernama Bawang Merah. Bawang Merah adalah anak yang manja dan jahat. Ia selalu menyiksa saudara tirinya, Bawang Putih.</p><p>Bawang Putih adalah anak yang baik hati dan rajin. Ia selalu membantu ibu tirinya di rumah dan di sawah. Bawang Merah iri dengan kebaikan Bawang Putih dan selalu membuatnya menderita.</p><p>Suatu hari, Bawang Putih pergi ke hutan untuk mencari kayu bakar. Di hutan, ia bertemu dengan nenek baik hati yang memberinya bantuan. Nenek itu memberi Bawang Putih makanan dan pakaian.</p><p>Bawang Merah dengar cerita itu dan iri. Ia pergi ke hutan mencari nenek itu. Tapi nenek itu ternyata adalah makhluk halus yang marah karena Bawang Merah jahat. Nenek itu mengubah Bawang Merah menjadi berbagai benda, dan akhirnya Bawang Merah dimakan oleh binatang buas.</p><p>Bawang Putih hidup bahagia dengan ibu tirinya. Cerita ini mengajarkan bahwa kebaikan akan mendapat pahala, sedangkan kejahatan akan mendapat hukuman.</p><p>Moral dari cerita Bawang Merah Bawang Putih adalah bahwa kita harus selalu berbuat baik dan tidak iri hati kepada orang lain.</p>',
        moral: 'Kita harus baik hati dan tidak iri hati.'
    },
    'sangkuriang': {
        title: 'Sangkuriang',
        content: '<p>Dahulu kala, ada seorang pemuda kuat bernama Sangkuriang. Ia adalah anak dari Dayang Sumbi, seorang putri cantik. Sangkuriang tumbuh menjadi pemuda yang sombong dan angkuh. Ia selalu ingin menang dalam segala hal.</p><p>Suatu hari, Sangkuriang bertemu dengan seorang gadis cantik di hutan. Ia jatuh cinta dan ingin menikahinya. Gadis itu adalah Dayang Sumbi, ibunya sendiri yang tidak ia kenali karena sudah lama tidak bertemu.</p><p>Dayang Sumbi mengenali anaknya dan takut. Ia meminta Sangkuriang membuat danau dan perahu dalam satu malam sebagai syarat pernikahan. Sangkuriang yang sombong menerima tantangan itu.</p><p>Sangkuriang bekerja keras dengan bantuan jin dan roh halus. Ia hampir menyelesaikan danau dan perahu. Tapi Dayang Sumbi khawatir dan meminta ayam jantan berkokok lebih awal untuk menandai pagi.</p><p>Sangkuriang marah karena perahu belum selesai. Ia menendang perahu dengan kuat, dan perahu itu terbang ke udara. Perahu itu jatuh dan berubah menjadi gunung Tangkuban Perahu.</p><p>Sangkuriang menyesal, tapi sudah terlambat. Cerita ini mengajarkan tentang bahaya kesombongan dan pentingnya menepati janji.</p>',
        moral: 'Kita harus menepati janji dan tidak sombong.'
    },
    'danau-toba': {
        title: 'Legenda Danau Toba',
        content: '<p>Dahulu kala, ada seorang pemuda miskin bernama Toba. Ia hidup dari menangkap ikan di sungai. Suatu hari, ia menangkap ikan ajaib yang bisa berbicara. Ikan itu meminta dilepaskan dan berjanji akan memberikan hadiah.</p><p>Toba melepaskan ikan itu. Esok harinya, datanglah seorang gadis cantik ke rumahnya. Gadis itu adalah ikan yang berubah wujud. Mereka menikah dan hidup bahagia. Mereka memiliki seorang anak laki-laki.</p><p>Suatu hari, anak mereka hilang. Gadis itu mencari ke sungai dan menemukan anaknya dimakan oleh ikan. Ia marah dan mengutuk suaminya. Ia mengatakan bahwa Toba akan menjadi pulau besar.</p><p>Toba berubah menjadi pulau, dan air mata gadis itu membentuk Danau Toba. Gadis itu kembali ke sungai sebagai ikan. Cerita ini menjelaskan asal-usul Danau Toba di Sumatera Utara.</p><p>Moral dari legenda ini adalah bahwa kita harus sabar dalam menghadapi masalah dan tidak mudah marah.</p><p>Danau Toba menjadi tempat wisata yang indah dan mengingatkan kita pada cerita ini.</p>',
        moral: 'Kita harus sabar dan tidak mudah marah.'
    },
    'kancil-buaya': {
        title: 'Si Kancil dan Buaya',
        content: '<p>Dahulu kala, di sebuah sungai besar, hiduplah seekor kancil yang cerdik. Kancil itu ingin menyeberang sungai, tapi buaya-buaya jahat menghalanginya. Buaya itu lapar dan ingin memakan kancil.</p><p>Kancil berpikir cepat. Ia berkata kepada buaya, "Aku akan menghitung kalian satu per satu. Kalian harus berbaris lurus dari sini ke seberang sungai." Buaya-buaya senang dan berbaris.</p><p>Kancil mulai menghitung dari kepala buaya pertama. Ia melompat dari kepala satu ke kepala lainnya. Buaya-buaya sabar menunggu karena ingin dimakan.</p><p>Ketika kancil hampir sampai di seberang, ia berkata, "Aku salah hitung! Mari ulang dari awal." Tapi kancil melompat ke daratan dan lari pergi. Buaya-buaya marah dan kecewa.</p><p>Cerita ini mengajarkan tentang kecerdikan dan pentingnya berpikir sebelum bertindak. Kancil menang karena akalnya, bukan kekuatannya.</p><p>Moral dari cerita Si Kancil dan Buaya adalah bahwa kita harus cerdik dan tidak sombong.</p>',
        moral: 'Kita harus cerdik dan tidak sombong.'
    },
    'keong-mas': {
        title: 'Keong Mas',
        content: '<p>Dahulu kala, ada seorang raja yang ingin memiliki anak. Ia berdoa di sungai dan mendapat keong emas. Keong itu tumbuh menjadi gadis cantik bernama Keong Mas. Raja sangat bahagia dan ingin menikahi Keong Mas.</p><p>Keong Mas takut karena raja adalah ayah angkatnya. Ia kabur dari istana. Raja mengejarnya dengan pasukan. Keong Mas berlari ke hutan dan sungai.</p><p>Untuk menghindari raja, Keong Mas berubah menjadi berbagai benda. Pertama, ia berubah menjadi bunga teratai. Kedua, menjadi burung. Ketiga, menjadi pohon. Tapi raja selalu menemukannya.</p><p>Akhirnya, Keong Mas kembali ke sungai dan berubah menjadi keong lagi. Raja menyesal dan belajar bahwa cinta sejati tidak bisa dipaksakan. Cerita ini berasal dari Jawa Tengah.</p><p>Moral dari cerita Keong Mas adalah bahwa kita harus jujur dan tidak sombong.</p><p>Keong Mas mengajarkan tentang kesabaran dan menerima takdir.</p>',
        moral: 'Kita harus jujur dan tidak sombong.'
    },
    'tangkuban-perahu': {
        title: 'Tangkuban Perahu',
        content: '<p>Dahulu kala, ada seorang pemuda bernama Sangkuriang. Ia jatuh cinta pada Dayang Sumbi, seorang putri cantik. Sangkuriang ingin menikah, tapi Dayang Sumbi meminta syarat yang sulit.</p><p>Dayang Sumbi meminta Sangkuriang membuat danau dan perahu dalam satu malam. Sangkuriang yang sombong menerima tantangan. Ia bekerja keras dengan bantuan jin.</p><p>Sangkuriang berhasil membuat danau yang luas. Perahu hampir selesai. Tapi Dayang Sumbi khawatir karena Sangkuriang adalah anaknya sendiri.</p><p>Dayang Sumbi meminta ayam berkokok lebih awal. Sangkuriang marah karena perahu belum selesai. Ia menendang perahu dengan kuat. Perahu terbang dan jatuh, berubah menjadi gunung Tangkuban Perahu.</p><p>Gunung itu masih ada di Bandung, Jawa Barat. Cerita ini menjelaskan asal-usul gunung tersebut.</p><p>Moralnya adalah kita harus menghormati orang tua dan tidak sombong.</p>',
        moral: 'Kita harus menghormati orang tua dan tidak sombong.'
    }
};

// Random story button
document.getElementById('random-story-btn').addEventListener('click', function() {
    const storyKeys = Object.keys(stories);
    const randomKey = storyKeys[Math.floor(Math.random() * storyKeys.length)];
    showStory(randomKey);
});

// Read story buttons
document.querySelectorAll('.btn-baca').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const storyKey = this.closest('.story-card').getAttribute('data-story');
        showStory(storyKey);
    });
});

// Back to list button
document.getElementById('back-to-list').addEventListener('click', function() {
    document.getElementById('story-display').style.display = 'none';
    document.getElementById('stories-list').style.display = 'grid';
});

// Function to show story in modal
function showStory(key) {
    const story = stories[key];
    if (!story) {
        alert('Story not found for ' + key);
        return;
    }
    const imageName = imageMap[key] || `${key}.jpg`; // Use imageMap or fallback
    const imagePath = `img/${imageName}`;
    document.getElementById('modal-story-content').innerHTML = `
        <img src="${imagePath}" alt="${story.title}" class="modal-story-image">
        <h3 class="modal-story-title">${story.title}</h3>
        <div class="modal-story-text">${story.content}</div>
        <div class="modal-moral">${story.moral}</div>
    `;
    document.getElementById('story-modal').style.display = 'flex';
}

// Close modal when clicking overlay or close button
document.getElementById('story-modal').addEventListener('click', function(e) {
    if (e.target === this || e.target.classList.contains('modal-overlay') || e.target.id === 'close-modal') {
        document.getElementById('story-modal').style.display = 'none';
    }
});

// Simple animation for buttons on hover (already in CSS, but add JS if needed)
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});
