#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D   t1;
uniform vec2        t1Resolution;

const float PI = 3.1415926535;

float plot(float y, float x, bool b){
    if(b){
        return step(y,x)-step(y,x-0.02);
    }
    return step(y,x);

}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float angel = atan(st.x-0.5,st.y-0.5)*18.;

    vec4 tx = texture2D(t1,st);

    
    gl_FragColor = vec4(tx.xyz,1.-sin(u_time + distance(st,vec2(0.5)) + angel));
}