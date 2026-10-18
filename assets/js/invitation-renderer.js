/* The on-screen invitation and the downloaded PNG share this exact artwork. */
(() => {
  'use strict';
  const quotes = [
    'Every new beginning grows brighter with a teacher’s guidance.',
    'The lessons you share become the confidence we carry forward.',
    'Behind every hopeful future is a teacher who helped it bloom.'
  ];
  const serif = '"Cormorant Garamond", Georgia, serif';
  const sans = '"DM Sans", Arial, sans-serif';
  const colors = { paper: '#fff9ef', wine: '#64132d', gold: '#ad8245', muted: '#806957' };
  const quoteFor = person => quotes[(person.id - 1) % quotes.length];
  const day = () => new Date(`${window.TEJAS_EVENT.date}T12:00:00+05:30`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });

  function loadPortrait(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const timer = setTimeout(() => reject(new Error('The portrait took too long to load. Please try again.')), 10000);
      image.onload = () => { clearTimeout(timer); resolve(image); };
      image.onerror = () => { clearTimeout(timer); reject(new Error('Your portrait could not be loaded. Please try again.')); };
      image.src = src;
    });
  }
  async function render(person) {
    const fontLoads = document.fonts ? Promise.allSettled([
      document.fonts.load(`600 58px ${serif}`), document.fonts.load(`italic 34px ${serif}`),
      document.fonts.load(`italic 500 48px ${serif}`), document.fonts.load(`500 24px ${sans}`)
    ]) : Promise.resolve();
    const [portrait] = await Promise.all([
      loadPortrait(person.photo),
      Promise.race([fontLoads, new Promise(resolve => setTimeout(resolve, 2500))])
    ]);
    const canvas = document.createElement('canvas');
    canvas.width = 1500; canvas.height = 2100;
    const ctx = canvas.getContext('2d');
    const text = (value, x, y, font, color = colors.wine) => {
      ctx.font = font; ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.fillText(value, x, y);
    };
    const spaced = (value, y, size = 17, spacing = 3, color = colors.gold) => {
      ctx.font = `500 ${size}px ${sans}`; ctx.fillStyle = color; ctx.textAlign = 'left';
      const widths = [...value].map(letter => ctx.measureText(letter).width);
      let x = (1500 - widths.reduce((sum, width) => sum + width, 0) - spacing * (widths.length - 1)) / 2;
      [...value].forEach((letter, index) => { ctx.fillText(letter, x, y); x += widths[index] + spacing; });
    };
    const wrap = (value, y, maxWidth, font, color, lineHeight = 38) => {
      ctx.font = font;
      const lines = []; let line = '';
      value.split(/\s+/).forEach(word => {
        const next = line ? `${line} ${word}` : word;
        if (line && ctx.measureText(next).width > maxWidth) { lines.push(line); line = word; }
        else line = next;
      });
      if (line) lines.push(line);
      lines.forEach((value, index) => text(value, 750, y + index * lineHeight, font, color));
      return lines.length;
    };
    const rule = (y, left = 285, right = 1215) => {
      ctx.strokeStyle = '#b7925966'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(left, y); ctx.lineTo(720, y); ctx.moveTo(780, y); ctx.lineTo(right, y); ctx.stroke();
      ctx.save(); ctx.translate(750, y); ctx.rotate(Math.PI / 4); ctx.strokeStyle = colors.gold; ctx.strokeRect(-7, -7, 14, 14); ctx.restore();
    };
    function botanical(x, y, rotate = 0) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rotate); ctx.scale(1.55, 1.55);
      ctx.strokeStyle = '#b9955a80'; ctx.lineWidth = .9;
      ctx.stroke(new Path2D('M13 169C84 116 43 38 121 8M38 143C21 126 7 117 7 96C33 102 41 121 38 143ZM51 116C73 113 88 95 91 77C63 84 49 99 51 116ZM56 89C36 77 27 57 31 40C53 52 60 69 56 89ZM76 52C97 54 119 44 129 27C99 24 86 35 76 52ZM96 27C83 19 78 7 84 1C99 8 103 17 96 27Z'));
      ctx.restore();
    }

    ctx.fillStyle = colors.paper; ctx.fillRect(0, 0, 1500, 2100);
    const glow = ctx.createRadialGradient(750, 800, 150, 750, 1050, 1400);
    glow.addColorStop(0, '#fffdf7'); glow.addColorStop(1, '#f0dfc4');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, 1500, 2100);
    ctx.strokeStyle = '#a77a3507'; ctx.lineWidth = 1;
    for (let y = 0; y < 2100; y += 5) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1500, y); ctx.stroke(); }
    ctx.strokeStyle = colors.wine; ctx.lineWidth = 3; ctx.strokeRect(29, 29, 1442, 2042);
    ctx.strokeStyle = colors.gold; ctx.lineWidth = 1.5; ctx.strokeRect(47, 47, 1406, 2006);
    ctx.strokeStyle = '#bd9a6355'; ctx.lineWidth = 1; ctx.strokeRect(56, 56, 1388, 1988);
    botanical(84, 200); botanical(1416, 1900, Math.PI);
    spaced('SRUSTI ACADEMY OF MANAGEMENT & TECHNOLOGY', 121, 20, 2, colors.wine);
    text('Department of Computer Applications', 750, 159, `italic 29px ${serif}`, colors.muted);
    spaced('WITH RESPECT & HEARTFELT GRATITUDE', 220, 16, 3);
    ctx.font = `600 118px ${serif}`;
    const first = 'TEJAS ', second = '’26';
    const total = ctx.measureText(first + second).width;
    ctx.textAlign = 'left'; ctx.fillStyle = colors.wine; ctx.fillText(first, (1500 - total) / 2, 345);
    ctx.fillStyle = colors.gold; ctx.fillText(second, (1500 - total) / 2 + ctx.measureText(first).width, 345);
    text('THE FRESH BLOOM', 750, 408, `italic 500 48px ${serif}`, colors.gold);
    spaced('MCA FRESHERS’ CELEBRATION  ·  BATCH 2026–2028', 456, 16, 2);
    rule(490);

    // Keep the original portrait recognisable, with a gentle arch and a restrained gold frame.
    const frame = { x: 604, y: 535, w: 292, h: 344 };
    ctx.save(); ctx.shadowColor = '#55352625'; ctx.shadowBlur = 25; ctx.shadowOffsetY = 9;
    ctx.fillStyle = '#fffaf1'; ctx.beginPath(); ctx.roundRect(frame.x - 10, frame.y - 10, frame.w + 20, frame.h + 20, [150, 150, 23, 23]); ctx.fill(); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.roundRect(frame.x, frame.y, frame.w, frame.h, [140, 140, 15, 15]); ctx.clip();
    const scale = Math.max(frame.w / portrait.naturalWidth, frame.h / portrait.naturalHeight);
    const w = portrait.naturalWidth * scale, h = portrait.naturalHeight * scale;
    ctx.drawImage(portrait, frame.x - (w - frame.w) / 2, frame.y - (h - frame.h) * .18, w, h); ctx.restore();
    ctx.strokeStyle = colors.gold; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(frame.x - 10, frame.y - 10, frame.w + 20, frame.h + 20, [150, 150, 23, 23]); ctx.stroke();
    spaced('A PERSONAL INVITATION FOR', 942, 16, 3);
    let nameSize = 62;
    while (nameSize > 38) { ctx.font = `600 ${nameSize}px ${serif}`; if (ctx.measureText(person.name).width <= 1190) break; nameSize -= 2; }
    text(person.name, 750, 1012, `600 ${nameSize}px ${serif}`);
    wrap(person.role, 1054, 1130, `500 22px ${sans}`, colors.muted, 30);
    text('You are cordially invited.', 750, 1150, `italic 54px ${serif}`);
    wrap('We would be honoured by your presence as we welcome our newest MCA family.', 1207, 1050, `30px ${serif}`, colors.muted, 38);
    text('“', 750, 1328, `76px ${serif}`, colors.gold);
    wrap(quoteFor(person), 1358, 1070, `italic 36px ${serif}`, colors.wine, 42);

    ctx.fillStyle = colors.wine; ctx.beginPath(); ctx.roundRect(132, 1460, 1236, 224, 12); ctx.fill();
    const details = [
      { x: 441, title: 'DATE & TIME', value: `${day()}`, detail: `${window.TEJAS_EVENT.mainEventTime} · Lunch: ${window.TEJAS_EVENT.lunchTime}` },
      { x: 1059, title: 'THE VENUE', value: window.TEJAS_EVENT.venue, detail: 'Srusti Academy of Management & Technology' }
    ];
    details.forEach(({x,title,value,detail}) => {
      text(title, x, 1515, `600 16px ${sans}`, '#e4c38f');
      text(value, x, 1573, `600 34px ${serif}`, '#fff6e7');
      text(detail, x, 1622, `500 21px ${sans}`, '#eedac0');
    });
    ctx.strokeStyle = '#e3bf864a'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(750,1490); ctx.lineTo(750,1650); ctx.stroke();
    wrap('We warmly seek your gracious presence, blessings and encouragement.', 1746, 1100, `31px ${serif}`, colors.muted, 40);
    text('With profound respect & warm regards,', 750, 1838, `italic 36px ${serif}`, colors.muted);
    text('The TEJAS ’26 Organising Team · MCA Batch 2026–2028', 750, 1888, `600 32px ${serif}`);
    rule(1945, 425, 1075);
    text('A new chapter begins with your blessings.', 750, 2006, `italic 27px ${serif}`, colors.muted);
    const blob = await new Promise((resolve, reject) => {
      try { canvas.toBlob(value => value ? resolve(value) : reject(new Error('The invitation could not be prepared. Please try again.')), 'image/png'); }
      catch { reject(new Error('Please open this website through the local preview (npm start) to download an invitation with your photo.')); }
    });
    return { blob, quote: quoteFor(person), date: day() };
  }
  window.TEJAS_INVITATION = { render, quoteFor };
})();
