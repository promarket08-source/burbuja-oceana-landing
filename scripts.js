// Premium landing: render local assets from assets/ folder
document.addEventListener('DOMContentLoaded', function(){
  const galeria = document.getElementById('galeria-cont');
  if(!galeria){ return; }
  const assets = {
    images: [
      'assets/images/img_local_1.svg',
      'assets/images/img_local_2.svg',
      'assets/images/img_local_3.svg',
      'assets/images/img_local_4.svg',
    ],
    audios: [
      // Placeholder path; replace with real assets
      'assets/audio/sample1.mp3'
    ],
    videos: [
      // Placeholder path; replace with real assets
      'assets/videos/sample1.mp4'
    ]
  };
  // Render images
  assets.images.forEach(src => {
    const wrap = document.createElement('div');
    wrap.className = 'media-item';
    wrap.innerHTML = `<img src="${src}" alt="Asset local" onerror="this.style.visibility='hidden'"/>`;
    galeria.appendChild(wrap);
  });
  // Render audios
  assets.audios.forEach(src => {
    const wrap = document.createElement('div');
    wrap.className = 'media-item media-audio';
    wrap.innerHTML = `<figure><figcaption>Audio</figcaption><audio controls preload="none"><source src="${src}" type="audio/mpeg"></audio></figure>`;
    galeria.appendChild(wrap);
  });
  // Render videos
  assets.videos.forEach(src => {
    const wrap = document.createElement('div');
    wrap.className = 'media-item media-video';
    wrap.innerHTML = `<video controls preload="none" poster="assets/images/img_local_1.svg"><source src="${src}" type="video/mp4"></video>`;
    galeria.appendChild(wrap);
  });
});
