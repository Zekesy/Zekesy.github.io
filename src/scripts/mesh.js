
// Standard mesh format
const mesh = {
  vertices: [
    {x: 0, y: 0, z: 0},
    {x: 1, y: 0, z: 0},
    {x: 0, y: 1, z: 0},
    // ... more vertices
  ],
  faces: [
    [0, 1, 2],  // Triangle: indices into vertices array
    [1, 3, 2],
    // ... more triangular faces
  ],
  // Optional metadata
  colors: [      // Per-vertex colors (optional)
    {r: 255, g: 0, b: 0},
    {r: 0, g: 255, b: 0},
    // ...
  ],
  normals: [     // Per-vertex normals for lighting (optional)
    {x: 0, y: 0, z: 1},
    // ...
  ],
  faceColors: [  // Per-face colors (optional)
    {r: 100, g: 200, b: 50},
    // ...
  ]
};

/**
 * Triangulate a polygon face into triangles using fan triangulation
 * Works for convex polygons
 */
export function triangulateFace(vertexIndices) {
  const triangles = [];
  
  if (vertexIndices.length < 3) return triangles;
  if (vertexIndices.length === 3) return [vertexIndices];
  
  // Fan triangulation: connect all vertices to first vertex
  for (let i = 1; i < vertexIndices.length - 1; i++) {
    triangles.push([
      vertexIndices[0],
      vertexIndices[i],
      vertexIndices[i + 1]
    ]);
  }
  
  return triangles;
}

/**
 * Convert mesh with any polygon faces to triangulated mesh
 */
export function triangulate(mesh) {
  const triangulatedFaces = [];
  
  mesh.faces.forEach(face => {
    const tris = triangulateFace(face);
    triangulatedFaces.push(...tris);
  });
  
  return {
    ...mesh,
    faces: triangulatedFaces
  };
}

export async function loadMeshJSON(url) {
  const response = await fetch(url);
  const mesh = await response.json();
  
  console.log(`Loaded mesh: ${mesh.metadata.vertexCount} vertices, ${mesh.metadata.faceCount} faces`);
  
  return mesh;
}
/**
 * Parse OBJ file format and return mesh
 */
export function parseOBJ(objText) {
  const lines = objText.split('\n');
  const vertices = [];
  const faces = [];
  const materials = {};
  let currentMaterial = null;
  
  // Helper function to convert Tinkercad color codes to RGB
  function getColorFromMaterial(materialName) {
    // Known colors from Tinkercad
    const knownColors = {
      '2829873': {r: 40, g: 40, b: 40},      // Black
      '16448250': {r: 250, g: 250, b: 250},  // White
      '11107152': {r: 70, g: 100, b: 130},   // Gray-blue (book color)
      '16744448': {r: 255, g: 128, b: 0},    // Orange
      '16711680': {r: 255, g: 0, b: 0},      // Red
      '65280': {r: 0, g: 255, b: 0},         // Green
      '255': {r: 0, g: 0, b: 255},           // Blue
      '16776960': {r: 255, g: 255, b: 0},    // Yellow
    };
    
    // Extract color code from material name
    const match = materialName.match(/color_(\d+)/);
    if (match && knownColors[match[1]]) {
      return knownColors[match[1]];
    }
    
    // If we don't know the color, try to parse it as a decimal RGB value
    if (match) {
      const colorValue = parseInt(match[1]);
      return {
        r: (colorValue >> 16) & 0xFF,
        g: (colorValue >> 8) & 0xFF,
        b: colorValue & 0xFF
      };
    }
    
    // Default fallback
    return {r: 200, g: 200, b: 200};
  }
  
  lines.forEach(line => {
    const parts = line.trim().split(/\s+/);
    
    if (parts[0] === 'v') {
      vertices.push({
        x: parseFloat(parts[1]),
        y: parseFloat(parts[2]),
        z: parseFloat(parts[3])
      });
    } else if (parts[0] === 'usemtl') {
      currentMaterial = parts[1];
      if (!materials[currentMaterial]) {
        materials[currentMaterial] = getColorFromMaterial(currentMaterial);
      }
    } else if (parts[0] === 'f') {
      const faceVertices = parts.slice(1).map(p => {
        const vertexIndex = parseInt(p.split('/')[0]) - 1;
        return vertexIndex;
      });
      
      faces.push({
        vertices: faceVertices,
        material: currentMaterial
      });
    }
  });
  
  const faceIndices = [];
  const faceColors = [];
  
  faces.forEach(face => {
    faceIndices.push(face.vertices);
    faceColors.push(materials[face.material] || {r: 200, g: 200, b: 200});
  });
  
  return {
    vertices,
    faces: faceIndices,
    faceColors
  };
}

/**
 * Center and normalize mesh to fit in a standard size
 */
export function normalizeMesh(mesh, targetSize = 2) {
  // Find bounding box
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;
  
  mesh.vertices.forEach(v => {
    minX = Math.min(minX, v.x);
    maxX = Math.max(maxX, v.x);
    minY = Math.min(minY, v.y);
    maxY = Math.max(maxY, v.y);
    minZ = Math.min(minZ, v.z);
    maxZ = Math.max(maxZ, v.z);
  });
  
  // Calculate center and size
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const centerZ = (minZ + maxZ) / 2;
  
  const sizeX = maxX - minX;
  const sizeY = maxY - minY;
  const sizeZ = maxZ - minZ;
  const maxSize = Math.max(sizeX, sizeY, sizeZ);
  
  const scale = targetSize / maxSize;
  
  // Center and scale vertices
  const normalizedVertices = mesh.vertices.map(v => ({
    x: (v.x - centerX) * scale,
    y: (v.y - centerY) * scale,
    z: (v.z - centerZ) * scale
  }));
  
  return {
    ...mesh,
    vertices: normalizedVertices
  };
}
