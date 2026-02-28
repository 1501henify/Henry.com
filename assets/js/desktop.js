// Github API Star Counter
const repos = [
  { username: "1501henify", repo: "CSS_Intro", elementId: "star-count-1" },
  { username: "1501henify", repo: "Snow-animation", elementId: "star-count-2" },
  {
    username: "1501henify",
    repo: "henify-Observer-API",
    elementId: "star-count-3",
  },
  {
    username: "ifyOke0",
    repo: "Learning-Python",
    elementId: "star-count-4",
  },
];

repos.forEach(({ username, repo, elementId }) => {
  fetch(`https://api.github.com/repos/${username}/${repo}`)
    .then((response) => {
      if (!response.ok) throw new Error("GitHub API error");
      return response.json();
    })
    .then((data) => {
      document.getElementById(elementId).innerHTML =
        `<i class="fas fa-star"></i> ${data.stargazers_count}`;
    })
    .catch((error) => {
      document.getElementById(elementId).innerHTML =
        `<i class="fas fa-star"></i> Error`;
      console.error(`Error fetching stars for ${repo}:`, error);
    });
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

// Observer
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const navLink = document.querySelector(`nav ul li a[href="#${id}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        navLink.classList.add("active");
      }
    });
  },
  {
    threshold: 0.3,
  },
);

sections.forEach((section) => {
  observer.observe(section);
});
