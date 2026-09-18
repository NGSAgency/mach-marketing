// The panel follows the page: the chapter under the middle of the screen sets
// the picture, the caption, the board of facts and the contents marker.
(function () {
  const chaps = [...document.querySelectorAll('.chap')];
  const imgs  = [...document.querySelectorAll('.shotwrap img')];
  const cap   = document.getElementById('cap');
  const board = document.getElementById('board');
  const toc   = document.getElementById('toc');
  const dots  = [...document.querySelectorAll('.rail a')];
  let tocLinks = [];

  if (toc) {
    toc.innerHTML = chaps.map(c =>
      '<li><a href="#' + c.id + '" data-t="' + c.id + '"><i>' + c.dataset.n + '</i>' + c.dataset.label + '</a></li>'
    ).join('');
    tocLinks = [...toc.querySelectorAll('a')];
  }

  let current = null;
  function apply(sec){
    if (sec === current) return;
    current = sec;
    const [title, line] = (sec.dataset.cap || '|').split('|');
    cap.innerHTML = '<span class="chip"><i>' + sec.dataset.n + '</i>' + sec.dataset.label + '</span>' +
                    '<b>' + title + '</b><span>' + line + '</span>';
    const tpl = sec.querySelector('template.board');
    board.innerHTML = tpl ? tpl.innerHTML : '';
    if (imgs.length) imgs.forEach(i => i.classList.toggle('on', i.dataset.k === sec.dataset.img));
    tocLinks.forEach(a => a.classList.toggle('on', a.dataset.t === sec.id));
    dots.forEach(d => d.classList.toggle('on', d.dataset.r === String(+sec.dataset.n)));
  }

  // Called straight from the scroll event: an earlier version queued this on
  // requestAnimationFrame behind a flag, and when the browser throttled frames
  // the flag never cleared and the panel stopped following the page at all.
  function spy(){
    const mid = window.innerHeight / 2;
    let found = chaps[0];
    for (const c of chaps){
      const r = c.getBoundingClientRect();
      if (r.top <= mid && r.bottom > mid) { found = c; break; }
      if (r.top > mid) break;
      found = c;
    }
    apply(found);
  }
  addEventListener('scroll', spy, { passive: true });
  addEventListener('resize', spy);
  spy();
})();
