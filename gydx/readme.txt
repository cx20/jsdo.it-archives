[�ȈՔ�] WebGL �ŕϊ��s���p���ĎO�p�`���X���Ă݂�e�X�g�i���̂Q�j
�� ������������G���[�������Ȃ����ȈՔł̃R�[�h�ɂȂ�܂��B�����ӂ��������B

���Ή������_��
�E���_�V�F�[�_�� mat4 �ϐ��� uniform �ϐ��ɕύX�� JavaScript ���ɂāA�s����w�肷��悤�Ή��B
�@��JavaScript��
�@�@var mvpMatrix = [
�@�@�@�@1.0, 0.0, 0.0, 0.5,
�@�@�@�@0.0, 1.0, 0.0, 0.0,
�@�@�@�@0.0, 0.0, 1.0, 0.0,
�@�@�@�@0.0, 0.0, 0.0, 1.0
�@�@];
�@�@uLoc = gl.getUniformLocation(p, 'mvpMatrix');
�@�@gl.uniformMatrix4fv(uLoc, false, new Float32Array(mvpMatrix));

�@��GLSL / ���_�V�F�[�_��
�@�@uniform mat4 mvpMatrix;
�@�@void main() {
�@�@�@�@gl_Position = mvpMatrix * vec4(pos, 1.0);
�@�@}

���Q�l��
�� WebGL���t�@�����X
http://ec.nikkeibp.co.jp/nsp/dl/08513/HTML5GAMES_AppB.pdf

�� �`���[�g���A��3�F�s�� | opengl-tutorial.org
http://www.opengl-tutorial.org/ja/opengl%E3%81%AE%E5%9F%BA%E7%A4%8E/%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB3%EF%BC%9A%E8%A1%8C%E5%88%97/
