// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

class App {
  constructor() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    const engine = this.engine = Filament.Engine.create(this.canvas);
    this.scene = engine.createScene();
    this.triangle = Filament.EntityManager.get()
      .create();
    this.scene.addEntity(this.triangle);
    const TRIANGLE_POSITIONS = new Float32Array([
        0.0,  0.5,
       -0.5, -0.5,
        0.5, -0.5 
    ]);
    const TRIANGLE_COLORS = new Uint32Array([
        0xffff0000, 
        0xffff0000, 
        0xffff0000
    ]);
    const VertexAttribute = Filament.VertexAttribute;
    const AttributeType = Filament.VertexBuffer$AttributeType;
    this.vb = Filament.VertexBuffer.Builder()
      .vertexCount(3)
      .bufferCount(2)
      .attribute(VertexAttribute.POSITION, 0, AttributeType.FLOAT2, 0, 8)
      .attribute(VertexAttribute.COLOR, 1, AttributeType.UBYTE4, 0, 4)
      .normalized(VertexAttribute.COLOR)
      .build(engine);
    this.vb.setBufferAt(engine, 0, TRIANGLE_POSITIONS);
    this.vb.setBufferAt(engine, 1, TRIANGLE_COLORS);
    this.ib = Filament.IndexBuffer.Builder()
      .indexCount(3)
      .bufferType(Filament.IndexBuffer$IndexType.USHORT)
      .build(engine);
    this.ib.setBuffer(engine, new Uint16Array([0, 1, 2]));
    //const mat = engine.createMaterial('triangle.filamat');
    //const mat = engine.createMaterial('/assets/k/S/h/N/kShN2'); // triangle.filamat
    const mat = engine.createMaterial('https://rawcdn.githack.com/google/filament/724e9abf960700201c05f50df80a60ddd3a1ce06/docs/webgl/triangle.filamat');
    const matinst = mat.getDefaultInstance();
    Filament.RenderableManager.Builder(1)
    .boundingBox({
      center: [-1, -1, -1],
      halfExtent: [1, 1, 1]
    })
    .material(0, matinst)
    .geometry(0, Filament.RenderableManager$PrimitiveType.TRIANGLES, this.vb, this.ib)
    .build(engine, this.triangle);
    this.swapChain = engine.createSwapChain();
    this.renderer = engine.createRenderer();
    this.camera = engine.createCamera();
    this.view = engine.createView();
    this.view.setCamera(this.camera);
    this.view.setScene(this.scene);
    this.view.setClearColor([1.0, 1.0, 1.0, 1.0]);
    this.resize(); // adjust the initial viewport
    this.render = this.render.bind(this);
    this.resize = this.resize.bind(this);
    window.addEventListener('resize', this.resize);
    window.requestAnimationFrame(this.render);
  }
  render() {
    // Render the frame.
    this.renderer.render(this.swapChain, this.view);
    window.requestAnimationFrame(this.render);
  }
  resize() {
    const dpr = window.devicePixelRatio;
    const width = this.canvas.width = window.innerWidth * dpr;
    const height = this.canvas.height = window.innerHeight * dpr;
    this.view.setViewport([0, 0, width, height]);
    const aspect = width / height;
    const Projection = Filament.Camera$Projection;
    this.camera.setProjection(Projection.ORTHO, -aspect, aspect, -1, 1, 0, 1);
  }
}
//Filament.init(['triangle.filamat'], () => {
//Filament.init(['/assets/k/S/h/N/kShN2'], () => { // triangle.filamat
Filament.init(['https://rawcdn.githack.com/google/filament/724e9abf960700201c05f50df80a60ddd3a1ce06/docs/webgl/triangle.filamat'], () => {
  window.app = new App()
});