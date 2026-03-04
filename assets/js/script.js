fetch("/api/github-stars")
  .then((res) => res.json())
  .then((data) => {
    const repoMap = {
      "1501henify/CSS_Intro": "star-count-1",
      "1501henify/Snow-animation": "star-count-2",
      "1501henify/henify-Observer-API": "star-count-3",
      "ifyOke0/Learning-Python": "star-count-4",
    };

    Object.entries(repoMap).forEach(([repo, elementId]) => {
      const stars = data[repo];
      document.getElementById(elementId).innerHTML =
        `<i class="fas fa-star"></i> ${stars ?? 0}`;
    });
  })
  .catch(() => {
    console.error("Failed to load stars");
  });

//Back_to_top
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", (event) => {
  event.preventDefault();
  smoothScrollToTop();
});

function smoothScrollToTop() {
  const scrollDuration = 600;
  const scrollStop = -window.scrollY / (scrollDuration / 16);
  const scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStop);
    } else {
      clearInterval(scrollInterval);
    }
  }, 16);
}
