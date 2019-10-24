precision mediump float;

attribute vec4 aPosition;
uniform float theta;
uniform float scaleX;
uniform float scaleY;

void main()
{
  mat4 rotate = mat4
  (
    cos(theta), sin(theta), 0.0, 0.0,
    -sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 scale = mat4
  (
    scaleX, 0.0, 0.0, 0.0,
    0.0, scaleY, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0 , 1.0
  );

  mat4 translateLeft5Pts = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    -0.5, 0.0, 0.0 , 1.0
  );

  mat4 translateRight5Pts = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.5, 0.0, 0.0, 1.0
  );

  //Note: Belum dapat render kedua huruf secara simultan
  //Comment dan uncomment code tertentu pada vertex.glsl dan index.js untuk menampilkan salah satu render huruf

  //Rotasi huruf sebelah kiri terhadap dirinya
  gl_Position = translateLeft5Pts * rotate * translateRight5Pts * aPosition;

  //Skalasi huruf sebelah kanan terhadap dirinya
  //gl_Position = translateRight5Pts * scale * translateLeft5Pts * aPosition;
}
