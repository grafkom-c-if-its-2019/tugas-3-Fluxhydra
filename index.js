(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    var vertices = [
      //Abdurrahman (16-087) -> Huruf A
      //Segitiga acuan 5, 12, 13
      //Persamaan garis BH -> y = (8/33)x + 3
      //Gradien m = 8/33

      //Titik
      // 0.0, 0.7, //A
      // 0.0, 0.3, //B
      // -0.12375, 0.0, //C
      // 0.12375, 0.0, //D
      // -0.193875, -0.17, //E
      // 0.193875, -0.17, //F
      // -0.5, -0.5, //G
      // -0.333, -0.5, //H
      //  0.333, -0.5, //I
      //  0.5, -0.5, //J

      //Garis
      // 0.0, 0.7, -0.5, -0.5, //AG
      // -0.5, -0.5, -0.333, -0.5, //GH
      // -0.333, -0.5, -0.193875, -0.17, //HE
      // -0.193875, -0.17, 0.193875, -0.17, //EF
      // 0.193875, -0.17, 0.333, -0.5, //FI
      // 0.333, -0.5, 0.5, -0.5, //IJ
      // 0.5, -0.5, 0.0, 0.7, //JA
      // 0.0, 0.3, -0.12375, 0.0, //BC
      // -0.12375, 0.0, 0.12375, 0.0, //CD
      // 0.12375, 0.0, 0.0, 0.3 //DB

      //Segitiga
      // 0.0, 0.7, 0.0, 0.3, -0.5, -0.5, //ABG
      // 0.0, 0.3, -0.5, -0.5, -0.333, -0.5, //BGH
      // 0.0, 0.7, 0.0, 0.3, 0.5, -0.5, //ABJ
      // 0.0, 0.3, 0.333, -0.5, 0.5, -0.5, //BIJ
      // -0.12375, 0.0, -0.193875, -0.17, 0.193875, -0.17, //CEF
      // -0.12375, 0.0, 0.12375, 0.0, 0.193875, -0.17 //CDF

      //Segitiga A
      0.5, 0.7, 0.5, 0.3, 0.0, -0.5, //ABG
      0.5, 0.3, 0.0, -0.5, 0.167, -0.5, //BGH
      0.5, 0.7, 0.5, 0.3, 1.0, -0.5, //ABJ
      0.5, 0.3, 0.833, -0.5, 1.0, -0.5, //BIJ
      0.37625, 0.0, 0.306125, -0.17, 0.693875, -0.17, //CEF
      0.37625, 0.0, 0.62375, 0.0, 0.693875, -0.17 //CDF
    ];

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    
    var aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    var thetaLocation = gl.getUniformLocation(program, 'theta');
    var theta = 0.0;

    var oColor = gl.getUniformLocation(program, 'oColor');
    var opacity = 1.0;
    var colorFlag = 1;

    function render()
    {
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Warna gradient
      if(opacity == 1) colorFlag = 1;
      else if (opacity < 0.75) colorFlag = 0;

      if(colorFlag == 1) opacity -= 0.005;
      else opacity += 0.005;
      gl.uniform1f(oColor, opacity);

      // Kecepatan rotasi Y
      theta += 0.01;
      gl.uniform1f(thetaLocation, theta);

      //Gambar A
      gl.drawArrays(gl.TRIANGLES, 0, 18);
      requestAnimationFrame(render);
    };
    render();
  }
})();