package org.springframework.samples.petclinic.territory;


public record Position(Integer x, Integer y, Integer z) {
   
    public Integer maxCells(){
        Integer res = 0;
        if(this.x()==4)
            res+=1;
        if(this.y()==4)
            res+=1;
        if(this.z()==4)
            res+=1;
        return res;
    }

    public Boolean maxCellY(){
        return this.y()==4; 
    }

    public Boolean maxCellZ(){
        return this.z()==4; 
    }
    
    public Boolean maxCellX(){
        return this.x()==4; 
    }

    public Position of(Integer x, Integer y, Integer z){
        return new Position(x, y, z);
    }
}
