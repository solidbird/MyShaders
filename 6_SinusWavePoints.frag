#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI = 3.1415926535;

float random(float seed) {
    return fract(sin(seed+dot(vec2(342.34,342.345),vec2(54.3424,65.3453)))*43563.34224);
}

float plot_line(float y, float x){
    return step(y,x)-step(y,x-0.002);
}

float plot_fill(float y, float x){
    return step(y,x);
}

float flip_x(float y, float x){
    vec2 st0 = vec2(x,y);
    
    /*flip coordinates at the x-axis and set the entire y-axis
    into the negative site*/

    /*maybe i broke it by trying to fix it but not that much
    important*/
    st0.y=-1.*st0.y;
    st0.y = st0.y-1.;

    return plot_fill(st0.y,st0.x);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    //st.x *= 3.; 
    st -= .5;
    st *= 2.;
    st.x *= 2.;

    vec4 bg_color = vec4(0.2,0.0,0.3,1.0);



    vec4 additional_func = vec4(0.0);    
    for(float i = 0.; i < 0.; i++){
        additional_func += vec4(plot_line(st.y,mix(0.,random(st.x), cos(st.x + u_time + i/sqrt(2.)))));
    }

    //f(x) = integral[0-random(st.x)](sin(st.x+u_time)*0.5)
    gl_FragColor = vec4(
        /*
        plot small little lines from x=y=0 with random lines
        of every x value spread accros y and interpolate 
        those values with sin(x + time)*0.5 
        */
        plot_line(st.y,mix(0.,random(st.x), sin(st.x + u_time)))
    
    ) + bg_color + additional_func;

}