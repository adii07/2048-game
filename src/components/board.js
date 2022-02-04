export const initialBoard=()=>
    [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ];

const alreadyPlaced=(matrix,val)=>{
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[i].length;j++){
            if(matrix[i][j]===val) return true;
        }
    }
    return false;
}

export const isFull=(matrix)=>{
    return !alreadyPlaced(matrix,0);
}


const getCellPosition=()=>{
    const row=Math.floor(Math.random()*4);
    const col=Math.floor(Math.random()*4);
    return [row,col];
}

export const getRandomCell=(matrix)=>{
    if(isFull(matrix)) return matrix;

    let[row,col]=getCellPosition();
    while(matrix[row][col]!==0){
        [row,col]=getCellPosition();
    }
    matrix[row][col]=2;
    return matrix;
}

const compress=(matrix)=>{
    const newMatrix=initialBoard();
    for(let i=0;i<matrix.length;i++){
        let col=0;
        for(let j=0;j<matrix[i].length;j++){
            if(matrix[i][j]!==0){
                newMatrix[i][col]=matrix[i][j];
                col++;
            }
        }
    }
    return newMatrix;
}

const merge=(matrix)=>{
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[i].length-1;j++){
            if(matrix[i][j]!==0 && matrix[i][j+1]===matrix[i][j]){
                matrix[i][j]=matrix[i][j]*2;
                matrix[i][j+1]=0;
            }
        }
    }
    return matrix;
}

const reverse=(matrix)=>{
    const reverseMatrix=initialBoard();
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[i].length;j++){
            reverseMatrix[i][j]=matrix[i][matrix[i].length-1-j];
        }
    }
    return reverseMatrix;
}

const antiClockWise=(matrix)=>{
    const rotateMatrix=initialBoard();
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[i].length;j++){
            rotateMatrix[i][j]=matrix[j][matrix[i].length-i-1];
        }
    }
    return rotateMatrix;
}
const clockWise=(matrix)=>{
    const rotateMatrix=initialBoard();
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[i].length;j++){
            rotateMatrix[i][j]=matrix[matrix[i].length-j-1][i];
        }
    }
    return rotateMatrix;
}

export const west=(matrix)=>{
    const newMatrix1=compress(matrix);
    const newMatrix2=merge(newMatrix1);
    return compress(newMatrix2);
}

export const east=(matrix)=>{
    const reverseMatrix=reverse(matrix);
    const newMatrix=west(reverseMatrix);
    return reverse(newMatrix);
}

export const north=(matrix)=>{
    const rotateMatrix=antiClockWise(matrix);
    const newMatrix=west(rotateMatrix);
    return clockWise(newMatrix);
}

export const south=(matrix)=>{
    const rotateMatrix=clockWise(matrix);
    const newMatrix=west(rotateMatrix);
    return antiClockWise(newMatrix);
}

export const winStatus=(matrix)=>{
    return alreadyPlaced(matrix,2048);
}

const hasDiffVal=(matrix,updatedMatrix)=>{
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[i].length;j++){
            if(matrix[i][j]!==updatedMatrix[i][j]) return true;
        }
    }
    return false;
}


export const gameOver=(matrix)=>{
    if(hasDiffVal(matrix,west(matrix))) return false;
    if(hasDiffVal(matrix,east(matrix))) return false;
    if(hasDiffVal(matrix,north(matrix))) return false;
    if(hasDiffVal(matrix,south(matrix))) return false;
    return true;
}
