precision mediump float;

attribute vec4 aPosition;
uniform float theta;
uniform mat4 viewMatrix;
uniform mat4 perspectiveMatrix;

void main()
{
  mat4 rotateY = mat4
  (
    cos(theta), 0.0, -sin(theta), 0.0,
    0.0, 1.0, 0.0, 0.0,
    sin(theta), 0.0 ,cos(theta), 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 translateLeft5Pts = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    -0.5, 0.0, 0.0 , 1.0
  );

  //Rotasi Y terhadap huruf A
  gl_Position = rotateY * translateLeft5Pts * aPosition;
}
