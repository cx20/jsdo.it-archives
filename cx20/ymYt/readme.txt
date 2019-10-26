vox.js を試してみるテスト（その３）

＜対応した点＞
・THREE.BoxGeometry() でドットを自前で描画するよう対応。

　// データ全体の大きさ
　voxelData.size; // => { x: number, y: number, z: number }

　// ボクセルの配列
　voxelData.voxels; // => [Voxel, Voxel, Voxel, ...]

　// ボクセル一個のデータ
　voxelData.voxels[0]; // => { x: number, y: number, z: number, colorIndex: number }

　// カラーパレット
　voxelData.palette; // => [Color, Color, Color, ...]
　voxelData.palette[0]; // => { r: number, g: number, b: number, a: number }

＜参考＞
■ MagicaVoxel
https://ephtracy.github.io/

■ JavaScript - MagicaVoxelで作ったデータをThree.jsで表示する - Qiita
http://qiita.com/daishi_hmr/items/9125e367ab862fd9b41e

■ vox.js
http://daishihmr.github.io/vox.js/

