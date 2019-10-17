Canvas でベン図を書いてみるテスト

情報処理試験の過去問にあるようなやつです。

＜対応した点＞
・以下の論理演算のベン図を Canvas で書いてみた。
　・論理積(AND)       
　・論理和(OR)        
　・排他的論理和(XOR) 
　・否定論理積(NAND)
　・否定論理和(NOR) 
　・等価演算(XNOR)      
・実際には、globalCompositeOperation を指定することで、●や■を合成してみた。
・measureText でテキストサイズを計算し、円の中心に A/B がセットされるよう調整

＜参考情報＞
■ canvas   画像の合成方法いろいろ - WebOS Goodies
http://webos-goodies.jp/archives/51054671.html

■ 論理演算 - CyberLibrarian
http://www.asahi-net.or.jp/~ax2s-kmtn/ref/logicope.html
