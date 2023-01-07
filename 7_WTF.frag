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
    st *= 12.;
    st.y = st.y - 6.;
    st.x = st.x - 6.;

    float angle = atan(st.x-0.5,st.y-0.5)*2.;
    float pts = plot_fill(st.y,random(st.x*34.45))*flip_x(st.y,random(st.x*34.45));
    pts += plot_fill(st.x,random(st.y*45.34))*flip_x(st.x,random(st.y*45.34));
    pts += plot_fill(st.x+st.y,random((st.y+st.x)*45.34))*flip_x(st.x+st.y,random((st.x+st.y)*45.34));
    pts += plot_fill(st.x-st.y,random((st.y+st.x)*45.34))*flip_x(st.x-st.y,random((st.x+st.y)*45.34));
    


    gl_FragColor = vec4(pts);
}