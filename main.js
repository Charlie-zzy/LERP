const $ = (e) => document.getElementById(e)

let down = false, offset = [], N = 8
let A = { x: 0, y: 0 }, B = []
for (let i = 0; i < N; i++) {
  $('card-' + i).textContent = '0.0' + (N - i)
  B.push({ x: 0, y: (i + 1) * 10 })
}
$('card').onmousedown = (evt) => {
  down = true
  offset = { x: evt.offsetX, y: evt.offsetX }
}
document.onmousemove = (evt) => {
  if (!down) return
  A.x = evt.clientX - offset.x
}
document.onmouseup = (evt) => {
  down = false
}

function lerp(a, b, k = .1) {
  return (1 - k) * a + k * b
}
function animate() {
  requestAnimationFrame(animate)
  B.forEach((T, i) => {
    T.x = lerp(T.x, A.x, (N - i) / 100 + 0.01)
    $(`card-${i}`).style.left = T.x + 'px'
    $(`card-${i}`).style.top = T.y + 'px'
  })
  // B.y = lerp(B.y, A.y)
  $('card').style.left = A.x + 'px'
  $('card').style.top = A.y + 'px'
}
animate()