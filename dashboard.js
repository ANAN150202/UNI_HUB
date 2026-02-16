const feed = document.getElementById("feed");
const loadMoreBtn = document.getElementById("loadMore");
const toast = document.getElementById("toast");

const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");
const backdrop = document.getElementById("backdrop");
const closeDrawer = document.getElementById("closeDrawer");

const markAll = document.getElementById("markAll");
const notifBadge = document.getElementById("notifBadge");
const notifList = document.getElementById("notifList");

function showToast(text){
  toast.textContent = text;
  toast.classList.remove("hidden");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.add("hidden"), 1600);
}

function openDrawer(){
  drawer.classList.add("open");
  backdrop.classList.add("show");
}
function closeDrawerFn(){
  drawer.classList.remove("open");
  backdrop.classList.remove("show");
}

menuBtn.addEventListener("click", openDrawer);
closeDrawer.addEventListener("click", closeDrawerFn);
backdrop.addEventListener("click", closeDrawerFn);

document.querySelectorAll(".drawerItem").forEach(btn => {
  btn.addEventListener("click", () => {
    const where = btn.dataset.nav;
    closeDrawerFn();
    showToast(`Demo: opened ${where}`);
  });
});

markAll.addEventListener("click", () => {
  notifBadge.textContent = "0";
  notifBadge.style.display = "none";
  notifList.querySelectorAll(".dot").forEach(d => d.style.background = "#94a3b8");
  showToast("All notifications marked as read");
});

// ------- feed demo data -------
let postCount = 0;

function makePost({author, group, time, text, withImage=false}){
  const id = ++postCount;

  const el = document.createElement("article");
  el.className = "card post";
  el.innerHTML = `
    <div class="postHead">
      <div class="postAuthor">
        <div class="avatar small">${author.trim()[0].toUpperCase()}</div>
        <div>
          <div style="font-weight:900">${author}</div>
          <div class="postMeta">${group} • ${time}</div>
        </div>
      </div>
      <button class="kebab" title="More">⋯</button>
    </div>

    <div class="postBody">${text}</div>
    ${withImage ? `<div class="postImage" aria-label="post image"></div>` : ""}

    <div class="postActions">
      <button class="actionBtn" data-like="${id}">❤️ Like <span class="count">0</span></button>
      <button class="actionBtn" data-comment="${id}">💬 Comment</button>
      <button class="actionBtn" data-share="${id}">🔁 Share</button>
    </div>
  `;
  return el;
}

function seedPosts(n=5){
  const samples = [
    {
      author: "CSE Society",
      group: "Clubs & Societies",
      time: "Just now",
      text: "🚀 We’re planning a programming contest next week. Who’s in?",
      withImage: true
    },
    {
      author: "IQAC Desk",
      group: "University Updates",
      time: "1 hour ago",
      text: "📌 Reminder: Please complete the course feedback form by this weekend.",
      withImage: false
    },
    {
      author: "Metropolitan University",
      group: "Official",
      time: "Today",
      text: "🎓 Welcome to Uni Hub! This is a demo dashboard design inspired by MU colors.",
      withImage: true
    },
    {
      author: "MUIS",
      group: "Islamic Society",
      time: "Yesterday",
      text: "📖 Dars after Asr, in shā’ Allāh. Everyone is welcome.",
      withImage: false
    },
    {
      author: "Career Club",
      group: "Student Life",
      time: "2 days ago",
      text: "💼 Seminar: CV building + interview tips. Limited seats!",
      withImage: true
    },
  ];

  for(let i=0;i<n;i++){
    const p = samples[i % samples.length];
    const node = makePost(p);
    feed.appendChild(node);
  }
}

seedPosts(6);

// like/comment/share actions
feed.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if(!btn) return;

  // like
  if(btn.dataset.like){
    const liked = btn.classList.toggle("liked");
    const countEl = btn.querySelector(".count");
    let c = parseInt(countEl.textContent, 10);
    c = liked ? c + 1 : Math.max(0, c - 1);
    countEl.textContent = String(c);
    showToast(liked ? "Liked" : "Unliked");
  }

  // comment
  if(btn.dataset.comment){
    showToast("Demo: comment box will come later");
  }

  // share
  if(btn.dataset.share){
    showToast("Demo: shared to your timeline");
  }
});

// load more
loadMoreBtn.addEventListener("click", () => {
  seedPosts(4);
  showToast("Loaded more posts");
});

// top icon highlighting (demo)
document.querySelectorAll(".topbar__icons .iconBtn").forEach(b => {
  b.addEventListener("click", () => {
    document.querySelectorAll(".topbar__icons .iconBtn").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
  });
});
