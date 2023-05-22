import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {scene} from './main.js';

export default class cube {
    constructor(rows, cols, sides, colors, size = 9, outline= 0.5) {
        this.rows = rows;
        this.cols = cols;
        this.sides = sides;
        this.outline = {
            size: outline,
            pieces: []
        };
        this.cube = [];
        this.colors = [];
        this.squareSize = size/rows;

        for (let i = 0; i < sides; i++) {
            this.colors.push(colors[i]);
            this.cube.push([])
            for (let j = 0; j < rows; j++) {
                this.cube[i].push([])
                for (let k = 0; k < cols; k++) {
                    this.cube[i][j].push({
                        color: i, 
                        piece: new THREE.Mesh( new THREE.BoxGeometry(size/rows, size/rows, 0.1), new THREE.MeshBasicMaterial( { color: colors[i] } ) ),
                    });
                }                
            }
        }          
        for (let i = 0; i < this.sides/2; i++) {
            for (let j = 0; j < this.rows; j++) {
                for (let k = 0; k < this.cols; k++) {
                    const piece = new THREE.Mesh( new THREE.BoxGeometry(size/rows + outline, size/rows + outline, size/rows + outline), new THREE.MeshBasicMaterial( { color: "black" } ) );
                    piece.position.x = (i - 1) * (this.squareSize + outline/2); 
                    piece.position.y = (j - 1) * (this.squareSize + outline/2); 
                    piece.position.z = (k - 1) * (this.squareSize + outline/2); 
                    this.outline.pieces.push(piece);
                }
            }
        }
    }
    add() {
        for (let i = 0; i < this.sides; i++) {
            for (let k = 0; k < this.cols; k++) {
                for (let j = 0; j < this.rows; j++) {

                    const dist = this.outline.size + this.squareSize;
                    if(i % 3 == 0) {
                        this.cube[i][j][k].piece.position.x = dist * (j - 1);
                        this.cube[i][j][k].piece.position.y = Math.round(i/2 - 1) * (dist + this.squareSize/2);
                        this.cube[i][j][k].piece.position.z = dist * (k - 1);
                    }
                    if(i % 3 == 1) {
                        this.cube[i][j][k].piece.position.x = (dist + this.squareSize/2) * Math.round(i/1.5 - 2);
                        this.cube[i][j][k].piece.position.y = dist * (k - 1);
                        this.cube[i][j][k].piece.position.z = dist * (j - 1);
                    }
                    if(i % 3 == 2) {
                        this.cube[i][j][k].piece.position.x = dist * (j - 1);
                        this.cube[i][j][k].piece.position.y = dist * (k - 1);
                        this.cube[i][j][k].piece.position.z = (dist + this.squareSize/2) * Math.round(i/1.25 - 3);
                    }
                    this.cube[i][j][k].piece.rotation.x = ((i + 1) % 3) * Math.PI/2;
                    this.cube[i][j][k].piece.rotation.y = ((i) % 3) * Math.PI/2;
                    scene.add(this.cube[i][j][k].piece);
                }                
            }
        }
        for (let i = 0; i < this.outline.pieces.length; i++) {
            const outline = this.outline.pieces[i];
            scene.add(outline);
        }
    }

}