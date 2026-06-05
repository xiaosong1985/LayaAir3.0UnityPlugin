/* ===========================================================
   共享图片点击放大预览
   用法：页面引入本脚本，给 <figure class="shot"> 内放 <img> 即可。
        无需在页面里写任何 lightbox 容器（脚本自动创建）。
   =========================================================== */
(function () {
  function init() {
    var imgs = document.querySelectorAll('.shot img');
    if (!imgs.length) return;

    // 动态创建预览层，避免每页重复 HTML
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', '图片预览');
    lb.innerHTML =
      '<span class="lb-close" aria-label="关闭">&times;</span>' +
      '<img src="" alt="">' +
      '<div class="lb-cap"></div>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb-cap');

    imgs.forEach(function (img) {
      img.addEventListener('click', function () {
        lbImg.src = img.src;
        lbImg.alt = img.alt || '';
        var fig = img.closest('figure');
        var cap = fig ? fig.querySelector('figcaption') : null;
        lbCap.textContent = cap ? cap.textContent.trim() : '';
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function close() {
      lb.classList.remove('open');
      lbImg.src = '';
      document.body.style.overflow = '';
    }
    lb.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('open')) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
