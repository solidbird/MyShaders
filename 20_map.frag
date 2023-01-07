#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float DIM = 20.;


vec3 color = vec3(0.0);

vec3 color_grass = vec3(0.0, 0.5373, 0.1176);
vec3 color_trees = vec3(0.0235, 0.2118, 0.0392);
vec3 color_dirt = vec3(0.5373, 0.3216, 0.0);
vec3 color_sand = vec3(0.9216, 0.7725, 0.2941);
vec3 color_water = vec3(0.1686, 0.1333, 0.8392);

vec3 tiles[5];


/*vec2 random2d(vec2 st){
    return vec2(fract(sin(dot(st,vec2(435.32432,76.4356)))*483.456));
}

float random(float x){
    return fract(sin(x)*1e13);
}*/

vec2 rand(vec2 co){
    return fract(sin(vec2(dot(co, vec2(12.9898, 78.233)),dot(co,vec2(45.3432,84.456)))) * 43758.5453);
}

float drawGrid(vec2 st, vec2 point){
    /*if( st.x >= point.x && st.x < (point.x)+1. &&
        st.y >= point.y && st.y < (point.y)+1. ){
        return 1.;
    }*/

    return (step(point.x,st.x) - step(point.x+1.,st.x)) *
    (step(point.y,st.y) - step(point.y+1.,st.y));
      
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st *= DIM;

    vec3 color = vec3(0.0);

    tiles[0]=color_grass;   
    tiles[1]=color_trees;
    tiles[2]=color_dirt;
    tiles[3]=color_sand;
    tiles[4]=color_water;


    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    vec2 initP = rand(vec2(44.436,33.3546))*DIM;
    color = drawGrid(i_st,initP)*color_grass;

    float l = 1.;

    for(int y = -1; y <= 1; y++){
        for(int x = -1; x <= 1; x++){
            if(x == 0 && y == 0){continue;}
                color += drawGrid(i_st,initP+vec2(float(x),float(y)))*l;
                //initP = initP+vec2(float(x),float(y)); 
        }
        l++;
    }

    gl_FragColor = vec4(color,1.0);
}