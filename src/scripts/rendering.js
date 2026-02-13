/**
 * 3D Rendering Pipeline with Z-Buffer
 */

export class Renderer3D {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.pixelSize = options.pixelSize ?? 1;
    
    // Z-buffer for depth 
    this.zBuffer = null;
    this.colorBuffer = null;
    
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth * 0.3;
    this.canvas.height = window.innerHeight * 0.3;
    this.initBuffers();
  }
  
  initBuffers() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Z-buffer: stores depth value for each pixel
    this.zBuffer = new Float32Array(width * height);
    this.zBuffer.fill(Infinity);
    
    // Color buffer: stores color for each pixel
    this.colorBuffer = new Uint8ClampedArray(width * height * 4);
  }
  
  clear(color = {r:0,g:0,b:0,a:255}) {
    this.zBuffer.fill(Infinity);

    const packed =
        (color.a << 24) |
        (color.b << 16) |
        (color.g << 8)  |
        (color.r);

    this.colorBuffer.fill(packed);
    }

  /**
   * Render mesh to screen
   */
  render(mesh, transform = {}) {
    // 1. Transform vertices (rotation, translation, etc.)
    const transformedVertices = this.transformVertices(mesh.vertices, transform);
    
    // 2. Convert to screen space and calculate depths
    const screenVertices = transformedVertices.map(v => ({
      screen: this.project(v),
      depth: v.z
    }));
    
    // 3. Rasterize each triangle
    mesh.faces.forEach((face, faceIndex) => {
      this.rasterizeTriangle(
        screenVertices[face[0]],
        screenVertices[face[1]],
        screenVertices[face[2]],
        mesh,
        face,
        faceIndex
      );
    });
    
    // 4. Draw buffer to canvas
    this.flush();
  }
  
  /**
   * Apply transformations (rotation, translation, scale)
   */
  transformVertices(vertices, transform) {
    const {
      rotation = {x: 0, y: 0, z: 0},
      translation = {x: 0, y: 0, z: 0},
      scale = 1
    } = transform;
    
    return vertices.map(v => {
      // Scale
      let p = {
        x: v.x * scale,
        y: v.y * scale,
        z: v.z * scale
      };
      
      // Rotate around X axis
      p = this.rotateX(p, rotation.x);
      
      // Rotate around Y axis
      p = this.rotateY(p, rotation.y);
      
      // Rotate around Z axis
      p = this.rotateZ(p, rotation.z);
      
      // Translate
      p.x += translation.x;
      p.y += translation.y;
      p.z += translation.z;
      
      return p;
    });
  }
  
  rotateX(p, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
      x: p.x,
      y: p.y * c - p.z * s,
      z: p.y * s + p.z * c
    };
  }
  
  rotateY(p, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
      x: p.x * c + p.z * s,
      y: p.y,
      z: -p.x * s + p.z * c
    };
  }
  
  rotateZ(p, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
      x: p.x * c - p.y * s,
      y: p.x * s + p.y * c,
      z: p.z
    };
  }
  
  /**
   * Project 3D point to 2D screen space
   */
  project(point) {
    // Perspective projection
    const fov = 2.5; // Field of view factor
    const z = Math.max(point.z, 0.1); // Avoid division by zero
    
    const x = (point.x / z) * fov;
    const y = (point.y / z) * fov;
    
    // Convert NDC to screen coordinates
    return {
      x: Math.floor((x + 1) / 2 * this.canvas.width),
      y: Math.floor((1 - (y + 1) / 2) * this.canvas.height)
    };
  }
  
  /**
   * Rasterize triangle with z-buffering
   */
  rasterizeTriangle(v0, v1, v2, mesh, face, faceIndex) {
    // Backface culling
    if (this.shouldCullFace(v0, v1, v2)) return;
    
    // Get bounding box
    const minX = Math.max(0, Math.floor(Math.min(v0.screen.x, v1.screen.x, v2.screen.x)));
    const maxX = Math.min(this.canvas.width - 1, Math.ceil(Math.max(v0.screen.x, v1.screen.x, v2.screen.x)));
    const minY = Math.max(0, Math.floor(Math.min(v0.screen.y, v1.screen.y, v2.screen.y)));
    const maxY = Math.min(this.canvas.height - 1, Math.ceil(Math.max(v0.screen.y, v1.screen.y, v2.screen.y)));
    
    // Rasterize each pixel in bounding box
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        // Calculate barycentric coordinates
        const bary = this.barycentric(
          x, y,
          v0.screen.x, v0.screen.y,
          v1.screen.x, v1.screen.y,
          v2.screen.x, v2.screen.y
        );
        
        // Check if point is inside triangle
        if (bary.u >= 0 && bary.v >= 0 && bary.w >= 0) {
          // Interpolate depth
          const depth = bary.u * v0.depth + bary.v * v1.depth + bary.w * v2.depth;
          
          const bufferIndex = y * this.canvas.width + x;
          
          // Z-buffer test
          if (depth < this.zBuffer[bufferIndex]) {
            this.zBuffer[bufferIndex] = depth;
            
            // Calculate color
            const color = this.getPixelColor(mesh, face, faceIndex, bary);
            
            // Write to color buffer
            const colorIndex = bufferIndex * 4;
            this.colorBuffer[colorIndex] = color.r;
            this.colorBuffer[colorIndex + 1] = color.g;
            this.colorBuffer[colorIndex + 2] = color.b;
            this.colorBuffer[colorIndex + 3] = 255;
          }
        }
      }
    }
  }
  
  /**
   * Calculate barycentric coordinates
   */
  barycentric(px, py, x0, y0, x1, y1, x2, y2) {
    const v0x = x1 - x0;
    const v0y = y1 - y0;
    const v1x = x2 - x0;
    const v1y = y2 - y0;
    const v2x = px - x0;
    const v2y = py - y0;
    
    const den = v0x * v1y - v1x * v0y;
    const v = (v2x * v1y - v1x * v2y) / den;
    const w = (v0x * v2y - v2x * v0y) / den;
    const u = 1 - v - w;
    
    return {u, v, w};
  }
  
  /**
   * Backface culling - don't render triangles facing away
   */
  shouldCullFace(v0, v1, v2) {
    // Calculate screen-space edge vectors
    const edge1x = v1.screen.x - v0.screen.x;
    const edge1y = v1.screen.y - v0.screen.y;
    const edge2x = v2.screen.x - v0.screen.x;
    const edge2y = v2.screen.y - v0.screen.y;
    
    // Cross product z-component (positive = counter-clockwise = facing camera)
    const cross = edge1x * edge2y - edge1y * edge2x;
    
    return cross <= 0; // Cull if clockwise (facing away)
  }
  
  /**
   * Determine pixel color with interpolation
   */
    getPixelColor(mesh, face, faceIndex, bary) {
        // Option 1: Per-face color (this should take priority)
        if (mesh.faceColors && mesh.faceColors[faceIndex]) {
            return mesh.faceColors[faceIndex];
        }
        
        // Option 2: Interpolate vertex colors (only if all vertices have colors)
        if (mesh.colors && face[0] < mesh.colors.length && 
            face[1] < mesh.colors.length && face[2] < mesh.colors.length) {
            const c0 = mesh.colors[face[0]];
            const c1 = mesh.colors[face[1]];
            const c2 = mesh.colors[face[2]];
            
            // Make sure the colors exist
            if (c0 && c1 && c2) {
            return {
                r: Math.floor(bary.u * c0.r + bary.v * c1.r + bary.w * c2.r),
                g: Math.floor(bary.u * c0.g + bary.v * c1.g + bary.w * c2.g),
                b: Math.floor(bary.u * c0.b + bary.v * c1.b + bary.w * c2.b)
            };
            }
        }
        
        // Option 3: Mesh-level default color
        if (mesh.color) {
            return mesh.color;
        }
        
        // Option 4: Fallback (white instead of green)
        return {r: 255, g: 255, b: 255};
    }
  
  /**
   * Draw color buffer to canvas
   */
  flush() {
    const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
    imageData.data.set(this.colorBuffer);
    this.ctx.putImageData(imageData, 0, 0);
  }
}