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

      //Kedua gambar perlu ditampilkan dalam 1 canvas
      //Adjustment #1: Seluruh nilai X - 0.5 (garis A) 
      //Adjustment #2: Seluruh nilai X + 0.5 (segitiga A)

      //Garis A
      -0.5, 0.7, -1, -0.5, //AG
      -1, -0.5, -0.833, -0.5, //GH
      -0.833, -0.5, -0.693875, -0.17, //HE
      -0.693875, -0.17, -0.306125, -0.17, //EF
      -0.306125, -0.17, -0.167, -0.5, //FI
      -0.167, -0.5, 0.0, -0.5, //IJ
      0.0, -0.5, -0.5, 0.7, //JA
      -0.5, 0.3, -0.62375, 0.0, //BC
      -0.62375, 0.0, -0.37625, 0.0, //CD
      -0.37625, 0.0, -0.5, 0.3, //DB

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

    var scaleXLocation = gl.getUniformLocation(program, 'scaleX');
    var scaleYLocation = gl.getUniformLocation(program, 'scaleY');
    var scaleX = 1.0;
    var scaleY = 1.0;
    var melebar = 1;

    function render()
    {
        // Bersihkan layar jadi hitam
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
        // Bersihkan buffernya canvas
        gl.clear(gl.COLOR_BUFFER_BIT);

        theta += 0.01;
        gl.uniform1f(thetaLocation, theta);

        if (scaleX >= 1) melebar = -1;
        else if (scaleX <= -1) melebar = 1;
        scaleX += 0.0087 * melebar;
        gl.uniform1f(scaleXLocation, scaleX);
        gl.uniform1f(scaleYLocation, scaleY);

        //Rotasi huruf sebelah kiri terhadap dirinya
        gl.drawArrays(gl.LINES,0,20);

        //Skalasi huruf sebelah kanan terhadap dirinya
        //gl.drawArrays(gl.TRIANGLES,20,38);
        requestAnimationFrame(render);
    };
    render();
  }
})();