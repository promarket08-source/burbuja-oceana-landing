// Premium landing: render local assets from assets/ folder
document.addEventListener('DOMContentLoaded', function(){
  const galeria = document.getElementById('galeria-cont');
  if(!galeria){ return; }
  const assets = {
    images: [
      'assets/logo-burbuja.png',
      'assets/logo-oceana-main.png',
      'assets/mapa-mental.png',
      'assets/mind-map.png',
      'assets/unnamed.png'
    ],
    audios: [
      'assets/audio-hoteles-bunker.m4a',
      'assets/audio-modernizacion-sustentable.m4a'
    ],
    videos: [
      'assets/video-propuesta-valor.mp4',
      'assets/video-proyecto-estrategico.mp4'
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
