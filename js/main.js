  lucide.createIcons();

   gsap.from("nav", { y: -80, opacity: 0, duration: 1, ease: "power4.out" });
   gsap.from("section", { opacity: 0, duration: 1.2, stagger: 0.4, ease: "power2.out" });

const flipCard = document.getElementById("flip-card");
  let flipped = false;

  setInterval(() => {
    flipped = !flipped;
    if (flipped) {
      flipCard.style.transform = "rotateY(180deg)";
    } else {
      flipCard.style.transform = "rotateY(0deg)";
    }
  }, 4000); 

const texts = ["Hi, I'm Mau :)", "I love coding", "Welcome to my portfolio"];
let currentText = '';
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 120; // slower = smoother
const deletingSpeed = 60;

function type() {
  const txtElement = document.getElementById('typing');
  const fullText = texts[textIndex];

  if (isDeleting) {
    charIndex--;
    currentText = fullText.substring(0, charIndex);
  } else {
    charIndex++;
    currentText = fullText.substring(0, charIndex);
  }

  txtElement.textContent = currentText;

  let timeout = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === fullText.length) {
    isDeleting = true;
    timeout = 1000; // pause at the end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    timeout = 500; // pause before typing next
  }

  setTimeout(type, timeout);
}

type();



  