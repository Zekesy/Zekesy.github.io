

/**
 *  Given a polygon, seperate into triangles, does not work with concave 
 * 
 */
export function triangulateFace(vertexIndices) {
  const triangles = [];
  if(vertexIndices < 3) return triangles; 
  if(vertexIndices == 3) return vertexIndices; 

  //anchor v0
  for(let i = 1; i < vertexIndices.length; ++i){
    triangles.push([
      vertexIndices[0],
      vertexIndices[i],
      vertexIndices[i+1],
    ])
  }  

  return triangles; 
}

/**
 *  Given full list of faces for polygon with vertex indices 
 *  return list of faces of just triangles 
 */
export function triangulate(mesh) {
  return {
    ...mesh, 
    faces: mesh.faces.flatMap(triangulateFace)
  };
}

