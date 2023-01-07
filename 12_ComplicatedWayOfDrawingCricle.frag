#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI = 3.1415926535;


float plot(float y, float x, bool b){
    if(b){
        return step(y,x)-step(y,x-0.0012);
    }
    return step(y,x);

}

float flip_x(float y, float x){
    vec2 st0 = vec2(x,y);
    st0-=0.5;
    st0=mat2(1.,0.,0.,-1.)*st0;
    st0+=0.5;

    st0.y = st0.y-1.;

    return plot(st0.y,st0.x,false);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float foreig = 0.0;
    st -= 0.5;

    gl_FragColor = vec4(plot(st.y,sqrt(0.3*0.3-st.x*st.x),false))*flip_x(st.y,sqrt(0.3*0.3-st.x*st.x));
}