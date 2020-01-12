function findAdjacent(node, vertices, edges) {
    return edges.filter(edge => edge.includes(node)).map(edge => edge.filter(end => end !== node)[0])
        .map(name => findNode(name, vertices)).filter(node => node.distance === null)
    //Not sure why I need to filter for the test to pass...
}

function findNode(nodeName, vertices) {
    return vertices.find(vertex => vertex.name === nodeName)
}

function markDistanceAndPredecessor(node, adjacentNodes) {
    adjacentNodes.map(vertex => {
        vertex.distance = node.distance + 1
        vertex.predecessor = node
    })
}

function bfs(rootNode, vertices, edges) {
    rootNode.distance = 0
    let queue = [rootNode]
    let visited = [rootNode]
    while (queue.length !== 0) {
        let currentNode = queue.shift()
        let adjacents = findAdjacent(currentNode.name, vertices, edges)
        visited = visited.concat(adjacents)
        markDistanceAndPredecessor(currentNode, adjacents)
        queue = queue.concat(adjacents)
    }
    return visited
}
