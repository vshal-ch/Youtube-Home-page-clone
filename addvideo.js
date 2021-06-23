import { Video } from "./video.js";

const videos = document.querySelector('.videos');

async function getData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

async function getFromProm(url) {
  let users = await getData(url);
  return users;
}

async function pom() {
  let code;
  try{
    let loc = await getFromProm('https://extreme-ip-lookup.com/json');
    code = loc.countryCode;
  }
  catch(e){
    code = 'US';
  }
  let dat = await getFromProm(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=40&regionCode=${code}&key=AIzaSyDD1uj4YCvLnIrKZNFRVLHHQQEMbzTtzsU`
  );
  dat.items.forEach(async (item) => {
    let thumbnail = item.snippet.thumbnails.medium.url;
    let channelPic = await getFromProm(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${item.snippet.channelId}&key=AIzaSyDD1uj4YCvLnIrKZNFRVLHHQQEMbzTtzsU`
    ).then((data) => data.items[0].snippet.thumbnails.default.url);
    let duration = item.contentDetails.duration;
    let title = item.snippet.title;
    let creater = item.snippet.channelTitle;
    let views = item.statistics.viewCount;
    let uploadedTime = item.snippet.publishedAt;

    let video = new Video(
      thumbnail,
      channelPic,
      duration,
      title,
      creater,
      views,
      uploadedTime
    );

    let html = `<section class="video-container">
        <div class="thumbnail-container">
          <img
            src="${video.thumbnail}"
            alt="thumbnail"
            class="thumbnail"
          />
          <div class="icons-container">
            <span class="watchlater">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                class="icon watch-later"
              >
                <g>
                  <path
                    d="M12 3.67c-4.58 0-8.33 3.75-8.33 8.33s3.75 8.33 8.33 8.33 8.33-3.75 8.33-8.33S16.58 3.67 12 3.67zm3.5 11.83l-4.33-2.67v-5h1.25v4.34l3.75 2.25-.67 1.08z"
                  ></path>
                </g>
              </svg>
            </span>
            <span class="add-to-queue">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                class="icon addto-queue"
              >
                <g class="style-scope yt-icon">
                  <path
                    d="M9,10 L18,10 L18,12 L9,12 L9,10 Z M6,6 L18,6 L18,8 L6,8 L6,6 Z M12,14 L18,14 L18,16 L12,16 L12,14 Z M6,12 L6,18 L10,15 L6,12 Z"
                  ></path>
                </g>
              </svg>
            </span>
          </div>
          <span class="duration">${video.duration}</span>
        </div>
        <div class="video-details">
          <span class="channel-thumb-container">
            <img
              src="${video.createrPic}"
              alt="channel-thumb"
              class="channel-thumb"
            />
          </span>
          <h4 class="video-title">
            ${video.title}
          </h4>
          <p class="channel-name">${video.creater}</p>
          <p class="stats">${video.viewsCount} • ${video.uploadedTime}</p>
          <span class="menu-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              fill="#000000"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              />
            </svg>
          </span>
        </div>
      </section>`;
    
      videos.innerHTML += html;
  });
}

pom();
