import * as THREE from 'three';
import {scene} from './main.js';

export default class cube {
    constructor(rows, cols, sides, colors) {
        this.rows = rows;
        this.cols = cols;
        this.sides = sides;
        this.cube = [];
        this.colors = [];
        for (let i = 0; i < sides; i++) {
            this.colors.push(colors[i]);
            this.cube.push([])
            for (let j = 0; j < rows; j++) {
                this.cube[i].push([])
                for (let k = 0; k < cols; k++) {
                    this.cube[i][j].push({color: i, piece: new THREE.Mesh( new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial( { color: colors[i] } ) ) });
                }                
            }
        }
    }
    add() {
        for (let i = 0; i < this.sides; i++) {
            for (let j = 0; j < this.rows; j++) {
                for (let k = 0; k < this.cols; k++) {
                    console.log(this.cube[i][j][k]);
                    this.cube[i][j][k].piece.position.x = 6 * (i - 1);
                    this.cube[i][j][k].piece.position.y = 6 * (j - 1);
                    this.cube[i][j][k].piece.position.z = 6 * (k - 1);
                    scene.add(this.cube[i][j][k].piece);
                }                
            }
        }
    }

}