#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 rotation(float angel, vec2 st){
    mat2 rot = mat2(cos(angel),sin(angel),
                    -sin(angel),cos(angel));
    vec2 tmp = st - 0.5;
    tmp = rot * tmp;
    tmp += 0.5;

    return tmp;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    vec2 Sst = st * 20.;
    vec2 fst = fract(Sst);
    vec2 ist = floor(Sst);

    float color = 0.0;

    for(float y = 0.; y < 20.; y+= 1.0){
        for(float x = 0.; x < 20.; x+= 1.0){
            ist.x = x - ist.x;
            ist.y = x - ist.x;
             
        }
    }

    color = step(fst.y,fst.x);

    gl_FragColor = vec4(color);
}