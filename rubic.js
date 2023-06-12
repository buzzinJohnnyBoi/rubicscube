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
        this.pieces = [];
        for (let i = 0; i < sides; i++) {
            this.colors.push(colors[i]);
            this.cube.push([])
            for (let j = 0; j < rows; j++) {
                this.cube[i].push([])
                for (let k = 0; k < cols; k++) {
                    this.cube[i][j].push({
                        color: i,
                        id: i.toString() + j.toString() + k.toString(),
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
                    // this.outline.pieces.push(piece);
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
                        this.addToPieces(dist * (j - 1), Math.round(i/2 - 1) * dist, dist * (k - 1), i, j, k);
                    }
                    if(i % 3 == 1) {
                        this.cube[i][j][k].piece.position.x = (dist + this.squareSize/2) * Math.round(i/1.5 - 2);
                        this.cube[i][j][k].piece.position.y = dist * (k - 1);
                        this.cube[i][j][k].piece.position.z = dist * (j - 1);
                        this.addToPieces((dist) * Math.round(i/1.5 - 2), dist * (k - 1), dist * (j - 1), i, j, k);
                    }
                    if(i % 3 == 2) {
                        this.cube[i][j][k].piece.position.x = dist * (j - 1);
                        this.cube[i][j][k].piece.position.y = dist * (k - 1);
                        this.cube[i][j][k].piece.position.z = (dist + this.squareSize/2) * Math.round(i/1.25 - 3);
                        this.addToPieces(dist * (j - 1), dist * (k - 1), (dist) * Math.round(i/1.25 - 3), i, j, k);
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
        console.log(this.pieces)
    }
    addToPieces(x, y, z, side, row, col) {
        for (let i = 0; i < this.pieces.length; i++) {
            if(this.pieces[i].position.x == x && this.pieces[i].position.y == y && this.pieces[i].position.z == z) {
                this.pieces[i].pieces.push({side: side, row: row, col: col});
                return ;
            }
        }
        this.pieces.push({
            pieces: [{
                side: side, 
                row: row, 
                col: col
            }],
            position: {
                x: x,
                y: y,
                z: z
            }
        });
    }
    turn(side) {
        const sidePieces = [this.findPiece(side, 0, 1), this.findPiece(side, 1, 0), this.findPiece(side, 1, 2), this.findPiece(side, 2, 1)];
        const cornerPieces = [this.findPiece(side, 0, 0), this.findPiece(side, 2, 0), this.findPiece(side, 0, 2), this.findPiece(side, 2, 2)];
        // console.log(this.copyPiece(sidePieces[2]))
        // console.log(sidePieces[1]);
        // this.movePiece(sidePieces[1], this.copyPiece(sidePieces[2]));
        // this.movePieces(sidePieces[2], sidePieces[3]);
        this.movePieces(sidePieces[0], sidePieces[1], sidePieces[2], sidePieces[3]);
        this.movePieces(cornerPieces[0], cornerPieces[1], cornerPieces[2], cornerPieces[3]);


    }
    copyPiece(pieceObj) {
        var piece = [];
        for (let i = 0; i < pieceObj.length; i++) {
            const tempPiece = pieceObj[i];
            piece.push(this.copySquare(tempPiece.side, tempPiece.row, tempPiece.col));
        }
        return piece;
    }
    copySquare(side, row, col) {
        return {
            position: {
                x: this.cube[side][row][col].piece.position.x,
                y: this.cube[side][row][col].piece.position.y,
                z: this.cube[side][row][col].piece.position.z,
            },
            rotation: {
                x: this.cube[side][row][col].piece.rotation.x,
                y: this.cube[side][row][col].piece.rotation.y,
            }
        }
    }
    movePieces(pieceObj1, pieceObj2, pieceObj3, pieceObj4) {
        var newPiece1 = this.copyPiece(pieceObj1);
        var newPiece2 = this.copyPiece(pieceObj2);
        var newPiece3 = this.copyPiece(pieceObj3);
        var newPiece4 = this.copyPiece(pieceObj4);
        //----
        this.movePiece(pieceObj2, newPiece1);
        this.movePiece(pieceObj3, newPiece4);
        this.movePiece(pieceObj4, newPiece2);
        this.movePiece(pieceObj1, newPiece3);
    }
    movePiece(pieceObj, newPiece) {
        for (let i = 0; i < pieceObj.length; i++) {
            const piece = this.cube[pieceObj[i].side][pieceObj[i].row][pieceObj[i].col].piece;
            if(pieceObj.length == 3 && i == 1) {
                if(Math.abs(piece.rotation.x) == Math.abs(newPiece[i].rotation.x) && Math.abs(piece.rotation.y) == Math.abs(newPiece[i].rotation.y)) {
                    newPiece = [newPiece[0], newPiece[2], newPiece[1]];
                }
            }
            piece.position.x = newPiece[i].position.x;
            piece.position.y = newPiece[i].position.y;
            piece.position.z = newPiece[i].position.z;
            piece.rotation.x = newPiece[i].rotation.x;
            piece.rotation.y = newPiece[i].rotation.y;
            
        }
    }
    moveSqaure(piece, newPiece) {
        piece.position.x = newPiece.position.x;
        piece.position.y = newPiece.position.y;
        piece.position.z = newPiece.position.z;
        piece.rotation.x = newPiece.rotation.x;
        piece.rotation.y = newPiece.rotation.y;
    }
    findPiece(side, row, col) {
        for (let i = 0; i < this.pieces.length; i++) {
            for (let j = 0; j < this.pieces[i].pieces.length; j++) {
                const piece = this.pieces[i].pieces[j];
                if(piece.side == side && piece.row == row && piece.col == col) {
                    if(this.pieces[i].pieces.length == 2) {
                        return [piece, this.pieces[i].pieces[Math.abs(j - 1)]]
                    }
                    else {
                        if(j == 0) return this.pieces[i].pieces;
                        if(j == 1) return [piece, this.pieces[i].pieces[0], this.pieces[i].pieces[2]];
                        return [piece, this.pieces[i].pieces[0], this.pieces[i].pieces[1]];
                    }
                }
            }
        }
    }
}