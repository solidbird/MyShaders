#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


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
    st0-=0.5;
    st0=mat2(1.,0.,0.,-1.)*st0;
    st0+=0.5;

    st0.y = st0.y-1.;

    return plot_fill(st0.y,st0.x);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st -=0.5;
    st *= 2.;

    //st += 0.5;

    //st.y = st.x;
    // f(x) = x² --> y = x²

    //st.y += 2.*random((st.x * 0.1)*0.5+u_time);
    st.y += mix(1.,random(st.x), sin(st.x+u_time));

   //gl_FragColor = vec4(plot_fill(st.y,a));
    gl_FragColor = vec4(
        plot_line(st.y,1.)-plot_line(st.y,0.999) 
    );


}