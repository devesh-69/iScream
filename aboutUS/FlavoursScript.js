document.addEventListener("DOMContentLoaded", () => {
  const flavorCards = document.querySelectorAll(".flavor-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = `fadeInUp 0.8s ease forwards ${
              index * 0.2
            }s`;
          }, 100);
        }
      });
    },
    { threshold: 0.1 }
  );

  flavorCards.forEach((card) => {
    observer.observe(card);
  });

  // Add hover effect for flavor cards
  flavorCards.forEach((card) => {
    const viewMoreButton = card.querySelector(".view-more");

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) rotate(2deg)";
      card.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.2)";
      viewMoreButton.style.opacity = "1";
      viewMoreButton.style.transform = "translateY(0)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) rotate(0)";
      card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
      viewMoreButton.style.opacity = "0";
      viewMoreButton.style.transform = "translateY(10px)";
    });

    // Add click event for view more button
    viewMoreButton.addEventListener("click", (e) => {
      e.preventDefault();
      alert(
        `You clicked View More for ${card.querySelector("h3").textContent}`
      );
      // Here you can add logic to show more details about the flavor
    });
  });
});
