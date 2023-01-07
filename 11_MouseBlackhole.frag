#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random(float seed) {
    return fract(sin(seed+u_time+dot(vec2(342.34,342.345),vec2(54.3424,65.3453)))*43563.34224);
}

float plot_line(float y, float x){
    return step(y,x)-step(y,x-0.002);
}

float plot_fill(float y, float x){
    return step(y,x);
}


float radius = 0.2;

void main(){
    
    //mouse position normalized
    vec2 pos = u_mouse/u_resolution;

    //coordinatesystem normalized
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    //Scaling the width up by 2 for fullscreen
    st.x *= 2.;
    pos.x *= 2.;

    /*
    Circle of the blackhole that fades out at the border through the difference of [radius-0.1;radius+0.1]
    and the circle itself is used for the zoom matrix

    The fading out at the borders gives the whole thing this interesting effect
    */
    float circle = 1.-smoothstep(radius-0.1,radius+0.1,distance(st,pos)); 
    mat2 zoom_mat = mat2(circle,0.,0.,circle);
    
    //use of the zoom matrix
    vec2 _st = st;
    _st -= 0.5;
    _st = zoom_mat*_st;
    _st += 0.5;
    
    /*
    Generate "Stars" for the coordinatesystem that is distorted
    and for the normal coordinatesystem
    */
    float circle_border = plot_line(_st.y,random(_st.x));
    float background = plot_line(st.y,random(st.x));

    /*
    Add this effect of at the circle border and background
    together. Use the circle I drew for the alpha value
    which creates this dark middle piece in the middle
    */ 
    gl_FragColor = vec4(vec3(circle_border+background),1.-circle);    
}