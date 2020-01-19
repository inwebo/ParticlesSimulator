import Simulation from "../src/Simulation/Simulation";
import Bounds from "../src/Simulation/Bounds";
import Vector from "../src/Vector/Vector";

document.addEventListener("DOMContentLoaded",function(){
    const simulation = new Simulation(new Bounds(new Vector(0,0), new Vector(600,600)));

    console.log(simulation);
});