// ----------------- Header animation -----------------
var words = ["develop web apps", "build mobile apps", "shape Metaverse", "design in 3D", "create things"];
var cursor = gsap.to('.cursor', {
  opacity: 0,
  ease: "power2.inOut",
  repeat: -1
});
var masterTL = gsap.timeline({
  repeat: -1
});
words.forEach(function (word) {
  var tl = gsap.timeline({
    repeat: 1,
    yoyo: true,
    repeatDelay: 2
  });
  tl.to('.text', {
    duration: 1,
    text: word
  });
  masterTL.add(tl);
}); // // ----------------- Text animation -----------------
// const textReveal = gsap.timeline()
// textReveal.from(".line", 1.8, {
//     y: 100, ease: "power4.out", delay: 1, skewY: 10, stagger: {
//         amount: 0.4
//     }
// })