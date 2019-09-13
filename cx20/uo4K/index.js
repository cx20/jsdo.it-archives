// forked from cx20's "[WebGL] Grimoire.js で Cube を動的に追加してみるテスト" http://jsdo.it/cx20/8Mxl
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）" http://jsdo.it/cx20/a1kX
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）" http://jsdo.it/cx20/mjC6
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

gr(function() {
  let ratio = 0;

  function init() {
    const SCALE = 0.4;
    for (let y = 1; y <= 9; y++) {
      for (let x = 1; x <= 9; x++) {
        let position1 = (x - 5) + "," + (SCALE * (x * y) * 0.1 - 3 )+ "," + (y - 5);
        let position2 = (x - 5) + "," + (SCALE * 2 * (x * y) * 0.1 - 2 ) + "," + (y - 5);
        let color = "rgb(" + (x * 30 - 10) / 2 + ", " + (x * y * 3) + ", " + (y * 30 - 10) / 2 + ")";
        let scale = SCALE + "," + SCALE * (x * y) * 0.1 + "," + SCALE;
        let value = x * y;
        //gr('#canvas')('#group').append('<mesh position="' + position1 + '" scale="' + scale + '" geometry="cube" color="' + color + '"/>');
        //gr('#canvas')('#group').append('<text position="' + position2 + '" scale="' + scale + '" text="' + value + '" color="' + color + '"/>');
        gr('#canvas')('#group').append(`<mesh position="${position1}" scale="${scale}" geometry="cube" color="${color}"/>`);
        gr('#canvas')('#group').append(`<text position="${position2}" scale="${scale}" text="${value}" color="${color}"/>`);
      }
    }
  }

  function rot() {
    var mesh = gr('#canvas')('#group');
    mesh.setAttribute('rotation', 0 + ',' + ratio + ',' + 0);
    ratio += 1;
    requestAnimationFrame(rot);
  }

  init();
  rot();
});