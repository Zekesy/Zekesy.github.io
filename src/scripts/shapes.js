

const cubeMesh = {
    vertices: [
        {x:  2, y:  2, z:  2}, // 0
        {x: -2, y:  2, z:  2}, // 1
        {x: -2, y: -2, z:  2}, // 2
        {x:  2, y: -2, z:  2}, // 3
        {x:  2, y:  2, z: -2}, // 4
        {x: -2, y:  2, z: -2}, // 5
        {x: -2, y: -2, z: -2}, // 6
        {x:  2, y: -2, z: -2}, // 7
    ],
    faces: [
        [0, 1, 2, 3], // front
        [4, 7, 6, 5], // back (reversed for correct winding)
        [0, 4, 5, 1], // top
        [2, 6, 7, 3], // bottom
        [0, 3, 7, 4], // right
        [1, 5, 6, 2], // left
    ],
    // Vertex colors (optional - one per vertex)
    colors: [
        {r: 255, g: 100, b: 100},
        {r: 100, g: 255, b: 100},
        {r: 100, g: 100, b: 255},
        {r: 255, g: 255, b: 100},
        {r: 255, g: 100, b: 255},
        {r: 100, g: 255, b: 255},
        {r: 255, g: 200, b: 100},
        {r: 200, g: 100, b: 255},
    ]
};


export function createClapperboard() {
  return {
    vertices: [
      // Main board (rectangular base)
      {x: -2, y: -1.5, z: 0.1},  // 0 - front bottom left
      {x:  2, y: -1.5, z: 0.1},  // 1 - front bottom right
      {x:  2, y:  1.5, z: 0.1},  // 2 - front top right
      {x: -2, y:  1.5, z: 0.1},  // 3 - front top left
      {x: -2, y: -1.5, z: -0.1}, // 4 - back bottom left
      {x:  2, y: -1.5, z: -0.1}, // 5 - back bottom right
      {x:  2, y:  1.5, z: -0.1}, // 6 - back top right
      {x: -2, y:  1.5, z: -0.1}, // 7 - back top left

      // Clapper top (angled piece)
      {x: -2, y:  1.5, z: 0.1},  // 8 - same as 3
      {x:  2, y:  1.5, z: 0.1},  // 9 - same as 2
      {x:  2, y:  2.2, z: 0.5},  // 10 - top right raised
      {x: -2, y:  2.2, z: 0.5},  // 11 - top left raised
      {x: -2, y:  1.5, z: -0.1}, // 12 - back same as 7
      {x:  2, y:  1.5, z: -0.1}, // 13 - back same as 6
      {x:  2, y:  2.2, z: 0.3},  // 14 - back top right
      {x: -2, y:  2.2, z: 0.3},  // 15 - back top left

      // Hinge circles (left side)
      {x: -1.5, y: 1.7, z: 0.6}, // 16 - left circle center
      
      // Hinge circles (right side)
      {x:  1.5, y: 1.7, z: 0.6}, // 17 - right circle center
    ],
    
    faces: [
      // Main board faces
      [0, 1, 2, 3],    // front face (dark gray)
      [5, 4, 7, 6],    // back face
      [4, 0, 3, 7],    // left side
      [1, 5, 6, 2],    // right side
      [3, 2, 6, 7],    // top edge
      [4, 5, 1, 0],    // bottom
      
      // Clapper top faces
      [8, 9, 10, 11],   // front of clapper (white with stripes)
      [13, 12, 15, 14], // back of clapper
      [12, 8, 11, 15],  // left side of clapper
      [9, 13, 14, 10],  // right side of clapper
      [11, 10, 14, 15], // top of clapper
    ],
    
    faceColors: [
      // Main board
      {r: 60, g: 60, b: 65},    // front - dark gray
      {r: 50, g: 50, b: 55},    // back
      {r: 55, g: 55, b: 60},    // left
      {r: 55, g: 55, b: 60},    // right
      {r: 55, g: 55, b: 60},    // top edge
      {r: 50, g: 50, b: 55},    // bottom
      
      // Clapper top
      {r: 220, g: 220, b: 225}, // front - light (we'll add stripes with detail)
      {r: 200, g: 200, b: 205}, // back
      {r: 210, g: 210, b: 215}, // left
      {r: 210, g: 210, b: 215}, // right
      {r: 230, g: 230, b: 235}, // top
    ]
  };
}

// Simplified version with stripes
export function createStripedClapperboard() {
  return {
    vertices: [
      // Main board (black body)
      {x: -1.5, y: -1.2, z: 0.1},   // 0 - front bottom left
      {x:  1.5, y: -1.2, z: 0.1},   // 1 - front bottom right
      {x:  1.5, y:  1.0, z: 0.1},   // 2 - front top right
      {x: -1.5, y:  1.0, z: 0.1},   // 3 - front top left
      {x: -1.5, y: -1.2, z: -0.1},  // 4 - back bottom left
      {x:  1.5, y: -1.2, z: -0.1},  // 5 - back bottom right
      {x:  1.5, y:  1.0, z: -0.1},  // 6 - back top right
      {x: -1.5, y:  1.0, z: -0.1},  // 7 - back top left

      // Clapper base (white back/sides)
      {x: -1.5, y:  1.0, z: 0.1},   // 8  - front bottom left
      {x:  1.5, y:  1.0, z: 0.1},   // 9  - front bottom right
      {x:  1.5, y:  1.7, z: 0.4},   // 10 - front top right
      {x: -1.5, y:  1.7, z: 0.4},   // 11 - front top left
      {x: -1.5, y:  1.0, z: -0.1},  // 12 - back bottom left
      {x:  1.5, y:  1.0, z: -0.1},  // 13 - back bottom right
      {x:  1.5, y:  1.7, z: 0.3},   // 14 - back top right
      {x: -1.5, y:  1.7, z: 0.3},   // 15 - back top left

      // Stripe vertices (on top of clapper front, slightly forward)
      // White stripe 1
      {x: -1.5, y:  1.0, z: 0.42},  // 16
      {x: -0.9, y:  1.0, z: 0.42},  // 17
      {x: -0.9, y:  1.7, z: 0.42},  // 18
      {x: -1.5, y:  1.7, z: 0.42},  // 19
      
      // Black stripe 1
      {x: -0.9, y:  1.0, z: 0.42},  // 20
      {x: -0.3, y:  1.0, z: 0.42},  // 21
      {x: -0.3, y:  1.7, z: 0.42},  // 22
      {x: -0.9, y:  1.7, z: 0.42},  // 23
      
      // White stripe 2
      {x: -0.3, y:  1.0, z: 0.42},  // 24
      {x:  0.3, y:  1.0, z: 0.42},  // 25
      {x:  0.3, y:  1.7, z: 0.42},  // 26
      {x: -0.3, y:  1.7, z: 0.42},  // 27
      
      // Black stripe 2
      {x:  0.3, y:  1.0, z: 0.42},  // 28
      {x:  0.9, y:  1.0, z: 0.42},  // 29
      {x:  0.9, y:  1.7, z: 0.42},  // 30
      {x:  0.3, y:  1.7, z: 0.42},  // 31
      
      // White stripe 3
      {x:  0.9, y:  1.0, z: 0.42},  // 32
      {x:  1.5, y:  1.0, z: 0.42},  // 33
      {x:  1.5, y:  1.7, z: 0.42},  // 34
      {x:  0.9, y:  1.7, z: 0.42},  // 35

      // Hinges
      {x: -1.3, y:  1.25, z: 0.45}, // 36
      {x: -1.0, y:  1.25, z: 0.45}, // 37
      {x: -1.0, y:  1.55, z: 0.45}, // 38
      {x: -1.3, y:  1.55, z: 0.45}, // 39
      
      {x:  1.0, y:  1.25, z: 0.45}, // 40
      {x:  1.3, y:  1.25, z: 0.45}, // 41
      {x:  1.3, y:  1.55, z: 0.45}, // 42
      {x:  1.0, y:  1.55, z: 0.45}, // 43
    ],
    
    faces: [
      // Main board (dark/black) - 5 faces
      [0, 1, 2, 3],    // 0: front
      [5, 4, 7, 6],    // 1: back
      [4, 0, 3, 7],    // 2: left
      [1, 5, 6, 2],    // 3: right
      [4, 5, 1, 0],    // 4: bottom
      
      // Clapper body (white) - 4 faces
      [13, 12, 15, 14], // 5: back
      [12, 8, 11, 15],  // 6: left side
      [9, 13, 14, 10],  // 7: right side
      [11, 10, 14, 15], // 8: top edge
      
      // Stripes (front of clapper) - 5 faces
      [16, 17, 18, 19], // 9:  White stripe 1
      [20, 21, 22, 23], // 10: Black stripe 1
      [24, 25, 26, 27], // 11: White stripe 2
      [28, 29, 30, 31], // 12: Black stripe 2
      [32, 33, 34, 35], // 13: White stripe 3
      
      // Hinges - 2 faces
      [36, 37, 38, 39], // 14: Left hinge
      [40, 41, 42, 43], // 15: Right hinge
    ],
    
    faceColors: [
      // Main board (black) - indices 0-4
      {r: 45, g: 45, b: 48},
      {r: 40, g: 40, b: 43},
      {r: 42, g: 42, b: 45},
      {r: 42, g: 42, b: 45},
      {r: 40, g: 40, b: 43},
      
      // Clapper body (white) - indices 5-8
      {r: 250, g: 250, b: 250},
      {r: 250, g: 250, b: 250},
      {r: 250, g: 250, b: 250},
      {r: 250, g: 250, b: 250},
      
      // Stripes - indices 9-13
      {r: 255, g: 255, b: 255}, // White
      {r: 35, g: 35, b: 38},    // Black
      {r: 255, g: 255, b: 255}, // White
      {r: 35, g: 35, b: 38},    // Black
      {r: 255, g: 255, b: 255}, // White
      
      // Hinges - indices 14-15
      {r: 180, g: 185, b: 190},
      {r: 180, g: 185, b: 190},
    ]
  };
}