const posts = [
  {
    id: 1,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/300?image=171",
    author: {
      name: "Phil Mangione",
      image: "https://unsplash.it/300/300?image=15",
    },
    likes: 80,
    created: "2021-06-25",
  },
  {
    id: 2,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=112",
    author: {
      name: "Sofia Perlari",
      image: "https://unsplash.it/300/300?image=10",
    },
    likes: 120,
    created: "2021-09-03",
  },
  {
    id: 3,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=234",
    author: {
      name: "Chiara Passaro",
      image: "https://unsplash.it/300/300?image=20",
    },
    likes: 78,
    created: "2021-05-15",
  },
  {
    id: 4,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=24",
    author: {
      name: "Luca Formicola",
      image: null,
    },
    likes: 56,
    created: "2021-04-03",
  },
  {
    id: 5,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=534",
    author: {
      name: "Alessandro Sainato",
      image: "https://unsplash.it/300/300?image=29",
    },
    likes: 95,
    created: "2021-03-05",
  },
];

const containerElement = document.getElementById("container");
const postElements = posts.map(postToHTMLElement);

postElements.forEach((element, index) => {
  attachEventListeners(element, index);
  containerElement.append(element);
});

function postToHTMLElement(post) {
  const { id, content, media, author, likes, created } = post;
  const { name: authorName, image: authorImage } = author;
  const italianCreatedDate = usaToItalianDate(created);
  const imageElement = handleAuthorImageElement(authorImage, authorName);

  const postElement = document.createElement("div");

  postElement.classList.add("post");
  // postElement.setAttribute("data-postid", id);
  postElement.dataset.postid = id;

  postElement.innerHTML = `
    <div class="post__header">
      <div class="post-meta">
        <div class="post-meta__icon">
          ${imageElement}
        </div>
        <div class="post-meta__data">
          <div class="post-meta__author">${authorName}</div>
          <div class="post-meta__time">${italianCreatedDate}</div>
        </div>
      </div>
    </div>
    <div class="post__text">${content}</div>
    <div class="post__image">
      <img src="${media}" alt="">
    </div>
    <div class="post__footer">
      <div class="likes js-likes">
        <div class="likes__cta">
          <a class="like-button js-like-button" href="#" data-postid="${id}">
            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
            <span class="like-button__label">Mi Piace</span>
          </a>
        </div>
        <div class="likes__counter">
          Piace a <b id="like-counter-1" class="js-likes-counter">${likes}</b> persone
        </div>
      </div>
    </div>
  `;

  return postElement;
}

function usaToItalianDate(usaDateString) {
  const [year, month, day] = usaDateString.split("-");
  return [day, month, year].join("/");
}

function attachEventListeners(postElement, postElementIndex) {
  const likeButton = postElement.querySelector(".js-like-button");
  const likesCountElement = postElement.querySelector(".js-likes-counter");
  const postObject = posts[postElementIndex];

  likeButton.addEventListener("click", function onLikeButtonClick(event) {
    event.preventDefault();
    toggleButtonState(this, likesCountElement, postObject);
  });
}

function toggleButtonState(buttonElement, likesCountElement, postObject) {
  if (buttonElement.classList.contains("like-button--liked")) {
    buttonElement.classList.remove("like-button--liked");
    postObject.likes--;
  } else {
    postObject.likes++;
    buttonElement.classList.add("like-button--liked");
  }

  const newLikesCount = postObject.likes;
  likesCountElement.innerHTML = newLikesCount;
}

function handleAuthorImageElement(authorImage, authorName) {
  if (authorImage) {
    return `<img class="profile-pic" src="${authorImage}" alt="${authorName}"></img>`;
  } else {
    const initials = authorName
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();

    return `
      <div class="profile-pic-default">
        <span>
          ${initials}
        </span>
      </div>
    `;
  }
}
