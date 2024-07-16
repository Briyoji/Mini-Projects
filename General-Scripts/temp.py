matrix = [
    [1,0,0,0,0,0],
    [0,1,0,1,1,1],
    [0,0,1,0,1,0],
    [1,1,0,0,1,0],
    [1,0,1,1,0,0],
    [1,0,0,0,0,1],
]

def check_adjacent(r_idx, c_idx, matrix) :
    if matrix[r_idx][c_idx] == 0:
        return ;
    
    elif r_idx in (0, len(matrix)) or c_idx in (0, len(matrix)):
        return ;
    
    else: 
        


def removeIslands(matrix) :
    '''
        1 -> Black
        0 -> White

        Remove all Black Pixels not connected directly via a path of dark pixels to the border.
    '''

