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
  }, 3000); // every 2 seconds

  