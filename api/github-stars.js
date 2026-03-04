const REPOS = [
  { username: "1501henify", repo: "CSS_Intro" },
  { username: "1501henify", repo: "Snow-animation" },
  { username: "1501henify", repo: "henify-Observer-API" },
  { username: "ifyOke0", repo: "Learning-Python" },
];

export default async function handler(req, res) {
  try {
    const results = {};

    for (const { username, repo } of REPOS) {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("GitHub API error");
      }

      const data = await response.json();
      results[`${username}/${repo}`] = data.stargazers_count;
    }
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stars" });
  }
}
