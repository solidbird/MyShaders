#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float zoom_value = 7.;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;

    mat2 zoom = mat2(zoom_value,0.0,0.0,zoom_value);

    //float lol = step(fract(u_time*0.5),distance(vec2(0.5),st))-step(0.1,distance(vec2(0.5),st));// - step(sin(u_time)*10.,distance(vec2(0.5),st));
    
    st -= 0.5;
    st = zoom * st;
    st += 0.5;

    float angel = atan(st.x-0.5,st.y-0.5)*4.;
    float dist = distance(vec2(0.5),st)*4.;
    float lol = (cos(u_time*10.-dot(0.5-st,0.5-st) + angel));
    
    //float lol = step(0.5,sin(angel));

    gl_FragColor = vec4(lol);

}