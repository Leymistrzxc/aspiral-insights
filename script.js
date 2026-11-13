const NAMES = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
const SCORES = [[75, 50, 85, 60, 90, 45, 70, 45, 90, 60, 85, 50], [50, 75, 50, 85, 60, 90, 45, 70, 45, 90, 60, 85], [85, 50, 75, 50, 85, 60, 90, 45, 70, 45, 90, 60], [60, 85, 50, 75, 50, 85, 60, 90, 45, 70, 45, 90], [90, 60, 85, 50, 75, 50, 85, 60, 90, 45, 70, 45], [45, 90, 60, 85, 50, 75, 50, 85, 60, 90, 45, 70], [70, 45, 90, 60, 85, 50, 75, 50, 85, 60, 90, 45], [45, 70, 45, 90, 60, 85, 50, 75, 50, 85, 60, 90], [90, 45, 70, 45, 90, 60, 85, 50, 75, 50, 85, 60], [60, 90, 45, 70, 45, 90, 60, 85, 50, 75, 50, 85], [85, 60, 90, 45, 70, 45, 90, 60, 85, 50, 75, 50], [50, 85, 60, 90, 45, 70, 45, 90, 60, 85, 50, 75]];
const STARTS = {"Aries": [3, 21], "Taurus": [4, 20], "Gemini": [5, 21], "Cancer": [6, 21], "Leo": [7, 23], "Virgo": [8, 23], "Libra": [9, 23], "Scorpio": [10, 23], "Sagittarius": [11, 22], "Capricorn": [12, 22], "Aquarius": [1, 20], "Pisces": [2, 19]};
const INFO = {"Aries": {"dates": "Mar 21 – Apr 19", "el": "Fire", "line": "Aries opens the zodiac year, and it acts like it."}, "Taurus": {"dates": "Apr 20 – May 20", "el": "Earth", "line": "Taurus is steady, sensual and deeply loyal."}, "Gemini": {"dates": "May 21 – Jun 20", "el": "Air", "line": "Gemini is curious, quick and endlessly talkative."}, "Cancer": {"dates": "Jun 21 – Jul 22", "el": "Water", "line": "Cancer is intuitive, nurturing and fiercely protective of the people they love."}, "Leo": {"dates": "Jul 23 – Aug 22", "el": "Fire", "line": "Leo is warm, generous and born to be noticed."}, "Virgo": {"dates": "Aug 23 – Sep 22", "el": "Earth", "line": "Virgo is thoughtful, precise and quietly devoted."}, "Libra": {"dates": "Sep 23 – Oct 22", "el": "Air", "line": "Libra seeks balance, beauty and fairness."}, "Scorpio": {"dates": "Oct 23 – Nov 21", "el": "Water", "line": "Scorpio is intense, perceptive and fiercely private."}, "Sagittarius": {"dates": "Nov 22 – Dec 21", "el": "Fire", "line": "Sagittarius is a restless optimist with a taste for travel and big questions."}, "Capricorn": {"dates": "Dec 22 – Jan 19", "el": "Earth", "line": "Capricorn is disciplined, patient and quietly ambitious."}, "Aquarius": {"dates": "Jan 20 – Feb 18", "el": "Air", "line": "Aquarius is original, independent and a little ahead of its time."}, "Pisces": {"dates": "Feb 19 – Mar 20", "el": "Water", "line": "Pisces is gentle, imaginative and deeply empathetic."}};

// ---- Compatibility: check a pair ----
function verdict(v) {
  return v >= 88 ? "A natural, glowing match" : v >= 78 ? "A strong, easy match" : v >= 68 ? "A balanced match with spark"
       : v >= 58 ? "A match that grows with effort" : "A challenging but rewarding match";
}
const checkBtn = document.getElementById("checkBtn");
if (checkBtn) {
  checkBtn.addEventListener("click", function () {
    const a = document.getElementById("signA").value, b = document.getElementById("signB").value;
    const v = SCORES[NAMES.indexOf(a)][NAMES.indexOf(b)];
    document.getElementById("pairResult").textContent = a + " and " + b + ": " + v + "%. " + verdict(v) + ".";
  });
}

// ---- Birthday Finder ----
function findSign(month, day) {
  // The latest sign whose start date is on or before the birthday. Before Jan 20 it is Capricorn.
  const value = month * 100 + day;
  let best = "Capricorn", bestStart = 0;
  for (const name of NAMES) {
    const start = STARTS[name][0] * 100 + STARTS[name][1];
    if (start <= value && start > bestStart) { best = name; bestStart = start; }
  }
  if (value >= 1222) best = "Capricorn";
  return best;
}
const findBtn = document.getElementById("findBtn");
if (findBtn) {
  findBtn.addEventListener("click", function () {
    const month = Number(document.getElementById("month").value);
    const day = Number(document.getElementById("day").value);
    const out = document.getElementById("finderResult");
    const check = new Date(2024, month - 1, day);   // 2024 is a leap year, so Feb 29 is allowed
    if (!day || check.getMonth() !== month - 1) {
      out.innerHTML = '<p class="error">Please enter a real date.</p>';
      return;
    }
    const sign = findSign(month, day), info = INFO[sign];
    out.innerHTML = '<div class="ring"><svg class="gl" viewBox="0 0 24 24"><use href="#g-' + sign.toLowerCase() + '"/></svg></div>' +
      "<h2>You are " + sign + "</h2><p class=\"dt\">" + info.dates + " | " + info.el + " sign</p><p>" + info.line +
      '</p><a class="btn" href="zodiac-signs.html#' + sign.toLowerCase() + '">Read Full Details</a>';
  });
}
