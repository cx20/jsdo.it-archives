時計の針にドット絵を貼りつけるテスト（その２）

＜対応した点＞
・使用ライブラリを Raphael から Snap.svg に変更

　＜主な変更箇所＞
　1. コンストラクタ
　変更前）var r = Raphael('canvas', 465, 465);
　変更後）var r = Snap(465, 465);
　　
　2. 回転処理
　変更前）object.rotate(i * 30, center, center);
　変更後）var matrix = new Snap.Matrix().rotate(i * 30, center, center);
　　　　　object.transform(matrix);
　　
　3. グループ化処理
　変更前）var st = r.set(); ～　st.push(...);
　変更後）var st = r.group(); ～ st.add(...);

＜参考＞
■ Snap.svg - Home
http://snapsvg.io/

■ Snap.svg でドット絵を描いてみるテスト
http://jsdo.it/cx20/kCUy